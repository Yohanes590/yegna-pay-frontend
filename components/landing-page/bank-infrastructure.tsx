"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { bankNodes } from "./bank-nodes-data";
import BankNodeInspector from "./bank-node-inspector";

export default function BankInfrastructure() {
    const [activeBankId, setActiveBankId] = useState<string>("cbe");
    const activeBank = bankNodes.find((b) => b.id === activeBankId) || bankNodes[0];

    return (
        <section
            id="bank-infrastructure"
            className="py-20 sm:py-28 bg-slate-50 dark:bg-[#090e15] text-slate-900 dark:text-[#f1f5f9] border-b border-slate-200 dark:border-white/[0.07]"
        >
            <div className="max-w-7xl mx-auto px-5 sm:px-8">
                <div className="max-w-2xl mb-12">
                    <span className="font-mono text-xs text-[#059669] dark:text-[#34d399] uppercase tracking-wider block mb-3">
                        Supported Payment Platforms
                    </span>
                    <h2 className="font-sans font-bold text-3xl sm:text-4xl tracking-tight text-slate-950 dark:text-white">
                        One integration for Ethiopia&apos;s primary bank transfer rails.
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-[#94a3b8] mt-3 leading-relaxed">
                        Select a bank adapter below to inspect its verified receipt domain, reference format, and
                        automated validation checks.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-5 space-y-2.5">
                        {bankNodes.map((bank) => {
                            const isSelected = bank.id === activeBankId;
                            return (
                                <button
                                    key={bank.id}
                                    type="button"
                                    onClick={() => setActiveBankId(bank.id)}
                                    className={`w-full text-left p-4 rounded-xl border transition-colors flex items-center justify-between gap-4 ${
                                        isSelected
                                            ? "bg-white dark:bg-[#0c1219] border-[#059669] dark:border-[#10b981]/60 shadow-sm dark:shadow-none"
                                            : "bg-white/70 dark:bg-[#0c1219]/50 border-slate-200 dark:border-white/[0.07] hover:border-slate-300 dark:hover:border-white/[0.16] hover:bg-white dark:hover:bg-[#0c1219]"
                                    }`}
                                >
                                    <div className="flex items-center gap-3.5 min-w-0">
                                        <div className="w-11 h-11 rounded-lg bg-slate-50 dark:bg-[#070b10] border border-slate-200 dark:border-white/[0.08] p-2 flex items-center justify-center shrink-0">
                                            <Image
                                                src={bank.logo}
                                                alt={bank.name}
                                                width={36}
                                                height={36}
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-sans font-semibold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                                                {bank.name}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-0.5 text-xs font-mono text-slate-500 dark:text-[#94a3b8]">
                                                <span className="text-[#059669] dark:text-[#34d399]">{bank.shortName}</span>
                                                <span className="text-slate-300 dark:text-[#334155]">•</span>
                                                <span className="truncate">{bank.domain}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <ArrowRight
                                        size={15}
                                        className={`shrink-0 transition-transform ${
                                            isSelected ? "text-[#059669] dark:text-[#34d399] translate-x-0.5" : "text-slate-400 dark:text-[#475569]"
                                        }`}
                                    />
                                </button>
                            );
                        })}
                    </div>

                    <BankNodeInspector activeBank={activeBank} />
                </div>
            </div>
        </section>
    );
}
