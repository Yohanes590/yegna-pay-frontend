"use client";
import { CheckCheck } from "lucide-react"
import { motion } from "framer-motion"
import { PRICING_PLANS } from "./pricing-plans"

export default function PricingRender() {
    return (
        <section id="pricing" className="min-h-screen bg-[#020617] py-32 px-6 font-sans text-[#F8FAFC] border-t border-[#1E293B] overflow-hidden">
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-[#34D399] font-bold tracking-[0.2em] uppercase text-[11px] mb-4 bg-[#10B981]/10 border border-[#10B981]/20 px-3 py-1.5 rounded-full inline-block shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                        Plans &amp; limits
                    </h2>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-[#F8FAFC]">
                        Monthly plans for counters and APIs
                    </h1>
                    <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto font-medium">
                        Start free with 200 receipts per month. Upgrade when your shop or integration needs more volume.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 justify-center items-stretch max-w-7xl mx-auto">
                    {PRICING_PLANS.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative flex flex-col w-full bg-[#0F172A] rounded-[2rem] p-8 transition-transform duration-300 ${
                                plan.highlight
                                ? "border-2 border-[#10B981] shadow-[0_20px_50px_-15px_rgba(16,185,129,0.3)] lg:-translate-y-4"
                                : "border border-[#1E293B] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] hover:border-[#334155]"
                            }`}
                        >
                            {plan.badge && (
                                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#10B981] text-[#020617] text-[10px] font-black uppercase tracking-widest py-1.5 px-4 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                                    {plan.badge}
                                </span>
                            )}

                            <div className="mb-8 text-left">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-[#64748B] mb-2">
                                    {plan.name}
                                </h2>
                                <div className="flex items-baseline gap-1 mt-4">
                                    <span className="text-4xl md:text-5xl font-black text-[#F8FAFC]">{plan.price}</span>
                                    {plan.priceSuffix && <span className="text-[#94A3B8] text-sm font-medium">{plan.priceSuffix}</span>}
                                </div>
                                <p className="mt-4 text-[#94A3B8] text-sm leading-relaxed min-h-[40px] font-medium">
                                    {plan.tagline}
                                </p>
                            </div>

                            <div className="flex-grow">
                                <div className="h-px w-full bg-[#1E293B] mb-6" />
                                <ul className="space-y-4 text-left">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3 text-sm text-[#F8FAFC] font-medium">
                                            <div className="mt-0.5 bg-[#10B981]/10 rounded-full p-0.5 border border-[#10B981]/20 shrink-0">
                                                <CheckCheck size={14} className="text-[#34D399]" />
                                            </div>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-10">
                                <button
                                    onClick={() => (window.location.href = "/sign-up")}
                                    className={`w-full py-4 px-6 rounded-xl font-bold transition-all active:scale-[0.98] ${
                                        plan.highlight
                                        ? "bg-[#10B981] text-[#020617] hover:bg-[#34D399] shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                        : "bg-[#020617] text-[#F8FAFC] hover:bg-[#1E293B] border border-[#1E293B] shadow-sm"
                                    }`}>
                                    {plan.id === "free" ? "Start Free" : "Get Started"}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}