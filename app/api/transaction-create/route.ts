import { CBEReadingPDF } from "@/app/backend-service/bank-service/CBE";
import { TransactionIDCheck } from "@/app/backend-service/database-service/transaction-id-check";
import prisma from "@/app/backend-service/prisma";
import { ProjectAPIKey } from "@/app/backend-service/database-service/projectAPICheck";
import { UserIdFinder } from "@/app/backend-service/database-service/user-ID-finder";
import { TransactionLogSaved } from "@/app/backend-service/database-service/transaction-log-save";
import { NextResponse } from "next/server";
import { UserRequestAmount } from "@/app/backend-service/database-service/user-request-amount";
import { NameNormalizer } from "@/app/backend-service/NameNormalaizer";
import { CBECheckFunction } from "@/app/backend-service/bank-service/CBE-Check";
import { SendWebHook } from "@/app/backend-service/Send-web-hook";
import { BOAReadingPDF } from "@/app/backend-service/bank-service/BOA";
import { SaveTransactionData } from "@/app/backend-service/database-service/save-transaction";
import { AwashbankReader } from "@/app/backend-service/bank-service/Awash";
export async function POST(req: Request) {
    const body = await req.json();
    const authHeader = req.headers.get("authorization");

    const APIkey: string | null = authHeader
        ? authHeader.replace(/^Bearer\s+/i, "")
        : null;
    const { price_amount, full_name, platform, transaction_id } = body;

    try {
        const transactionIdChecker = await TransactionIDCheck(transaction_id);

        const userStatusCheck = await prisma.projects.findFirst({
            where: {
                api_sec_key: APIkey!
            },
            include: {
                user: true
            }
        });
        if (!userStatusCheck) {
            return NextResponse.json({
                message: "Invalid API Key",
                success: false,
            });
        }
        if (userStatusCheck?.user.account_status != "active") {
            return NextResponse.json({
                message: "This account has been banned.  Please contact support.",
                success: false,
            });
        } else if (transactionIdChecker.status == false) {

            const LoggedData = {
                transaction_id: transaction_id,
                event: "DUPLICATED TRANSACTION ID",
                message: "Duplicated transaction ID Detected",
                transaction_status: "failed",
                transaction_bank: platform
            };

            const TransactionLogSave = await TransactionLogSaved(LoggedData);

            if (!TransactionLogSave.success) {
                return NextResponse.json({
                    message: "Internal Server Error",
                    success: false
                });
            } else {
                return NextResponse.json({
                    message: TransactionLogSave.data,
                    success: false
                });
            }

        } else if (platform == "CBE") {
            if (!APIkey) {
                return NextResponse.json({
                    message: "UNAUTHORIZED ACCESS!",
                    status: 401
                });
            }
            const APICheck = await ProjectAPIKey(APIkey!);
            const userIdExtractor: any = await UserIdFinder(APIkey);
            if (!userIdExtractor || !userIdExtractor.data) {
                return NextResponse.json({
                    message: "User ID not found",
                    success: false
                });
            }

            const userReqAmount = await UserRequestAmount(userIdExtractor.data);

            if (!userReqAmount.success) {
                return NextResponse.json({
                    message: userReqAmount.message,
                    success: userReqAmount.success
                });
            }

            if (!APICheck.success) {
                return NextResponse.json({
                    message: APICheck.message,
                    status: 401
                });
            }

            const ReadingFunction = await CBEReadingPDF(body);

            if (ReadingFunction?.success) {
                if (!ReadingFunction.success || !('extractedData' in ReadingFunction) || !ReadingFunction.extractedData) {
                    return NextResponse.json({
                        success: false,
                        message: "Failed to read receipt data or data is missing."
                    });
                }
                const ReceiverInformation = ReadingFunction.extractedData?.receiver;

                const receiver_name_data = await prisma.projects.findFirst({
                    where: {
                        api_sec_key: APIkey
                    }
                });

                const inputName = NameNormalizer(full_name);

                const extractedName = NameNormalizer(
                    ReadingFunction.extractedData?.payer || ""
                );

                const transactionData = {
                    inputName: inputName,
                    extractedName: extractedName,
                    ReceiverInformation: ReceiverInformation,
                    receiver_name_data: receiver_name_data?.receiver_name,
                    transferredAmount: ReadingFunction.extractedData?.transferredAmount,
                    price_amount: price_amount,
                    ProjectDateRestriction: receiver_name_data?.before_expires,
                    ReceiptDate: ReadingFunction.extractedData?.paymentDateTime,
                    targetID: transaction_id,
                    projectId: receiver_name_data?.id
                };

                const CBEResponse = await CBECheckFunction(transactionData);

                if (CBEResponse?.success === false) {
                    return NextResponse.json({
                        message: CBEResponse.message,
                        success: false,
                        data: CBEResponse?.data,
                    });
                } else {

                    const webhook = receiver_name_data?.call_back_url;

                    SendWebHook(webhook, CBEResponse?.data);

                    await prisma.users.update({
                        where: {
                            id: userIdExtractor?.data
                        },
                        data: {
                            request_available: {
                                decrement: 1
                            }
                        }
                    });

                    const LoggedData = {
                        transaction_id: transaction_id,
                        event: "TRANSACTION COMPLETED!",
                        message: "Transaction created successfully",
                        transaction_status: "success",
                        transaction_bank: "CBE"
                    };

                    TransactionLogSaved(LoggedData);

                    return NextResponse.json({
                        message: CBEResponse.message,
                        success: true,
                        data: CBEResponse?.data,
                    });
                }

            } else {
                return NextResponse.json({
                    message: "Failed to process transaction",
                });
            }
        } else if (body.platform === "BOA") {
            const BOAResponse = await BOAReadingPDF(body);
            const clientPrice = body.price_amount
            if (!BOAResponse.receiverName) {
                return NextResponse.json({
                    status: 401,
                    message: "invalid payment ID"
                })
            } else {
                const functionResponse = await BOAChecker(BOAResponse, APIkey!, clientPrice)
                return NextResponse.json(functionResponse);
            }


        } else if (body.platform === "awash") {
            const AwashResponse = await AwashbankReader(body);
            if (!AwashResponse || !AwashResponse.receiverAccount) {
                return NextResponse.json({
                    status: 401,
                    message: "invalid payment ID"
                })

            } else {
                const awashbankResponse = await AwashbankChecker(AwashResponse, APIkey!, body.price_amount, body.transaction_id)
                return NextResponse.json(awashbankResponse)
            }

        } else {
            return NextResponse.json({
                message: "Unknown Platform to process transaction"
            })
        }
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            success: false
        });
    }
}




