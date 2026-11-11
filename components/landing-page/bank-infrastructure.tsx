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
        <section id="bank-infrastructure" className="relative py-28 sm:py-36 bg-[#060a0f] text-[#f1f5f9] border-b border-white/[0.06] overflow-hidden">
            <div className="absolute inset-0 bg-grid-architectural opacity-30 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 pb-8 border-b border-white/[0.08]">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[#34d399] mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                            <span>Supported Banking Rails // Ethiopia</span>
                        </div>
                        <h2 className="font-sans font-black text-3xl sm:text-5xl tracking-tight text-white leading-tight">
                            Direct clearing rails.<br />
                            One unified API schema.
                        </h2>
                    </div>
                    <p className="text-sm sm:text-base text-[#94a3b8] max-w-md leading-relaxed font-normal">
                        Verify payments originating from Ethiopia's principal financial institutions through standardized cryptographic verification adapters.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
                    <div className="lg:col-span-5 space-y-3">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#64748b] block mb-3">
                            Select Network Node to Inspect Protocol
                        </span>

                        {bankNodes.map((bank) => {
                            const isSelected = bank.id === activeBankId;
                            return (
                                <button
                                    key={bank.id}
                                    onClick={() => setActiveBankId(bank.id)}
                                    className={`w-full text-left p-5 rounded-xl border transition-all flex items-center justify-between group ${
                                        isSelected
                                            ? "bg-[#0a1118] border-[#10b981] shadow-[0_10px_30px_-10px_rgba(16,185,129,0.3)]"
                                            : "bg-[#0a1118]/60 border-white/[0.08] hover:border-white/20 hover:bg-[#0a1118]"
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-12 h-12 rounded-lg bg-[#060a0f] border border-white/10 p-2 flex items-center justify-center overflow-hidden flex-shrink-0">
                                            <Image
                                                src={bank.logo}
                                                alt={bank.name}
                                                width={40}
                                                height={40}
                                                className="object-contain"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-sans font-bold text-base text-white group-hover:text-[#34d399] transition-colors">
                                                {bank.name}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-1 text-xs font-mono text-[#64748b]">
                                                <span>{bank.railType}</span>
                                                <span>•</span>
                                                <span className="text-[#34d399]">{bank.latency}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <ArrowRight size={16} className={`transition-transform ${isSelected ? "text-[#34d399] translate-x-1" : "text-[#475569]"}`} />
                                </button>
                            );
                        })}
                    </div>

                    <BankNodeInspector activeBank={activeBank} />
                </div>

                <div className="rounded-2xl border border-white/[0.12] bg-[#0a1118] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center shadow-2xl">
                    <div className="lg:col-span-5 p-8 sm:p-12">
                        <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#34d399] block mb-4">
                            Infrastructure Assurance
                        </span>
                        <h3 className="font-sans font-black text-2xl sm:text-3xl text-white mb-6 leading-tight">
                            Built directly for the realities of Ethiopian banking.
                        </h3>
                        <p className="text-sm text-[#94a3b8] leading-relaxed mb-6 font-normal">
                            In Ethiopia, digital commerce often slows down at the payment confirmation step. Customers send SMS receipts, screenshots get photoshopped, and accounting teams waste hours refreshing statements.
                        </p>
                        <div className="flex items-center gap-6 font-mono text-xs text-[#64748b]">
                            <div>
                                <span className="block text-white font-bold text-base">24/7/365</span>
                                <span>Continuous Polling</span>
                            </div>
                            <div className="h-8 w-px bg-white/10" />
                            <div>
                                <span className="block text-[#34d399] font-bold text-base">0.5 ETB</span>
                                <span>Transparent Clearing Fee</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 relative h-72 lg:h-[380px] w-full">
                        <Image
                            src="/assets/banking-infrastructure.jpg"
                            alt="Yegna Pay core banking infrastructure and cryptographic server vault"
                            fill
                            className="object-cover object-center filter brightness-90 contrast-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1118] via-transparent to-transparent hidden lg:block" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1118] via-transparent to-transparent lg:hidden" />
                    </div>
                </div>
            </div>
        </section>
    );
}
