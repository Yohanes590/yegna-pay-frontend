"use client";

import { useState } from "react";
import { usePublicConfig } from "@/lib/hooks/use-public-config";

export default function PricingCalculator() {
  const { requestCurrency, currency } = usePublicConfig();
  const [monthlyVolume, setMonthlyVolume] = useState<number>(2000);
  const estimatedCost = (monthlyVolume * requestCurrency).toFixed(0);

  return (
    <div className="lg:col-span-6 p-6 sm:p-8 rounded-xl bg-white dark:bg-[#070b10] border border-slate-200 dark:border-white/[0.08] space-y-6 shadow-sm dark:shadow-none">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/[0.07]">
        <span className="font-mono text-xs uppercase tracking-wider font-semibold text-slate-900 dark:text-white">
          Monthly Volume Estimator
        </span>
        <span className="font-mono text-xs text-[#059669] dark:text-[#34d399] tabular-nums">
          {requestCurrency.toFixed(2)} {currency} / query
        </span>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-mono text-slate-500 dark:text-[#94a3b8]">
            Expected monthly verifications
          </span>
          <span className="text-xl font-bold font-mono text-slate-950 dark:text-white tabular-nums">
            {monthlyVolume.toLocaleString()}
          </span>
        </div>

        <input
          type="range"
          min={200}
          max={20000}
          step={200}
          value={monthlyVolume}
          onChange={(e) => setMonthlyVolume(Number(e.target.value))}
          aria-label="Expected monthly verifications"
          className="w-full h-2 bg-slate-200 dark:bg-[#16202c] rounded-lg appearance-none cursor-pointer accent-[#059669] dark:accent-[#10b981]"
        />

        <div className="flex justify-between text-[11px] font-mono text-slate-400 dark:text-[#64748b] mt-2 tabular-nums">
          <span>200</span>
          <span>10,000</span>
          <span>20,000 / mo</span>
        </div>
      </div>

      <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#0c1219] border border-slate-200 dark:border-white/[0.07] space-y-3">
        <div className="flex justify-between items-baseline gap-4">
          <span className="text-xs font-mono text-slate-600 dark:text-[#94a3b8]">
            Estimated monthly clearing fee
          </span>
          <span className="text-2xl font-bold font-mono text-[#059669] dark:text-[#34d399] tabular-nums">
            {Number(estimatedCost).toLocaleString()} {currency}
          </span>
        </div>
        <div className="pt-3 border-t border-slate-200 dark:border-white/[0.06] text-xs text-slate-600 dark:text-[#94a3b8] leading-relaxed">
          Prepaid project balance — top up when needed with zero recurring subscription fees.
        </div>
      </div>
    </div>
  );
}
