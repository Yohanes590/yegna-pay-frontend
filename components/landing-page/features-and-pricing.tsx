"use client";

import Link from "next/link";
import { ArrowRight, CheckCheck } from "lucide-react";
import PricingCalculator from "./pricing-calculator";
import { PRICING_PLANS } from "./pricing-plans";

export default function FeaturesAndPricing() {
  return (
    <section
      id="pricing"
      className="relative py-20 lg:py-28 bg-white dark:bg-[#090e15] border-t border-slate-200 dark:border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#059669] dark:text-[#34d399]">
            Plans &amp; limits
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white">
            Simple monthly plans that scale with your counter or API.
          </h2>
          <p className="text-slate-600 dark:text-[#94a3b8] text-base leading-relaxed">
            Start free, then upgrade when volume grows. Every plan includes all 17 banks and wallets, app access, and verification from URL or reference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl p-6 sm:p-7 border transition-shadow ${
                plan.highlight
                  ? "border-[#059669] dark:border-[#10b981] bg-slate-50/80 dark:bg-[#0c1219] shadow-lg shadow-emerald-500/10 dark:shadow-emerald-500/5 ring-1 ring-[#059669]/20 dark:ring-[#10b981]/30"
                  : "border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-[#0c1219]"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#059669] dark:bg-[#10b981] text-white dark:text-[#020617] text-[10px] font-bold uppercase tracking-wider">
                  {plan.badge}
                </span>
              )}

              <div className="mb-6 pt-1">
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">{plan.name}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-[#94a3b8] leading-relaxed min-h-[2.5rem]">
                  {plan.tagline}
                </p>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-bold tabular-nums text-slate-950 dark:text-white">
                    {plan.price}
                  </span>
                  {plan.priceSuffix && (
                    <span className="text-sm font-mono text-slate-500 dark:text-[#94a3b8]">{plan.priceSuffix}</span>
                  )}
                </div>
              </div>

              <ul className="flex-grow space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-[#cbd5e1]">
                    <CheckCheck size={15} className="text-[#059669] dark:text-[#34d399] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/sign-up"
                className={`inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg text-sm font-semibold transition-colors ${
                  plan.highlight
                    ? "bg-[#059669] hover:bg-[#047857] dark:hover:bg-[#10b981] text-white"
                    : "bg-white hover:bg-slate-100 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-300 dark:border-white/[0.08] text-slate-800 dark:text-[#e2e8f0]"
                }`}
              >
                <span>{plan.id === "free" ? "Start free" : "Get started"}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        <PricingCalculator />

        <p className="mt-8 text-center text-sm text-slate-500 dark:text-[#64748b]">
          Need something beyond Scale?{" "}
          <Link href="/#contact" className="text-[#059669] dark:text-[#34d399] font-medium hover:underline">
            Contact us
          </Link>{" "}
          for custom volume and SLA.
        </p>
      </div>
    </section>
  );
}