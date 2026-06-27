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
        }
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            success: false
        });
    }
}