async function BOAChecker(transactionData: any, APIKey: string | undefined, clientPrice: string) {
    const ProjectDate = await prisma.projects.findFirst({
        where: {
            api_sec_key: APIKey!
        }
    })
    const PicProjectDate = ProjectDate?.before_expires
    const rawBoaDate = transactionData.transactionDate;
    let parsedBoaDate = new Date(rawBoaDate);

    if (isNaN(parsedBoaDate.getTime()) && rawBoaDate) {
        const dateMatch = rawBoaDate.match(/\d{4}-\d{2}-\d{2}/);
        if (dateMatch) {
            parsedBoaDate = new Date(dateMatch);
        }
    }
    const parsedProjectDate = new Date(PicProjectDate!);
    const projectReceiverName = ProjectDate?.receiver_name
    const normalizedProjectReceiverName = NameNormalizer(projectReceiverName || "")
    const normalizedBOAReceiverName = NameNormalizer(transactionData.receiverName || "")

    if (normalizedProjectReceiverName + "." !== normalizedBOAReceiverName) {
        return {
            success: false,
            message: "Receiver account does not match the project receiver.",
            data: normalizedBOAReceiverName + " does not match " + normalizedProjectReceiverName
        }
    } else if (Number(clientPrice) != Number(transactionData.transferredAmount.split(" ")[1])) {
        return {
            success: false,
            message: "Transferred amount does not match the requested amount.",
        }

    } else if (parsedBoaDate > parsedProjectDate) {
        return {
            success: false,
            message: "Transaction date exceeds project date restriction.",
        }
    } else {
        const LoggedData = {
            transaction_id: String(transactionData.transactionReference) + "10104",
            event: "TRANSACTION COMPLETED",
            message: "Transaction Created Successfully",
            transaction_status: "Success",
            transaction_bank: "BOA",
        };
        await TransactionLogSaved(LoggedData)
        const projectId = ProjectDate?.id || ""
        const transactionDataToSave = {
            transaction_amount: Number(transactionData.transferredAmount.split(" ")[1]),
            transaction_id: String(transactionData.transactionReference) + "10104",
            method: "link",
            transaction_status: "verified",
            from: transactionData.receiverName || "Unknown Payer",
            to: projectReceiverName || "Unknown Receiver",
            currency: "ETB",
            risk_score: 0,
            projectId: projectId
        }
        const SavedData = await SaveTransactionData(transactionDataToSave, projectId)
        return {
            success: SavedData.success,
            message: SavedData.success ? "Transaction verified and saved successfully." : "Transaction verified but failed to save.",
            data: SavedData
        }
    }
}



