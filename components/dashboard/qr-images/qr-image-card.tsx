"use client";

import { CheckCircle2, XCircle, ZoomIn, Copy, Check, Calendar, Clock, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate, formatPlatformLabel, formatTransactionId } from "@/lib/utils";
import QrReceiptThumbnail from "./qr-thumbnail";
import { formatReceiptDateDisplay, type QrReceiptImageItem } from "./types";

interface QrImageCardProps {
    item: QrReceiptImageItem;
    copiedId: string | null;
    onCopy: (value: string, id: string) => void;
    onPreview: (item: QrReceiptImageItem) => void;
}

export default function QrImageCard({ item, copiedId, onCopy, onPreview }: QrImageCardProps) {
    const isVerified = item.status === "VERIFIED";
    const displayTxId = item.extractedTransactionId ? formatTransactionId(item.extractedTransactionId) : null;

    return (
        <div
            className={`group bg-white dark:bg-[#0c141f] border rounded-xl overflow-hidden shadow-2xs transition-all hover:shadow-md flex flex-col ${
                isVerified
                    ? "border-[#e2e8f0] dark:border-[#1e293b] hover:border-emerald-400/60"
                    : "border-rose-200/80 dark:border-rose-950/60 hover:border-rose-400/60"
            }`}
        >
            <button
                type="button"
                onClick={() => onPreview(item)}
                className="relative aspect-[4/3] w-full bg-[#f8fafc] dark:bg-[#08101a] border-b border-[#e2e8f0] dark:border-[#1e293b] overflow-hidden cursor-pointer text-left"
            >
                <QrReceiptThumbnail
                    src={item.imageUrl}
                    alt={`QR receipt ${displayTxId || item.id}`}
                    className="w-full h-full object-contain p-2 transition-transform duration-200 group-hover:scale-[1.03]"
                />
                <div className="absolute top-2.5 left-2.5">
                    <Badge variant={isVerified ? "verified" : "rejected"}>
                        {isVerified ? (
                            <>
                                <CheckCircle2 size={11} /> Verified
                            </>
                        ) : (
                            <>
                                <XCircle size={11} /> Failed
                            </>
                        )}
                    </Badge>
                </div>
                <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0f172a]/80 text-white rounded-md px-2 py-1 text-[10px] font-medium flex items-center gap-1">
                    <ZoomIn size={11} /> Preview
                </div>
            </button>

            <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3 text-xs">
                <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#f1f5f9] dark:bg-[#131d2a] text-[#334155] dark:text-[#cbd5e1] font-semibold text-[11px]">
                            <Building2 size={11} />
                            {formatPlatformLabel(item.bankName)}
                        </span>
                        <span className="font-mono font-bold text-sm text-[#0f172a] dark:text-[#f8fafc]">
                            {item.transactionAmount != null ? formatCurrency(item.transactionAmount, item.currency || "ETB") : "—"}
                        </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 bg-[#f8fafc] dark:bg-[#08101a] px-2.5 py-1.5 rounded-lg border border-[#e2e8f0] dark:border-[#1e293b]">
                        <div className="min-w-0">
                            <span className="text-[10px] uppercase tracking-wider text-[#64748b] dark:text-[#94a3b8] block">
                                Transaction ID
                            </span>
                            <span
                                className="font-mono font-semibold text-[11px] text-[#0f172a] dark:text-[#f8fafc] truncate block"
                                title={item.extractedTransactionId || "Not detected"}
                            >
                                {displayTxId || "Not detected"}
                            </span>
                        </div>
                        {item.extractedTransactionId && (
                            <button
                                type="button"
                                onClick={() => onCopy(displayTxId || item.extractedTransactionId || "", item.id)}
                                className="p-1 rounded hover:bg-[#e2e8f0] dark:hover:bg-[#1e293b] text-[#64748b] shrink-0"
                                title="Copy transaction ID"
                            >
                                {copiedId === item.id ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                            </button>
                        )}
                    </div>

                    {isVerified ? (
                        <div className="space-y-1 text-[11px] text-[#475569] dark:text-[#94a3b8]">
                            <div className="flex items-center justify-between gap-2">
                                <span className="inline-flex items-center gap-1">
                                    <Calendar size={11} /> Receipt Date
                                </span>
                                <span className="font-medium text-[#0f172a] dark:text-[#e2e8f0]">
                                    {formatReceiptDateDisplay(item.receiptDate)}
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="inline-flex items-center gap-1">
                                    <Clock size={11} /> Verified At
                                </span>
                                <span className="font-medium text-[#0f172a] dark:text-[#e2e8f0]">
                                    {formatDate(item.verifiedAt || item.createdAt)}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-1.5">
                            <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/40 text-rose-800 dark:text-rose-300 text-[11px] leading-snug line-clamp-2">
                                <span className="font-semibold">Reason: </span>
                                {item.failureReason || "Transaction verification failed"}
                            </div>
                            <div className="flex items-center justify-between gap-2 text-[11px] text-[#475569] dark:text-[#94a3b8]">
                                <span className="inline-flex items-center gap-1">
                                    <Clock size={11} /> Uploaded
                                </span>
                                <span className="font-medium text-[#0f172a] dark:text-[#e2e8f0]">
                                    {formatDate(item.createdAt)}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onPreview(item)}
                    className="w-full h-8 text-[11px] font-semibold"
                >
                    View Receipt &amp; Metadata
                </Button>
            </div>
        </div>
    );
}

