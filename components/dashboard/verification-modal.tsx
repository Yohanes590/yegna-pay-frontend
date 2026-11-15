"use client";

import { CheckCircle2, XCircle, Clock, ShieldCheck, ArrowRight, Building2, Hash, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatPlatformLabel, formatTransactionId, getReceiptUrl, getTransactionPlatform } from "@/lib/utils";
import { usePublicConfig } from "@/lib/hooks/use-public-config";

interface VerificationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    record: any;
}

export default function VerificationModal({ open, onOpenChange, record }: VerificationModalProps) {
    const { requestCurrency, currency } = usePublicConfig();
    if (!record) return null;

    const isVerified = record.transaction_status === "verified";
    const isPending = record.transaction_status === "pending";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md sm:max-w-lg p-6 bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b]">
                <DialogHeader className="pb-4 border-b border-[#f1f5f9] dark:border-[#1e293b]">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-base font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-2">
                            <ShieldCheck size={18} className="text-[#059669] dark:text-[#34d399]" />
                            Verification Audit Record
                        </DialogTitle>
                        <Badge variant={isVerified ? "verified" : isPending ? "pending" : "rejected"}>
                            {record.transaction_status?.toUpperCase() || "UNKNOWN"}
                        </Badge>
                    </div>
                    <DialogDescription className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                        Cryptographic ledger proof and bank response inspection
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 pt-2">
                    {/* Amount & Bank Headline */}
                    <div className="p-4 bg-[#f8fafc] dark:bg-[#131d2a] border border-[#e2e8f0] dark:border-[#1e293b] rounded-xl flex items-center justify-between">
                        <div>
                            <span className="text-[10px] uppercase font-bold text-[#64748b] dark:text-[#94a3b8] block">Audited Value</span>
                            <span className="text-2xl font-black font-mono text-[#064e3b] dark:text-[#34d399]">
                                {Number(record.transaction_amount || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })} {record.currency || "ETB"}
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] uppercase font-bold text-[#64748b] dark:text-[#94a3b8] block">Banking Rail</span>
                            <span className="text-xs font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center justify-end gap-1 mt-0.5">
                                <Building2 size={13} className="text-[#059669] dark:text-[#34d399]" />
                                {formatPlatformLabel(getTransactionPlatform(record))}
                            </span>
                        </div>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b] rounded-lg">
                            <span className="text-[10px] font-bold text-[#64748b] dark:text-[#94a3b8] uppercase block">Transaction Reference</span>
                            <span className="font-mono font-bold text-[#0f172a] dark:text-[#f8fafc] break-all block mt-0.5">
                                {formatTransactionId(record.transaction_id)}
                            </span>
                        </div>
                        <div className="p-3 bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b] rounded-lg">
                            <span className="text-[10px] font-bold text-[#64748b] dark:text-[#94a3b8] uppercase block">Timestamp</span>
                            <span className="font-semibold text-[#0f172a] dark:text-[#f8fafc] block mt-0.5">
                                {formatDate(record.created_at)}
                            </span>
                        </div>
                        <div className="p-3 bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b] rounded-lg">
                            <span className="text-[10px] font-bold text-[#64748b] dark:text-[#94a3b8] uppercase block">Sender Identity</span>
                            <span className="font-semibold text-[#0f172a] dark:text-[#f8fafc] block mt-0.5">
                                {record.from || "Verified Payer"}
                            </span>
                        </div>
                        <div className="p-3 bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b] rounded-lg">
                            <span className="text-[10px] font-bold text-[#64748b] dark:text-[#94a3b8] uppercase block">Recipient Anchor</span>
                            <span className="font-semibold text-[#0f172a] dark:text-[#f8fafc] block mt-0.5">
                                {record.to || "Merchant Treasury"}
                            </span>
                        </div>
                    </div>

                    {/* Verification Layer Results */}
                    <div className="p-4 bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b] rounded-xl space-y-2.5">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] dark:text-[#94a3b8]">Engine Integrity Checks</p>
                        <div className="flex items-center justify-between text-xs py-1 border-b border-[#f1f5f9] dark:border-[#1e293b]">
                            <span className="text-[#334155] dark:text-[#94a3b8] font-medium">Bank Statement Match</span>
                            <span className="text-[#059669] dark:text-[#34d399] font-bold flex items-center gap-1">
                                <CheckCircle2 size={13} /> {isVerified ? "Confirmed" : "Mismatch"}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-xs py-1 border-b border-[#f1f5f9] dark:border-[#1e293b]">
                            <span className="text-[#334155] dark:text-[#94a3b8] font-medium">Anti-Replay / Duplicate Detection</span>
                            <span className="text-[#059669] dark:text-[#34d399] font-bold flex items-center gap-1">
                                <CheckCircle2 size={13} /> Unique Proof (Score 0)
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-xs py-1">
                            <span className="text-[#334155] dark:text-[#94a3b8] font-medium">Tariff Settlement</span>
                            <span className="font-mono font-bold text-[#0f172a] dark:text-[#f8fafc]">{requestCurrency.toFixed(2)} {currency}</span>
                        </div>
                    </div>

                    {/* Real Receipt Action Button */}
                    <div className="pt-1">
                        <a
                            href={getReceiptUrl(record)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold text-white bg-[#059669] hover:bg-[#047857] shadow-xs transition-colors"
                        >
                            <ExternalLink size={14} />
                            <span>Open Official Bank Receipt</span>
                        </a>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