async function AwashbankChecker(transactionData: any, APIKey: string | undefined, clientPrice: string, transaction_id: string) {
    const rawDate = transactionData?.transactionDate;
    const projectData = await prisma.projects.findFirst({
        where: {
            api_sec_key: APIKey!
        }
    })

    if (!projectData) {
        return {
            success: false,
            message: "Project not found for the provided API key."
        }
    } else {
        const projectDate = projectData.before_expires ? projectData.before_expires : ";"

        const projectReceiverName = projectData.receiver_name
        const normalizedProjectReceiverName = NameNormalizer(projectReceiverName || "")
        const normalizedAwashReceiverName = NameNormalizer(transactionData.receiverName || "")

        const receiptAmount = transactionData.transferredAmount

        if (normalizedProjectReceiverName !== normalizedAwashReceiverName) {
            return {
                success: false,
                message: "Receiver account does not match the project receiver.",
                data: normalizedAwashReceiverName + " does not match " + normalizedProjectReceiverName
            }
        }

        let parsedRawDate = new Date(rawDate);

        if (isNaN(parsedRawDate.getTime()) && rawDate && rawDate.includes('M')) {
            const parts = rawDate.split(' ');
            if (parts.length >= 3) {
                const datePart = parts;
                const timePart = parts;
                const ampm = parts;

                let [hours, minutes, seconds] = timePart.split(':');
                let h = parseInt(hours, 10);

                if (ampm === 'PM' && h < 12) h += 12;
                if (ampm === 'AM' && h === 12) h = 0;

                parsedRawDate = new Date(`${datePart}T${String(h).padStart(2, '0')}:${minutes}:${seconds}`);
            }
        }

        const parsedProjectDate = new Date(projectDate);

        if (parsedRawDate < parsedProjectDate) {
            return {
                success: false,
                message: "Transaction date exceeds project date restriction.",
                date: rawDate + " is later than " + projectDate
            }
        } else if (Number(clientPrice) != Number(receiptAmount.split(" ")[0])) {
            return {
                success: false,
                message: "Transferred amount does not match the requested amount.",
            }
        } else {
            const projectId = projectData?.id || ""
            const transactionDataToSave = {
                transaction_amount: Number(transactionData.transferredAmount.split(" ")[0]),
                transaction_id: String(transaction_id),
                method: "link",
                transaction_status: "verified",
                from: transactionData.receiverName || "Unknown Payer",
                to: projectReceiverName || "Unknown Receiver",
                currency: "ETB",
                risk_score: 0,
                projectId: projectId
            }

            const SavedData = await SaveTransactionData(transactionDataToSave, projectId)

            const LoggedData = {
                transaction_id: transaction_id,
                event: "TRANSACTION COMPLETED",
                message: "Transaction Created Successfully",
                transaction_status: "Success",
                transaction_bank: "Awash Bank",
            };
            await TransactionLogSaved(LoggedData)

            return {
                success: SavedData.success,
                message: SavedData.success ? "Transaction verified and saved successfully." : "Transaction verified but failed to save.",
                data: SavedData
            }
        }
    }
}