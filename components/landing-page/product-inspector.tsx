"use client";

import { Database } from "lucide-react";
import { Transaction } from "./product-types";

export default function ProductInspector({ activeTx }: { activeTx: Transaction }) {
    return (
        <div className="lg:col-span-5 p-6 bg-slate-50/70 dark:bg-[#060a0f]/40 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-white/[0.06] flex flex-col justify-between">
            <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/[0.08]">
                    <div className="flex items-center gap-2">
                        <Database size={15} className="text-[#059669] dark:text-[#34d399]" />
                        <span className="font-mono text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-white">
                            Verification Proof Ledger
                        </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-[#64748b]">NODE: ET-AA-01</span>
                </div>

                <div className="mt-4 space-y-4 font-mono text-xs">
                    <div className="p-3.5 rounded-lg bg-white dark:bg-[#0a1118] border border-slate-200 dark:border-white/[0.08]">
                        <span className="text-[10px] uppercase text-slate-500 dark:text-[#64748b] block mb-1">
                            Status Determination
                        </span>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold flex items-center gap-1.5">
                                {activeTx.status === "verified" && <span className="text-[#059669] dark:text-[#34d399]">✓ CLEARED / 200 SUCCESS</span>}
                                {activeTx.status === "pending" && <span className="text-amber-600 dark:text-[#fbbf24]">⏳ POLLING BANK GATEWAY</span>}
                                {activeTx.status === "rejected" && <span className="text-rose-600 dark:text-[#f87171]">✗ TRANSACTION BLOCKED</span>}
                            </span>
                            <span className="text-[10px] text-slate-500 dark:text-[#64748b]">{activeTx.timestamp}</span>
                        </div>
                        {activeTx.reason && (
                            <div className="mt-2 text-[11px] text-rose-700 dark:text-[#f87171] bg-rose-50 dark:bg-[#450a0a]/30 p-2 rounded border border-rose-200 dark:border-[#ef4444]/20 leading-relaxed">
                                {activeTx.reason}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-white/[0.04]">
                            <span className="text-slate-500 dark:text-[#64748b]">Selected Bank:</span>
                            <span className="text-slate-900 dark:text-white font-bold">{activeTx.bank}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-white/[0.04]">
                            <span className="text-slate-500 dark:text-[#64748b]">Transaction Hash:</span>
                            <span className="text-[#059669] dark:text-[#34d399] font-bold">{activeTx.id}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-white/[0.04]">
                            <span className="text-slate-500 dark:text-[#64748b]">Amount Match:</span>
                            <span className="text-slate-900 dark:text-white tabular-nums">{activeTx.amount.toFixed(2)} ETB (Exact Match)</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-white/[0.04]">
                            <span className="text-slate-500 dark:text-[#64748b]">Internal Ref:</span>
                            <span className="text-slate-700 dark:text-[#cbd5e1]">{activeTx.reference}</span>
                        </div>
                        <div className="flex justify-between py-1.5">
                            <span className="text-slate-500 dark:text-[#64748b]">Replay Signature:</span>
                            <span className="text-[#059669] dark:text-[#34d399]">HMAC-SHA256 OK</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/[0.08]">
                <span className="text-[10px] font-mono text-slate-500 dark:text-[#64748b] uppercase tracking-wider block mb-2">
                    Raw Inbound Verification JSON
                </span>
                <pre className="p-3 rounded-lg bg-slate-100 dark:bg-[#060a0f] border border-slate-200 dark:border-white/[0.06] text-[11px] font-mono text-[#047857] dark:text-[#34d399] overflow-x-auto leading-relaxed">
{JSON.stringify(
    {
        success: activeTx.status === "verified",
        transaction_id: activeTx.id,
        amount: activeTx.amount,
        currency: "ETB",
        platform: activeTx.bank,
        verified: activeTx.status === "verified",
        verification_fee_etb: 0.50,
    },
    null,
    2
)}
                </pre>
            </div>
        </div>
    );
}
