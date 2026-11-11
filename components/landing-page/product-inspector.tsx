"use client";

import { Database } from "lucide-react";
import { Transaction } from "./product-types";

export default function ProductInspector({ activeTx }: { activeTx: Transaction }) {
    return (
        <div className="lg:col-span-5 p-6 bg-[#060a0f]/40 flex flex-col justify-between">
            <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2">
                        <Database size={15} className="text-[#34d399]" />
                        <span className="font-mono text-xs uppercase tracking-wider font-bold text-white">
                            Verification Proof Ledger
                        </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#64748b]">NODE: ET-AA-01</span>
                </div>

                <div className="mt-4 space-y-4 font-mono text-xs">
                    <div className="p-3.5 rounded-lg bg-[#0a1118] border border-white/[0.08]">
                        <span className="text-[10px] uppercase text-[#64748b] block mb-1">
                            Status Determination
                        </span>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-white flex items-center gap-1.5">
                                {activeTx.status === "verified" && <span className="text-[#34d399]">✓ CLEARED / 200 SUCCESS</span>}
                                {activeTx.status === "pending" && <span className="text-[#fbbf24]">⏳ POLLING BANK GATEWAY</span>}
                                {activeTx.status === "rejected" && <span className="text-[#f87171]">✗ TRANSACTION BLOCKED</span>}
                            </span>
                            <span className="text-[10px] text-[#64748b]">{activeTx.timestamp}</span>
                        </div>
                        {activeTx.reason && (
                            <div className="mt-2 text-[11px] text-[#f87171] bg-[#450a0a]/30 p-2 rounded border border-[#ef4444]/20 leading-relaxed">
                                {activeTx.reason}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                            <span className="text-[#64748b]">Selected Bank:</span>
                            <span className="text-white font-bold">{activeTx.bank}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                            <span className="text-[#64748b]">Transaction Hash:</span>
                            <span className="text-[#34d399] font-bold">{activeTx.id}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                            <span className="text-[#64748b]">Amount Match:</span>
                            <span className="text-white">{activeTx.amount.toFixed(2)} ETB (Exact Match)</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                            <span className="text-[#64748b]">Internal Ref:</span>
                            <span className="text-[#cbd5e1]">{activeTx.reference}</span>
                        </div>
                        <div className="flex justify-between py-1.5">
                            <span className="text-[#64748b]">Replay Signature:</span>
                            <span className="text-[#34d399]">HMAC-SHA256 OK</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.08]">
                <span className="text-[10px] font-mono text-[#64748b] uppercase tracking-wider block mb-2">
                    Raw Inbound Verification JSON
                </span>
                <pre className="p-3 rounded-lg bg-[#060a0f] border border-white/[0.06] text-[11px] font-mono text-[#34d399] overflow-x-auto leading-relaxed">
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

