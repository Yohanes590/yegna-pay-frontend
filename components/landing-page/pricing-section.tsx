"use client"
import { CheckCheck } from "lucide-react"
import { motion } from "framer-motion"

export default function PricingRender() {
    const PricingData = [
        {
            title: "Starter",
            price: "Free",
            name: "Free Tier",
            description: "Perfect for testing and small integrations.",
            features: [
                "200 free API requests",
                "Basic transaction verification",
                "Duplicate check protection",
                "Email support",
                "Standard API access"
            ],
            buttonBgStatus: false,
            buttonLable: "Start Free"
        },
        {
            title: "Pay As You Go",
            price: "0.5 ETB",
            suffix: "/ request",
            name: "Usage Based",
            description: "Pay only for what you use. No monthly commitment.",
            features: [
                "All Starter features",
                "Pay per API request (0.5 ETB)",
                "Multi-layer fraud detection",
                "Webhook support",
                "Real-time transaction verification",
                "Scales with your usage"
            ],
            buttonBgStatus: true,
            buttonLable: "Start Paying"
        },
        {
            title: "Enterprise",
            price: "Custom",
            name: "Enterprise",
            description: "For platforms, fintechs, and high-volume networks.",
            features: [
                "Everything in Pay As You Go",
                "Custom pricing per volume",
                "Dedicated infrastructure",
                "On-premise / private deployment",
                "Dedicated account manager",
                "24/7 SLA support"
            ],
            buttonBgStatus: false,
            buttonLable: "Contact Sales"
        }
    ];

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
                        API Pricing
                    </h2>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-[#F8FAFC]">
                        Simple, predictable pricing
                    </h1>
                    <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto font-medium">
                        No hidden fees. Pay only for what you use. Start free and scale as your transaction volume grows.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-stretch max-w-6xl mx-auto">
                    {PricingData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative flex flex-col w-full bg-[#0F172A] rounded-[2rem] p-8 transition-transform duration-300 ${
                                item.buttonBgStatus
                                ? "border-2 border-[#10B981] shadow-[0_20px_50px_-15px_rgba(16,185,129,0.3)] lg:-translate-y-4"
                                : "border border-[#1E293B] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] hover:border-[#334155]"
                            }`}
                        >
                            {item.buttonBgStatus && (
                                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#10B981] text-[#020617] text-[10px] font-black uppercase tracking-widest py-1.5 px-4 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                                    Most Popular
                                </span>
                            )}

                            <div className="mb-8 text-left">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-[#64748B] mb-2">
                                    {item.title}
                                </h2>
                                <div className="flex items-baseline gap-1 mt-4">
                                    <span className="text-4xl md:text-5xl font-black text-[#F8FAFC]">{item.price}</span>
                                    {item.suffix && <span className="text-[#94A3B8] text-sm font-medium">{item.suffix}</span>}
                                </div>
                                <p className="mt-4 text-[#94A3B8] text-sm leading-relaxed min-h-[40px] font-medium">
                                    {item.description}
                                </p>
                            </div>

                            <div className="flex-grow">
                                <div className="h-px w-full bg-[#1E293B] mb-6" />
                                <ul className="space-y-4 text-left">
                                    {item.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-start gap-3 text-sm text-[#F8FAFC] font-medium">
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
                                        item.buttonBgStatus
                                        ? "bg-[#10B981] text-[#020617] hover:bg-[#34D399] shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                        : "bg-[#020617] text-[#F8FAFC] hover:bg-[#1E293B] border border-[#1E293B] shadow-sm"
                                    }`}>
                                    {item.buttonLable}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}