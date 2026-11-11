"use client";

import Link from "next/link";
import { ShieldCheck, Terminal, Cpu } from "lucide-react";

export default function AuthSidePanel({ subtitle }: { subtitle: string }) {
    return (
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12 border-r border-white/[0.08] bg-[#070b10]">
            <div className="absolute inset-0 bg-grid-architectural opacity-25 pointer-events-none" />
            <div className="relative z-10 max-w-md space-y-8">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#064e3b] to-[#022c22] border border-[#10b981]/40 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        <span className="font-mono text-sm font-black text-[#34d399]">YP</span>
                    </div>
                    <span className="text-2xl font-black text-white tracking-tight">
                        YEGNA<span className="text-[#34d399] font-light">PAY</span>
                    </span>
                </Link>

                <div>
                    <h2 className="text-3xl font-black text-white leading-tight mb-3 tracking-tight">
                        {subtitle}
                    </h2>
                    <p className="text-sm text-[#94a3b8] leading-relaxed">
                        Autonomous payment verification connecting your systems directly with CBE, Awash Bank, and Bank of Abyssinia ledgers.
                    </p>
                </div>

                <div className="space-y-3 pt-6 border-t border-white/[0.08] font-mono text-xs">
                    <div className="flex items-center gap-3 text-[#cbd5e1]">
                        <ShieldCheck size={16} className="text-[#34d399]" />
                        <span>Cryptographic anti-replay security tokens</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#cbd5e1]">
                        <Terminal size={16} className="text-[#34d399]" />
                        <span>Unified REST API & Webhook dispatch</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#cbd5e1]">
                        <Cpu size={16} className="text-[#34d399]" />
                        <span>Flat 0.50 ETB fee per verified transaction</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

