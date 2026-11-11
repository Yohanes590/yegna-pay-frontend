"use client";

import { useState } from "react";

export default function PricingCalculator() {
    const [monthlyVolume, setMonthlyVolume] = useState<number>(2000);
    const estimatedCost = (monthlyVolume * 0.5).toFixed(0);

    return (
        <div className="lg:col-span-6 p-8 rounded-2xl bg-[#060a0f] border border-white/[0.08] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <span className="font-mono text-xs uppercase tracking-wider font-bold text-white">
                    Monthly Volume Calculator
                </span>
                <span className="font-mono text-xs text-[#34d399]">0.50 ETB rate locked</span>
            </div>

            <div>
                <div className="flex justify-between items-center mb-3 font-mono">
                    <span className="text-xs text-[#64748b]">Expected Monthly Transactions:</span>
                    <span className="text-xl font-bold text-white">{monthlyVolume.toLocaleString()}</span>
                </div>

                <input
                    type="range"
                    min={200}
                    max={20000}
                    step={200}
                    value={monthlyVolume}
                    onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                    className="w-full h-2 bg-[#1a2736] rounded-lg appearance-none cursor-pointer accent-[#10b981]"
                />

                <div className="flex justify-between text-[10px] font-mono text-[#64748b] mt-2">
                    <span>200 tx / mo</span>
                    <span>10,000 tx / mo</span>
                    <span>20,000 tx / mo</span>
                </div>
            </div>

            <div className="p-5 rounded-xl bg-[#0a1118] border border-white/[0.06] space-y-3 font-mono">
                <div className="flex justify-between items-baseline">
                    <span className="text-xs text-[#94a3b8]">Estimated Monthly API Fee:</span>
                    <span className="text-2xl font-black text-[#34d399]">
                        {Number(estimatedCost).toLocaleString()} ETB
                    </span>
                </div>
                <div className="pt-3 border-t border-white/[0.06] text-xs text-[#64748b] leading-relaxed">
                    Versus hiring 1 manual reconciliation staff in Addis Ababa (15,000+ ETB/month + fraud exposure from forged receipt screenshots).
                </div>
            </div>

            <div className="text-[11px] font-mono text-[#64748b] text-center">
                Transparent top-up balance system. Never get billed unexpected charges.
            </div>
        </div>
    );
}

