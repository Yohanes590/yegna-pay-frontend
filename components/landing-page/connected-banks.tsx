"use client"
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Network, Database, Lock, Activity, RefreshCw } from 'lucide-react';

export default function BankVerification() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const translateY = useTransform(scrollYProgress, [0, 1], [60, -60]);

    const steps = [
        { title: "Query Incoming Tx", icon: RefreshCw, delay: 0.1, status: "live" },
        { title: "Verify Cipher Token", icon: Lock, delay: 0.3, status: "processing" },
        { title: "Cross-Match Ledger", icon: Database, delay: 0.5, status: "waiting" },
        { title: "Global Settlement", icon: Network, delay: 0.7, status: "waiting" }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section id="pipeline" ref={sectionRef} className="relative w-full bg-[#020617] py-32 px-6 overflow-hidden border-t border-[#1E293B]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#10B981]/5 via-[#020617] to-[#020617] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                <motion.div 
                    style={{ y: translateY }}
                    className="relative order-2 lg:order-1 h-[560px] rounded-[2rem] bg-[#0F172A] border border-[#1E293B] p-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]"
                >
                    <div className="absolute top-4 left-4 flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#334155]" />
                        <div className="w-3 h-3 rounded-full bg-[#334155]" />
                        <div className="w-3 h-3 rounded-full bg-[#334155]" />
                    </div>

                    <div className="mt-8 flex justify-between items-center text-[11px] font-bold text-[#64748B] uppercase tracking-widest border-b border-[#1E293B] pb-3">
                        <span>Verification Engine Runtime</span>
                        <span className="flex items-center gap-2 px-2 py-1 bg-[#10B981]/10 text-[#34D399] rounded-md border border-[#10B981]/20"><Activity size={14} /> Systems Linked</span>
                    </div>

                    <div className="h-full flex flex-col justify-center gap-6 mt-[-30px]">
                        {steps.map((step, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: step.delay, duration: 0.5 }}
                                className="relative z-10 flex items-center gap-5 group"
                            >
                                <div className={`relative flex items-center justify-center w-14 h-14 rounded-2xl border bg-[#020617] shadow-lg group-hover:scale-105 transition-all ${
                                    step.status === 'live' ? 'border-[#10B981] text-[#34D399] shadow-[0_0_15px_rgba(16,185,129,0.3)]' :
                                    step.status === 'processing' ? 'border-[#38bdf8] text-[#7dd3fc]' :
                                    'border-[#1E293B] text-[#64748B]'
                                }`}>
                                    <step.icon size={22} className={step.status === 'live' ? 'animate-[spin_4s_linear_infinite]' : ''} />
                                    {step.status === 'live' && (
                                        <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#10B981] border-2 border-[#020617]"></span>
                                        </span>
                                    )}
                                </div>

                                <div className={`flex-1 bg-[#020617] border shadow-sm rounded-2xl p-4.5 flex justify-between items-center transition-colors ${
                                    step.status === 'live' ? 'border-[#10B981]/50' : 'border-[#1E293B]'
                                }`}>
                                    <span className="font-bold text-sm text-[#F8FAFC]">{step.title}</span>
                                    {step.status === 'live' && <span className="text-[10px] font-bold uppercase tracking-wider bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/30 px-2.5 py-1 rounded-full">Executing</span>}
                                    {step.status === 'processing' && <span className="text-[10px] font-bold uppercase tracking-wider bg-[#1E293B] text-[#94A3B8] px-2.5 py-1 rounded-full">Pending</span>}
                                </div>
                            </motion.div>
                        ))}

                        <div className="absolute left-[3.5rem] top-[140px] bottom-[140px] w-0.5 bg-gradient-to-b from-[#10B981] via-[#38bdf8] to-[#1E293B] -z-10" />
                    </div>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="order-1 lg:order-2 space-y-10"
                >
                    <motion.div variants={itemVariants} className="space-y-6">
                        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/20 text-[#34D399] mb-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                            <Network size={24} />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#F8FAFC] leading-tight">
                            Direct connection to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#94A3B8] to-[#475569]">core banking ledgers.</span>
                        </h2>
                        <p className="text-[#94A3B8] font-medium text-lg max-w-xl leading-relaxed">
                            Our proprietary cross-matching nodes verify transactions seamlessly without human intervention. We interface securely with financial infrastructure to validate receipts autonomously.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { name: 'Commercial Bank of Ethiopia', logo: '/banks/CBE.png' },
                            { name: 'Awash Bank', logo: '/banks/awash.png' },
                            { name: 'Bank of Abyssinia', logo: '/banks/abs.png' }
                        ].map((bank, i) => (
                            <div 
                                key={i}
                                className="group p-4 rounded-xl bg-[#0F172A] border border-[#1E293B] shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-[#10B981]/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] flex items-center gap-4 transition-all"
                            >
                                <div className="h-10 w-14 p-1.5 rounded-lg bg-[#020617] border border-[#1E293B] flex items-center justify-center">
                                    <img src={bank.logo} alt={bank.name} className="max-h-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs font-bold text-[#F8FAFC]">{bank.name}</h4>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                        <span className="text-[9px] text-[#34D399] uppercase tracking-widest font-bold">Node Synced</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}