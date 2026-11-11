"use client";

import { Check, Clock, AlertTriangle } from "lucide-react";
import { Transaction } from "./product-types";

export default function ProductTable({
    transactions,
    selectedTxId,
    onSelectTx,
}: {
    transactions: Transaction[];
    selectedTxId: string;
    onSelectTx: (id: string) => void;
}) {
    return (
        <div className="lg:col-span-7 overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
                <thead>
                    <tr className="border-b border-white/[0.06] bg-[#060a0f]/60 text-[#64748b] uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-4">Tx Hash / Bank</th>
                        <th className="py-3 px-4">Payer / Source</th>
                        <th className="py-3 px-4 text-right">Amount</th>
                        <th className="py-3 px-4 text-center">Verdict</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                    {transactions.map((tx) => {
                        const isSelected = tx.id === selectedTxId;
                        return (
                            <tr
                                key={tx.id}
                                onClick={() => onSelectTx(tx.id)}
                                className={`cursor-pointer transition-colors ${
                                    isSelected
                                        ? "bg-[#064e3b]/25 border-l-2 border-l-[#10b981]"
                                        : "hover:bg-white/[0.02]"
                                }`}
                            >
                                <td className="py-3.5 px-4">
                                    <span className="font-bold text-white block">{tx.id}</span>
                                    <span className="text-[10px] text-[#94a3b8] flex items-center gap-1 mt-0.5">
                                        {tx.bank}
                                    </span>
                                </td>
                                <td className="py-3.5 px-4">
                                    <span className="font-bold text-[#e2e8f0] block truncate max-w-[180px]">
                                        {tx.sender}
                                    </span>
                                    <span className="text-[10px] text-[#64748b]">{tx.timestamp}</span>
                                </td>
                                <td className="py-3.5 px-4 text-right font-bold text-white whitespace-nowrap">
                                    {tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}{" "}
                                    <span className="text-[10px] text-[#64748b] font-normal">{tx.currency}</span>
                                </td>
                                <td className="py-3.5 px-4 text-center">
                                    {tx.status === "verified" && (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#064e3b]/40 text-[#34d399] border border-[#10b981]/30">
                                            <Check size={11} /> Verified
                                        </span>
                                    )}
                                    {tx.status === "pending" && (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#78350f]/40 text-[#fbbf24] border border-[#f59e0b]/30">
                                            <Clock size={11} /> Pending
                                        </span>
                                    )}
                                    {tx.status === "rejected" && (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#450a0a]/40 text-[#f87171] border border-[#ef4444]/30">
                                            <AlertTriangle size={11} /> Flagged
                                        </span>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

