"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import PricingCalculator from "./pricing-calculator";

const capabilities = [
    {
        num: "01",
        title: "Bank Payment Verification",
        description: "Direct algorithmic inquiry against central banking records confirms that money actually reached your business account before orders ship.",
        spec: "Direct Core Query",
    },
    {
        num: "02",
        title: "Transaction Amount Matching",
        description: "Guarantees the transferred sum matches your invoice to the exact decimal. Partial payments and altered digits are instantly flagged.",
        spec: "Exact Decimal Match",
    },
    {
        num: "03",
        title: "Duplicate Transaction Detection",
        description: "Every verified reference ID is cryptographically signed and archived. Replayed SMS screenshots and dual submissions are immediately rejected.",
        spec: "Anti-Replay Ledger",
    },
    {
        num: "04",
        title: "Automated Payment Validation",
        description: "Replace manual slip reading and human delays with a sub-second webhook callback that triggers instantaneous order release.",
        spec: "Sub-200ms Processing",
    },
    {
        num: "05",
        title: "API-Based Integration",
        description: "A single clean RESTful JSON endpoint with Bearer authentication. Connect your web application, Telegram bot, or mobile app in hours.",
        spec: "Standard REST / JSON",
    },
    {
        num: "06",
        title: "Multiple Supported Ethiopian Banks",
        description: "Unified verification across Commercial Bank of Ethiopia (CBE), Awash Bank, Bank of Abyssinia, and Bank of Africa under one integration.",
        spec: "4 Native Rails",
    },
];

export default function FeaturesAndPricing() {
    return (
        <section id="pricing" className="relative py-28 sm:py-36 bg-[#060a0f] text-[#f1f5f9] border-b border-white/[0.06] overflow-hidden">
            <div className="absolute inset-0 bg-grid-architectural opacity-30 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 pb-8 border-b border-white/[0.08]">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[#34d399] mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                            <span>Transparent Infrastructure Economics</span>
                        </div>
                        <h2 className="font-sans font-black text-3xl sm:text-5xl tracking-tight text-white leading-tight">
                            One transparent rate.<br />
                            Six core verification capabilities.
                        </h2>
                    </div>
                    <p className="text-sm sm:text-base text-[#94a3b8] max-w-md leading-relaxed font-normal">
                        No monthly subscriptions, no seat licenses, no hidden minimums. You pay strictly for successful verifications delivered.
                    </p>
                </div>

                <div className="mb-24">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#64748b] block mb-8">
                        Technical Capability Matrix // Standard Platform Features
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {capabilities.map((cap) => (
                            <div
                                key={cap.num}
                                className="p-8 rounded-2xl bg-[#0a1118] border border-white/[0.08] hover:border-[#10b981]/40 transition-all duration-300 flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
                                        <span className="font-mono text-xs font-black text-[#34d399]">// {cap.num}</span>
                                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#64748b] bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.06]">
                                            {cap.spec}
                                        </span>
                                    </div>
                                    <h3 className="font-sans font-bold text-lg text-white mb-3 group-hover:text-[#34d399] transition-colors">
                                        {cap.title}
                                    </h3>
                                    <p className="text-sm text-[#94a3b8] leading-relaxed font-normal">{cap.description}</p>
                                </div>
                                <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-mono text-[#64748b]">
                                    <span>Included in Base Rate</span>
                                    <span className="text-[#34d399]">✓ Enabled</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-3xl border border-white/[0.12] bg-[#0a1118] p-8 sm:p-14 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-6 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#064e3b]/30 border border-[#10b981]/30 text-xs font-mono text-[#34d399]">
                            <span>STANDARD DEVELOPER CLEARING FEE</span>
                        </div>

                        <div>
                            <div className="flex items-baseline gap-3">
                                <span className="font-sans font-black text-6xl sm:text-7xl tracking-tight text-white">0.5</span>
                                <span className="font-sans font-bold text-2xl sm:text-3xl text-[#34d399]">ETB</span>
                                <span className="font-mono text-sm text-[#94a3b8]">/ per verification</span>
                            </div>
                            <p className="text-sm text-[#94a3b8] mt-4 leading-relaxed font-normal">
                                Flat, usage-based rate. Billed solely when a transaction hash is successfully interrogated and verified against the banking ledger.
                            </p>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-white/[0.08] font-mono text-xs">
                            <div className="flex items-center gap-3 text-[#cbd5e1]">
                                <Check size={16} className="text-[#34d399]" />
                                <span>200 free starter verification queries upon registration</span>
                            </div>
                            <div className="flex items-center gap-3 text-[#cbd5e1]">
                                <Check size={16} className="text-[#34d399]" />
                                <span>Zero monthly platform access fees or user seat costs</span>
                            </div>
                            <div className="flex items-center gap-3 text-[#cbd5e1]">
                                <Check size={16} className="text-[#34d399]" />
                                <span>All 4 bank rails included with no surcharge per bank</span>
                            </div>
                        </div>

                        <div className="pt-6">
                            <Link
                                href="/sign-up"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[#059669] hover:bg-[#10b981] text-white font-sans font-bold text-sm uppercase tracking-wider transition-all shadow-[0_10px_30px_-10px_rgba(5,150,105,0.6)] border border-[#34d399]/40"
                            >
                                <span>Create Developer Account</span>
                                <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </div>

                    <PricingCalculator />
                </div>
            </div>
        </section>
    );
}
