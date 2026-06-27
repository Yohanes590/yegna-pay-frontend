import prisma from "@/app/backend-service/prisma";

export async function TransactionLogSaved(transactionData: any) {
    try {
        const log = await prisma.transactionLog.create({
            data: {
                transaction_id: transactionData?.transaction_id,
                event: transactionData?.event || "UNKNOWN_EVENT",
                message: transactionData?.message || "",
                transaction_status:
                    transactionData?.transaction_status || "PENDING",
                transaction_bank:
                    transactionData?.transaction_bank,
            }
        });

        return {
            data: log,
            success: true,
            message: "Transaction log saved successfully."
        };
    } catch (error: any) {
        console.error("❌ Transaction Logger Failed:", error);

        return {
            data: null,
            success: false,
            message: `Can't save transaction Log: ${error.message}`
        };
    }
}