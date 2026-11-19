"use client";

import { useState } from "react";
import { planForMonthlyVolume, PRICING_PLANS } from "./pricing-plans";

export default function PricingCalculator() {
  const [monthlyVolume, setMonthlyVolume] = useState<number>(2000);
  const suggested = planForMonthlyVolume(monthlyVolume);

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#070b10] border border-slate-200 dark:border-white/[0.08] space-y-6 shadow-sm dark:shadow-none">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/[0.07]">
        <span className="font-mono text-xs uppercase tracking-wider font-semibold text-slate-900 dark:text-white">
          Monthly volume estimator
        </span>
        <span className="font-mono text-xs text-[#059669] dark:text-[#34d399] tabular-nums">
          {PRICING_PLANS.length} plans
        </span>
      </div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-mono text-slate-500 dark:text-[#94a3b8]">
            Expected new receipts / month
          </span>
          <span className="text-xl font-bold font-mono text-slate-950 dark:text-white tabular-nums">
            {monthlyVolume.toLocaleString()}
          </span>
        </div>

        <input
          type="range"
          min={200}
          max={200000}
          step={200}
          value={monthlyVolume}
          onChange={(e) => setMonthlyVolume(Number(e.target.value))}
          aria-label="Expected monthly receipts"
          className="w-full h-2 bg-slate-200 dark:bg-[#16202c] rounded-lg appearance-none cursor-pointer accent-[#059669] dark:accent-[#10b981]"
        />

        <div className="flex justify-between text-[11px] font-mono text-slate-400 dark:text-[#64748b] mt-2 tabular-nums">
          <span>200</span>
          <span>75,000</span>
          <span>200,000 / mo</span>
        </div>
      </div>

      <div className="p-5 rounded-xl bg-slate-50 dark:bg-[#0c1219] border border-slate-200 dark:border-white/[0.07] space-y-3">
        <div className="flex justify-between items-baseline gap-4 flex-wrap">
          <span className="text-xs font-mono text-slate-600 dark:text-[#94a3b8]">Suggested plan</span>
          <span className="text-2xl font-bold text-slate-950 dark:text-white">
            {suggested.name}{" "}
            <span className="text-base font-mono font-normal text-[#059669] dark:text-[#34d399]">
              {suggested.priceSuffix ? `${suggested.price} ${suggested.priceSuffix}` : suggested.price}
            </span>
          </span>
        </div>
        <div className="pt-3 border-t border-slate-200 dark:border-white/[0.06] text-xs text-slate-600 dark:text-[#94a3b8] leading-relaxed">
          Shop covers up to 2,000 receipts per day. Developer and Scale limits are monthly; optional overage applies on
          Developer and Scale when you opt in.
        </div>
      </div>
    </div>
  );
}