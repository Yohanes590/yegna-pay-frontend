"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, ExternalLink, Copy, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { formatCurrency, formatDate, formatPlatformLabel, formatTransactionId, getReceiptUrl } from "@/lib/utils";
import QrReceiptThumbnail from "./qr-thumbnail";
import { formatReceiptDateDisplay, type QrReceiptImageItem } from "./types";

interface QrPreviewModalProps {
    item: QrReceiptImageItem | null;
    projectName: string;
    copiedId: string | null;
    onCopy: (value: string, id: string) => void;
    onClose: () => void;
}

export default function QrPreviewModal({ item, projectName, copiedId, onCopy, onClose }: QrPreviewModalProps) {
    const [zoomed, setZoomed] = useState(false);

    return (
        <Dialog
            open={Boolean(item)}
            onOpenChange={(open) => {
                if (!open) {
                    setZoomed(false);
                    onClose();
                }
            }}
        >
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                {item && (
                    <>
                        <DialogHeader>
                            <div className="flex items-center gap-2 flex-wrap">
                                <DialogTitle>QR Receipt Inspection</DialogTitle>
                                <Badge variant={item.status === "VERIFIED" ? "verified" : "rejected"}>
                                    {item.status === "VERIFIED" ? (
                                        <>
                                            <CheckCircle2 size={11} /> Verified QR Code
                                        </>
                                    ) : (
                                        <>
                                            <XCircle size={11} /> Failed Verification
                                        </>
                                    )}
                                </Badge>
                            </div>
                            <DialogDescription>
                                Uploaded receipt image and parsed verification record for {projectName}.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                            <div className="space-y-2">
                                <div
                                    onClick={() => setZoomed((z) => !z)}
                                    className={`relative rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] bg-[#f8fafc] dark:bg-[#08101a] overflow-auto cursor-zoom-in flex items-center justify-center ${
                                        zoomed ? "h-[420px]" : "h-80"
                                    }`}
                                    title={zoomed ? "Click to fit" : "Click to zoom"}
                                >
                                    <QrReceiptThumbnail
                                        src={item.imageUrl}
                                        alt={`Receipt ${item.extractedTransactionId || item.id}`}
                                        className={zoomed ? "max-w-none w-[140%] h-auto object-contain p-2" : "w-full h-full object-contain p-3"}
                                    />
                                </div>
                                <div className="flex items-center justify-between text-[11px] text-[#64748b] dark:text-[#94a3b8]">
                                    <span>Click image to toggle zoom</span>
                                    <a
                                        href={item.imageUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 font-medium text-[#059669] hover:underline"
                                    >
                                        Open original <ExternalLink size={11} />
                                    </a>
                                </div>
                            </div>

                            <div className="space-y-3 text-xs">
                                <div className="p-3 rounded-xl bg-[#f8fafc] dark:bg-[#08101a] border border-[#e2e8f0] dark:border-[#1e293b] space-y-2.5">
                                    <div>
                                        <span className="text-[10px] uppercase tracking-wider text-[#64748b] block">
                                            Extracted Transaction ID
                                        </span>
                                        <div className="flex items-center justify-between gap-2 mt-0.5">
                                            <span className="font-mono font-bold text-sm text-[#0f172a] dark:text-[#f8fafc] break-all">
                                                {item.extractedTransactionId ? formatTransactionId(item.extractedTransactionId) : "Not detected"}
                                            </span>
                                            {item.extractedTransactionId && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-7 px-2"
                                                    onClick={() =>
                                                        onCopy(formatTransactionId(item.extractedTransactionId!), `modal-${item.id}`)
                                                    }
                                                >
                                                    {copiedId === `modal-${item.id}` ? (
                                                        <Check size={13} className="text-emerald-600" />
                                                    ) : (
                                                        <Copy size={13} />
                                                    )}
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                    {item.qrContent && (
                                        <div>
                                            <span className="text-[10px] uppercase tracking-wider text-[#64748b] block">
                                                Decoded QR Payload
                                            </span>
                                            <p className="font-mono text-[11px] text-[#334155] dark:text-[#cbd5e1] break-all mt-0.5">
                                                {item.qrContent}
                                            </p>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-3 pt-1 border-t border-[#e2e8f0] dark:border-[#1e293b]">
                                        <div>
                                            <span className="text-[10px] uppercase tracking-wider text-[#64748b] block">Amount</span>
                                            <span className="font-mono font-bold text-[#0f172a] dark:text-[#f8fafc] mt-0.5 block">
                                                {item.transactionAmount != null ? formatCurrency(item.transactionAmount, item.currency || "ETB") : "—"}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] uppercase tracking-wider text-[#64748b] block">Bank</span>
                                            <span className="font-semibold text-[#0f172a] dark:text-[#f8fafc] mt-0.5 block">
                                                {formatPlatformLabel(item.bankName)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 pt-1 border-t border-[#e2e8f0] dark:border-[#1e293b]">
                                        <div>
                                            <span className="text-[10px] uppercase tracking-wider text-[#64748b] block">Receipt Date</span>
                                            <span className="font-medium text-[#0f172a] dark:text-[#f8fafc] mt-0.5 block">
                                                {formatReceiptDateDisplay(item.receiptDate)}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-[10px] uppercase tracking-wider text-[#64748b] block">
                                                {item.status === "VERIFIED" ? "Verified At" : "Uploaded At"}
                                            </span>
                                            <span className="font-medium text-[#0f172a] dark:text-[#f8fafc] mt-0.5 block">
                                                {formatDate(item.status === "VERIFIED" ? item.verifiedAt || item.createdAt : item.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {item.status === "FAILED" && (
                                    <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-300">
                                        <span className="text-[10px] uppercase font-bold tracking-wider block mb-0.5">Failure Reason</span>
                                        <p className="text-xs leading-relaxed">{item.failureReason || "Verification attempt failed."}</p>
                                    </div>
                                )}

                                {item.extractedTransactionId && (
                                    <a
                                        href={getReceiptUrl({
                                            platform: item.bankName,
                                            transaction_id: item.extractedTransactionId,
                                            transaction_url: item.qrContent?.startsWith("http") ? item.qrContent : undefined,
                                        })}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex w-full items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[#e2e8f0] dark:border-[#1e293b] bg-white dark:bg-[#0c141f] hover:bg-[#f8fafc] dark:hover:bg-[#131d2a] font-semibold text-[#0f172a] dark:text-[#f8fafc] transition-colors"
                                    >
                                        Open Bank Receipt Link <ExternalLink size={13} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

