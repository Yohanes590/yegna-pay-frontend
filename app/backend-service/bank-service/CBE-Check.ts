import { SaveTransactionData } from "@/app/backend-service/database-service/save-transaction"

export async function CBECheckFunction(CBEData: any, shouldSave: boolean = true) {
    const {
        inputName,
        extractedName,
        ReceiverInformation,
        receiver_name_data,
        transferredAmount,
        price_amount,
        ProjectDateRestriction,
        ReceiptDate,
        targetID,
        projectId
    } = CBEData

    function normalizeName(name: string): string {
        return name.toLowerCase().trim().replace(/\s+/g, " ");
    }

    const classicDate = new Date(ReceiptDate).getTime()
    const created_date = new Date().getDate()

    if (normalizeName(ReceiverInformation) !== normalizeName(receiver_name_data)) {
        return {
            message: "Receiver information does not matched",
            error: normalizeName(ReceiverInformation) + " vs " + normalizeName(receiver_name_data),
            success: false,
            data: null
        }
    }

    const cleanTransferred = Number(String(transferredAmount).replace(/[^0-9.]/g, ''));
    const cleanPrice = Number(String(price_amount).replace(/[^0-9.]/g, ''));

    if (cleanTransferred !== cleanPrice) {
        return {
            message: "Transaction amount information does not match",
            success: false,
            data: null,
            vs: transferredAmount + " vs " + price_amount
        }
    }

    if (isNaN(classicDate)) {
        return {
            message: "Could not read date from receipt",
            success: false,
            data: null
        }
    }

    if (new Date(ReceiptDate).getTime() < new Date(ProjectDateRestriction).getTime()) {
        return {
            message: "Payment deadline has passed",
            success: false,
            data: null
        }
    } else {
        const ReceiptAmount = Number(String(transferredAmount).replace(/[^0-9.]/g, ''))
        const TransactionData = {
            transaction_id: targetID,
            transaction_amount: ReceiptAmount,
            created_at: created_date,
            method: "link",
            status: "verified",
            from: extractedName || "Unknown Payer",
            to: receiver_name_data,
            currency: "ETB",
            risk_score: 98,
        }

        try {
            // Strictly controlled by the route argument flag
            if (shouldSave) {
                const dbSaveResult = await SaveTransactionData(TransactionData, projectId)

                if (dbSaveResult && dbSaveResult.success === false) {
                    return {
                        message: dbSaveResult.message,
                        success: false,
                        data: null
                    }
                }
            }

            return {
                message: "Transaction Verified Successfully",
                success: true,
                data: TransactionData
            }
        } catch (err: any) {
            return {
                message: err.message,
                success: false,
                data: null
            }
        }
    }
}