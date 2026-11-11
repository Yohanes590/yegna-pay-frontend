"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { BankNode } from "./bank-nodes-data";

export default function BankNodeInspector({ activeBank }: { activeBank: BankNode }) {
    return (
        <div className="lg:col-span-7 rounded-2xl border border-white/[0.12] bg-[#0a1118] p-8 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)] relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
                <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-xl bg-[#060a0f] border border-[#10b981]/30 p-2.5 flex items-center justify-center">
                        <Image
                            src={activeBank.logo}
                            alt={activeBank.name}
                            width={48}
                            height={48}
                            className="object-contain"
                        />
                    </div>
                    <div>
                        <h3 className="font-sans font-bold text-xl text-white">{activeBank.name}</h3>
                        <span className="font-mono text-xs text-[#34d399]">
                            Status: {activeBank.status} (Zero degradation)
                        </span>
                    </div>
                </div>

                <div className="font-mono text-right text-xs">
                    <span className="text-[#64748b] block">Interrogation Speed</span>
                    <span className="text-lg font-bold text-white">{activeBank.latency}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 font-mono text-xs">
                <div className="p-4 rounded-lg bg-[#060a0f] border border-white/[0.06]">
                    <span className="text-[#64748b] block mb-1 uppercase text-[10px]">Active Protocol Adapter</span>
                    <span className="text-[#cbd5e1] font-bold">{activeBank.protocol}</span>
                </div>
                <div className="p-4 rounded-lg bg-[#060a0f] border border-white/[0.06]">
                    <span className="text-[#64748b] block mb-1 uppercase text-[10px]">Reference Hash Standard</span>
                    <span className="text-[#34d399] font-bold">{activeBank.hashFormat}</span>
                </div>
            </div>

            <div className="space-y-3 pt-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#64748b] block mb-3">
                    Technical Node Implementation
                </span>
                {activeBank.technicalSpecs.map((spec, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#064e3b]/40 border border-[#10b981]/30 flex items-center justify-center text-[#34d399] flex-shrink-0 mt-0.5">
                            <CheckCircle2 size={12} />
                        </div>
                        <span className="text-sm text-[#cbd5e1] font-normal leading-relaxed">{spec}</span>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-4">
                <span className="text-xs font-mono text-[#64748b]">
                    Endpoint: <code className="text-[#34d399]">POST /api/transaction-create</code>
                </span>
                <Link
                    href="/connected-banks"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-[#34d399] hover:text-[#6ee7b7] font-bold uppercase tracking-wider"
                >
                    <span>View Deep Rail Specifications</span>
                    <ArrowUpRight size={14} />
                </Link>
            </div>
        </div>
    );
}

