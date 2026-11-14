"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { BankNode } from "./bank-nodes-data";

export default function BankNodeInspector({ activeBank }: { activeBank: BankNode }) {
    return (
        <div className="lg:col-span-7 rounded-xl border border-slate-200 dark:border-white/[0.09] bg-white dark:bg-[#0c1219] p-6 sm:p-8 shadow-sm dark:shadow-none">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-white/[0.08] gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-50 dark:bg-[#070b10] border border-[#059669]/25 dark:border-[#10b981]/30 p-2 flex items-center justify-center shrink-0">
                        <Image
                            src={activeBank.logo}
                            alt={activeBank.name}
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                    </div>
                    <div>
                        <h3 className="font-sans font-bold text-lg sm:text-xl text-slate-950 dark:text-white">
                            {activeBank.name}
                        </h3>
                        <span className="font-mono text-xs text-[#059669] dark:text-[#34d399]">
                            {activeBank.railType} · {activeBank.status}
                        </span>
                    </div>
                </div>

                <span className="inline-flex items-center px-2.5 py-1 rounded bg-emerald-50 dark:bg-[#064e3b]/50 border border-emerald-200 dark:border-[#10b981]/30 font-mono text-xs text-[#047857] dark:text-[#34d399] self-start sm:self-center">
                    platform: &quot;{activeBank.shortName}&quot;
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6 font-mono text-xs">
                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#070b10] border border-slate-200 dark:border-white/[0.07]">
                    <span className="text-slate-500 dark:text-[#64748b] block mb-1 uppercase text-[10px] tracking-wider">
                        Verified Receipt Domain
                    </span>
                    <span className="text-slate-900 dark:text-[#e2e8f0] font-medium">{activeBank.domain}</span>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#070b10] border border-slate-200 dark:border-white/[0.07]">
                    <span className="text-slate-500 dark:text-[#64748b] block mb-1 uppercase text-[10px] tracking-wider">
                        Reference Standard
                    </span>
                    <span className="text-[#059669] dark:text-[#34d399] font-medium">{activeBank.hashFormat}</span>
                </div>
            </div>

            <div className="space-y-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-[#64748b] block">
                    Verification Pipeline Checks
                </span>
                {activeBank.technicalSpecs.map((spec, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 size={15} className="text-[#059669] dark:text-[#34d399] shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700 dark:text-[#cbd5e1] leading-relaxed">{spec}</span>
                    </div>
                ))}
            </div>

            <div className="mt-7 pt-5 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between flex-wrap gap-3">
                <span className="text-xs font-mono text-slate-500 dark:text-[#94a3b8]">
                    Endpoint: <code className="text-[#059669] dark:text-[#34d399]">POST /api/transaction-create</code>
                </span>
                <Link
                    href="/connected-banks"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#059669] hover:text-[#047857] dark:text-[#34d399] dark:hover:text-[#6ee7b7] transition-colors"
                >
                    <span>View Bank Specifications</span>
                    <ArrowUpRight size={14} />
                </Link>
            </div>
        </div>
    );
}
