"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import PricingCalculator from "./pricing-calculator";
import { usePublicConfig } from "@/lib/hooks/use-public-config";

const INCLUDED_CAPABILITIES = [
  "All 3 supported banks (CBE, Awash Bank, Bank of Abyssinia)",
  "Dual verification: Transaction Link (JSON) & Receipt QR Image (multipart)",
  "Real-time webhook delivery & per-project API keys",
  "Duplicate transaction protection with 409 YP_03DeFg error codes",
  "QR-safe receipt archiving and searchable audit history",
  "Pay-as-you-go balance with no monthly minimums or setup fees",
];

export default function FeaturesAndPricing() {
  const { requestCurrency, currency } = usePublicConfig();
  const priceDisplay = requestCurrency.toFixed(2);

  return (
    <section
      id="pricing"
      className="relative py-20 lg:py-28 bg-white dark:bg-[#090e15] border-t border-slate-200 dark:border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#059669] dark:text-[#34d399]">
            Transparent Pricing
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white">
            {priceDisplay} {currency} per verified transaction.
          </h2>
          <p className="text-slate-600 dark:text-[#94a3b8] text-base leading-relaxed">
            No monthly subscription, no per-bank surcharge, and no percentage cut on your revenue. Fund your project balance and pay only for completed verifications.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-[#0c1219] p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-md bg-emerald-50 dark:bg-[#064e3b]/40 border border-emerald-200 dark:border-[#10b981]/30 font-mono text-[11px] uppercase tracking-wider text-[#047857] dark:text-[#34d399]">
              Pay-As-You-Go Clearing Rate
            </div>

            <div className="flex items-baseline gap-2.5">
              <span className="font-sans text-5xl sm:text-6xl font-bold tracking-tight text-slate-950 dark:text-white tabular-nums">
                {priceDisplay}
              </span>
              <span className="font-mono text-lg text-slate-500 dark:text-[#94a3b8]">{currency} / verification</span>
            </div>

            <ul className="space-y-3 pt-2">
              {INCLUDED_CAPABILITIES.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-700 dark:text-[#cbd5e1]">
                  <Check size={16} className="text-[#059669] dark:text-[#34d399] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#059669] hover:bg-[#047857] dark:hover:bg-[#10b981] text-white text-sm font-semibold transition-colors"
              >
                <span>Create Merchant Account</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/documentation"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white hover:bg-slate-100 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-slate-300 dark:border-white/[0.08] text-sm font-medium text-slate-800 dark:text-[#e2e8f0] transition-colors"
              >
                <span>Read API Docs</span>
              </Link>
            </div>
          </div>

          <PricingCalculator />
        </div>
      </div>
    </section>
  );
}
