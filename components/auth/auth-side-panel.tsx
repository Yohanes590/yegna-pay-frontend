"use client";

import Link from "next/link";
import { ShieldCheck, Terminal, Cpu } from "lucide-react";

export default function AuthSidePanel({ subtitle }: { subtitle: string }) {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12 border-r border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-[#090e15]">
      <div className="relative z-10 max-w-md space-y-8">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#059669] flex items-center justify-center text-white font-mono text-xs font-bold">
            YP
          </div>
          <span className="font-sans text-lg font-bold text-slate-950 dark:text-white tracking-tight">
            Yegna Pay
          </span>
        </Link>

        <div className="space-y-3">
          <h2 className="font-sans text-3xl font-bold text-slate-950 dark:text-white leading-tight tracking-tight">
            {subtitle}
          </h2>
          <p className="text-sm text-slate-600 dark:text-[#94a3b8] leading-relaxed">
            Automated bank receipt and transaction link verification for Commercial Bank of Ethiopia, Awash Bank, and Bank of Abyssinia.
          </p>
        </div>

        <div className="space-y-3.5 pt-6 border-t border-slate-200 dark:border-white/[0.07] text-xs font-mono">
          <div className="flex items-center gap-3 text-slate-700 dark:text-[#cbd5e1]">
            <ShieldCheck size={15} className="text-[#059669] dark:text-[#34d399] shrink-0" />
            <span>Duplicate replay protection (409 YP_03DeFg)</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700 dark:text-[#cbd5e1]">
            <Terminal size={15} className="text-[#059669] dark:text-[#34d399] shrink-0" />
            <span>Dual JSON Link &amp; QR Receipt verification API</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700 dark:text-[#cbd5e1]">
            <Cpu size={15} className="text-[#059669] dark:text-[#34d399] shrink-0" />
            <span>0.50 ETB flat rate per verified transaction</span>
          </div>
        </div>
      </div>
    </div>
  );
}
