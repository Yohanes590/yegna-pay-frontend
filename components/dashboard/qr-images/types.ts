import { formatDate } from "@/lib/utils";

export type QrStatusTab = "VERIFIED" | "FAILED";

export interface QrReceiptImageItem {
    id: string;
    projectId: string;
    imageUrl: string;
    mimeType: string;
    status: QrStatusTab;
    extractedTransactionId: string | null;
    qrContent: string | null;
    transactionAmount: number | null;
    currency: string;
    bankName: string;
    receiptDate: string | null;
    failureReason: string | null;
    verifiedAt: string | null;
    createdAt: string;
}

export interface PaginationState {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface CountsState {
    verified: number;
    failed: number;
    all: number;
}

export function formatReceiptDateDisplay(value: string | null | undefined): string {
    if (!value) return "N/A";
    const parsed = new Date(value);
    if (!isNaN(parsed.getTime())) {
        return formatDate(parsed);
    }
    return value;
}

