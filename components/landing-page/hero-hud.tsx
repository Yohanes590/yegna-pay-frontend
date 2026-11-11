"use client";

import Image from "next/image";
import { ShieldCheck } from "lucide-react";

interface VerificationItem {
    bank: string;
    code: string;
    txId: string;
    amount: string;
    sender: string;
    status: string;
    latency: string;
}

export default function HeroHud({
    activeVerification,
    liveCount,
}: {
    activeVerification: VerificationItem;
    liveCount: number;
}) {
    return (
        <div className="lg:col-span-5 relative w-full mt-6 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.12] bg-[#0a1118] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)]">
                <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
                    <Image
                        src="/assets/hero-laptop-workspace.jpg"
                        alt="Yegna Pay Payment Verification Console"
                        fill
                        priority
                        className="object-cover object-center filter brightness-[0.92] contrast-[1.08] transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060a0f] via-transparent to-transparent opacity-80" />
                    <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded bg-[#060a0f]/80 backdrop-blur border border-white/10 text-[#cbd5e1]">
                        Console View // Production Node
                    </div>
                </div>

                <div className="p-6 bg-[#0a1118] border-t border-white/[0.08]">
                    <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                                Live Verification Pipe
                            </span>
                        </div>
                        <span className="font-mono text-[10px] text-[#64748b]">TX #{liveCount}</span>
                    </div>

                    <div className="mt-4 space-y-3 font-mono text-xs">
                        <div className="flex justify-between items-center">
                            <span className="text-[#64748b]">Active Bank Rail</span>
                            <span className="text-[#f1f5f9] font-bold flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                                {activeVerification.bank}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[#64748b]">Transaction Hash</span>
                            <span className="text-[#34d399] bg-[#064e3b]/30 px-2 py-0.5 rounded border border-[#10b981]/30">
                                {activeVerification.txId}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[#64748b]">Extracted Amount</span>
                            <span className="text-white font-bold text-sm">{activeVerification.amount}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[#64748b]">Payer Ledger Match</span>
                            <span className="text-[#cbd5e1] truncate max-w-[190px]">{activeVerification.sender}</span>
                        </div>
                        <div className="pt-2 flex items-center justify-between border-t border-white/[0.06]">
                            <span className="text-[10px] text-[#64748b] uppercase">Settlement Verdict</span>
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-[#10b981] uppercase tracking-wider bg-[#10b981]/10 px-2.5 py-1 rounded border border-[#10b981]/30">
                                <ShieldCheck size={13} />
                                200 OK — Verified ({activeVerification.latency})
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden sm:flex justify-between items-center mt-3 text-[10px] font-mono text-[#475569]">
                <span>LAT: 9.0300° N, LON: 38.7400° E</span>
                <span>ADDIS ABABA FINANCIAL DISTRICT</span>
            </div>
        </div>
    );
}

