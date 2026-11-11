"use client";

import React, { useState } from "react";
import { Check, Clock, AlertTriangle, Search } from "lucide-react";
import { mockTransactions, Transaction } from "./product-types";
import ProductTable from "./product-table";
import ProductInspector from "./product-inspector";

export default function ProductShowcase() {
    const [selectedTab, setSelectedTab] = useState<"all" | "verified" | "pending" | "rejected">("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTxId, setSelectedTxId] = useState<string>("FT26133F833J");

    const filteredTransactions = mockTransactions.filter((tx) => {
        if (selectedTab !== "all" && tx.status !== selectedTab) return false;
        if (
            searchQuery &&
            !tx.sender.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !tx.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !tx.bank.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
            return false;
        }
        return true;
    });

    const activeTx = mockTransactions.find((t) => t.id === selectedTxId) || mockTransactions[0];

    return (
        <section id="product-showcase" className="relative py-28 sm:py-36 bg-[#060a0f] text-[#f1f5f9] border-b border-white/[0.06] overflow-hidden">
            <div className="absolute inset-0 bg-grid-architectural opacity-30 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/[0.08]">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[#34d399] mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                            <span>Product Console // Real Data Architecture</span>
                        </div>
                        <h2 className="font-sans font-black text-3xl sm:text-5xl tracking-tight text-white leading-tight">
                            The verification console.<br />
                            Engineered for zero human doubt.
                        </h2>
                    </div>
                    <p className="text-sm sm:text-base text-[#94a3b8] max-w-md font-normal leading-relaxed">
                        Every incoming transfer is interrogated across bank core records, amount exactness, and anti-replay ledger trees in under 200 milliseconds.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="p-5 rounded-xl bg-[#0a1118] border border-white/[0.08]">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#64748b]">Total Interrogations</span>
                        <div className="mt-2 text-2xl font-black text-white font-mono">1,482</div>
                        <span className="text-[11px] text-[#34d399] font-mono mt-1 block">Live workspace session</span>
                    </div>
                    <div className="p-5 rounded-xl bg-[#0a1118] border border-white/[0.08]">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#64748b]">Clearance Rate</span>
                        <div className="mt-2 text-2xl font-black text-white font-mono">99.4%</div>
                        <span className="text-[11px] text-[#34d399] font-mono mt-1 block">1,465 validated matches</span>
                    </div>
                    <div className="p-5 rounded-xl bg-[#0a1118] border border-white/[0.08]">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#64748b]">Duplicates Blocked</span>
                        <div className="mt-2 text-2xl font-black text-[#f59e0b] font-mono">17</div>
                        <span className="text-[11px] text-[#64748b] font-mono mt-1 block">Replay fraud prevented</span>
                    </div>
                    <div className="p-5 rounded-xl bg-[#0a1118] border border-white/[0.08]">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#64748b]">Median Ledger Query</span>
                        <div className="mt-2 text-2xl font-black text-white font-mono">180ms</div>
                        <span className="text-[11px] text-[#34d399] font-mono mt-1 block">Sub-second settlement</span>
                    </div>
                </div>

                <div className="rounded-2xl border border-white/[0.12] bg-[#0a1118] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] overflow-hidden">
                    <div className="h-12 px-6 bg-[#060a0f] border-b border-white/[0.08] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-[#ef4444]/80" />
                                <div className="w-3 h-3 rounded-full bg-[#f59e0b]/80" />
                                <div className="w-3 h-3 rounded-full bg-[#10b981]/80" />
                            </div>
                            <span className="h-4 w-px bg-white/10 ml-2" />
                            <span className="font-mono text-xs text-[#94a3b8] font-bold">console.yegnapay.et / verification / ledger-stream</span>
                        </div>
                        <span className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-[#34d399]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" /> SYNC_MODE: REALTIME_POLL
                        </span>
                    </div>

                    <div className="p-6 border-b border-white/[0.06] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-[#0a1118]">
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 font-mono text-xs">
                            {(["all", "verified", "pending", "rejected"] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setSelectedTab(tab)}
                                    className={`px-3 py-1.5 rounded font-bold uppercase transition-colors flex items-center gap-1.5 ${
                                        selectedTab === tab
                                            ? tab === "verified" ? "bg-[#064e3b] text-[#34d399] border border-[#10b981]/50"
                                            : tab === "pending" ? "bg-[#78350f]/60 text-[#fbbf24] border border-[#f59e0b]/50"
                                            : tab === "rejected" ? "bg-[#450a0a]/60 text-[#f87171] border border-[#ef4444]/50"
                                            : "bg-white text-[#060a0f]"
                                            : "bg-white/[0.05] text-[#94a3b8] hover:text-white"
                                    }`}
                                >
                                    {tab === "verified" && <Check size={12} />}
                                    {tab === "pending" && <Clock size={12} />}
                                    {tab === "rejected" && <AlertTriangle size={12} />}
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#060a0f] border border-white/10 text-xs font-mono">
                            <Search size={14} className="text-[#64748b]" />
                            <input
                                type="text"
                                placeholder="Filter hash, sender, bank..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-none outline-none text-[#f1f5f9] placeholder:text-[#64748b] w-48 sm:w-60"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
                        <ProductTable
                            transactions={filteredTransactions}
                            selectedTxId={selectedTxId}
                            onSelectTx={setSelectedTxId}
                        />
                        <ProductInspector activeTx={activeTx} />
                    </div>
                </div>
            </div>
        </section>
    );
}
