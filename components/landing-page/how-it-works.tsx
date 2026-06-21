"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Search, ShieldCheck, Zap } from 'lucide-react';

export default function HowItWorks() {
    const steps = [
        {
            number: "01",
            title: "Submit Verification API Call",
            description: "Pass a reference ID securely via API. We process the payload automatically.",
            icon: Upload,
            colorClass: "text-[#F8FAFC]",
            bgClass: "bg-[#1E293B] border-[#334155]",
            glow: "group-hover:text-white group-hover:border-[#F8FAFC]"
        },
        {
            number: "02",
            title: "Algorithmic Matching",
            description: "Data connects to our direct banking ledgers to cross-reference transactions.",
            icon: Search,
            colorClass: "text-[#10B981]",
            bgClass: "bg-[#0F172A] border-[#10B981]/30",
            glow: "group-hover:border-[#10B981] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        },
        {
            number: "03",
            title: "Security Authentication",
            description: "We enforce strict duplicate checks and receiver authenticity limits safely.",
            icon: ShieldCheck,
            colorClass: "text-[#34D399]",
            bgClass: "bg-[#020617] border-[#34D399]/30",
            glow: "group-hover:border-[#34D399] group-hover:shadow-[0_0_20px_rgba(52,211,153,0.3)]"
        },
        {
            number: "04",
            title: "Webhook Completion",
            description: "A cryptographic webhook payload hits your server securely notifying success.",
            icon: Zap,
            colorClass: "text-[#F8FAFC]",
            bgClass: "bg-[#10B981] border-[#10B981]",
            glow: "group-hover:scale-110 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
        }
    ];

    return (
        <section className="relative w-full bg-[#020617] py-32 px-6 overflow-hidden border-t border-[#1E293B]">
            <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="text-[#34D399] font-bold tracking-[0.2em] uppercase text-[11px] mb-4 bg-[#10B981]/10 border border-[#10B981]/20 px-3 py-1.5 rounded-full inline-block shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                        API Pipeline Architecture
                    </h2>
                    <h1 className="text-4xl md:text-5xl font-black text-[#F8FAFC] mb-6 tracking-tight">
                        How it works
                    </h1>
                    <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto font-medium">
                        A seamless, robust asynchronous pipeline designed for developer ease.
                    </p>
                </motion.div>

                {/* Vertical Timeline for better SaaS rendering */}
                <div className="relative w-full max-w-4xl mx-auto">
                    {/* Connecting dashed line */}
                    <div className="absolute left-[24px] md:left-1/2 top-4 bottom-4 w-px bg-[#1E293B] border-dashed border-l border-[#334155] md:-translate-x-1/2" />
                    
                    <div className="space-y-12">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full group"
                                >
                                    {/* Desktop Left Side */}
                                    <div className={`hidden md:block w-5/12 ${isEven ? 'text-right pr-12' : 'order-last text-left pl-12'}`}>
                                        <div className={`inline-block text-[10px] font-bold tracking-widest px-3 py-1 rounded-full mb-3 border border-[#1E293B] bg-[#0F172A] text-[#94A3B8]`}>
                                            PHASE {step.number}
                                        </div>
                                        <h3 className="text-xl font-bold text-[#F8FAFC] mb-3">{step.title}</h3>
                                        <p className="text-[#94A3B8] text-sm leading-relaxed font-medium">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Center Node */}
                                    <div className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-xl border-2 flex items-center justify-center flex-shrink-0 z-10 transition-all duration-300 ${step.bgClass} ${step.glow}`}>
                                        <Icon size={20} className={step.colorClass} />
                                    </div>

                                    {/* Mobile & Desktop Right Side (Desktop Left handled above) */}
                                    <div className={`ml-16 md:ml-0 md:w-5/12 ${isEven ? 'md:hidden' : 'md:hidden'} text-left`}>
                                        <div className="inline-block text-[10px] font-bold tracking-widest px-3 py-1 rounded-full mb-3 border border-[#1E293B] bg-[#0F172A] text-[#94A3B8]">
                                            PHASE {step.number}
                                        </div>
                                        <h3 className="text-xl font-bold text-[#F8FAFC] mb-3">{step.title}</h3>
                                        <p className="text-[#94A3B8] text-sm leading-relaxed font-medium">
                                            {step.description}
                                        </p>
                                    </div>
                                    
                                    {/* Placeholder for desktop odd flex alignment */}
                                    <div className={`hidden md:block w-5/12 ${isEven ? 'order-last text-left pl-12' : 'text-right pr-12 opacity-0'}`} />
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}