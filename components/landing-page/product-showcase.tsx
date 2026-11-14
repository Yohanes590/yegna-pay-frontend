"use client";

import React, { useState } from "react";
import { Check, Clock, AlertTriangle, Search } from "lucide-react";
import { mockTransactions } from "./product-types";
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
        <section id="product-showcase" className="py-20 sm:py-28 bg-slate-50 dark:bg-[#070b10] text-slate-900 dark:text-[#f1f5f9] border-b border-slate-200 dark:border-white/[0.07]">
            <div className="max-w-7xl mx-auto px-5 sm:px-8">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
                    <div className="max-w-2xl">
                        <span className="font-mono text-xs text-[#059669] dark:text-[#34d399] uppercase tracking-wider block mb-3">
                            Verification Console
                        </span>
                        <h2 className="font-sans font-bold text-3xl sm:text-4xl tracking-tight text-slate-950 dark:text-white">
                            Audit every transfer, amount match, and replay attempt.
                        </h2>
                    </div>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-[#94a3b8] max-w-md leading-relaxed">
                        Inspect transaction IDs, bank rails, normalized payer/recipient names, and QR receipt audit
                        records from one workspace.
                    </p>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-[#0c1219] overflow-hidden shadow-lg dark:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)]">
                    <div className="h-11 px-5 bg-slate-100 dark:bg-[#070b10] border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-white/15" />
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-white/15" />
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-white/15" />
                            </div>
                            <span className="font-mono text-xs text-slate-500 dark:text-[#94a3b8]">
                                dashboard / verifications / ledger
                            </span>
                        </div>
                        <span className="hidden sm:inline font-mono text-[11px] text-slate-400 dark:text-[#64748b]">
                            Interactive Preview
                        </span>
                    </div>

                    <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-white/[0.08] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white dark:bg-[#0c1219]">
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 font-mono text-xs">
                            {(["all", "verified", "pending", "rejected"] as const).map((tab) => (
                                <button
                                    key={tab}
                                    type="button"
                                    onClick={() => setSelectedTab(tab)}
                                    className={`px-3 py-1.5 rounded-md font-semibold uppercase transition-colors flex items-center gap-1.5 ${
                                        selectedTab === tab
                                            ? tab === "verified"
                                                ? "bg-emerald-50 text-[#047857] border border-emerald-200 dark:bg-[#064e3b] dark:text-[#34d399] dark:border-[#10b981]/40"
                                                : tab === "pending"
                                                ? "bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-500/40"
                                                : tab === "rejected"
                                                ? "bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-500/40"
                                                : "bg-slate-900 text-white dark:bg-white dark:text-[#070b10]"
                                            : "bg-slate-100 text-slate-600 hover:text-slate-950 dark:bg-white/[0.04] dark:text-[#94a3b8] dark:hover:text-white"
                                    }`}
                                >
                                    {tab === "verified" && <Check size={12} />}
                                    {tab === "pending" && <Clock size={12} />}
                                    {tab === "rejected" && <AlertTriangle size={12} />}
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-[#070b10] border border-slate-200 dark:border-white/[0.08] text-xs font-mono">
                            <Search size={14} className="text-slate-400 dark:text-[#64748b]" />
                            <input
                                type="text"
                                placeholder="Filter reference, sender, bank..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-none outline-none text-slate-900 dark:text-[#f1f5f9] placeholder:text-slate-400 dark:placeholder:text-[#64748b] w-full sm:w-56"
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
