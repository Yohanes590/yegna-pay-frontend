import prisma from "@/app/backend-service/prisma"
import { Prisma } from "@/lib/generated/prisma/client";
export async function SaveTransactionData(transactionData: any, projectID: string) {
    try {
        const transactionSavedData = await prisma.transaction.create({
            data: {
                transaction_amount: transactionData.transaction_amount,
                transaction_id: String(transactionData.transaction_id),
                method: transactionData.method,
                transaction_status: transactionData.transaction_status || transactionData.status || "verified",
                from: transactionData.from || "Unknown Payer",
                to: transactionData.to,
                currency: transactionData.currency || "ETB",
                risk_score: transactionData.risk_score,
                projectId: projectID
            },
        })

        return { message: "success", success: true, data: transactionSavedData }

    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return { message: "Transaction ID already exists. Duplicated transaction detected.", success: false }
        }

        return { message: error.message || "Failed to save transaction", success: false }
    }
}