"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ChevronRightIcon, Copy, CheckCircle2, SearchCode, Lock, Building2 } from "lucide-react"

export default function HeroSectionRender() {
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<'node' | 'python' | 'curl'>('node');

    const copyCode = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    const codeSnippets = {
        node: `import { YegnaPay } from '@yegnapay/node';

const client = new YegnaPay('sk_live_...');

const payment = await client.payments.create({
  amount: 5000,
  currency: 'ETB',
  customer_email: 'customer@example.com',
  customer_name: 'Abebe Kebede',
  callback_url: 'https://yourapp.com/payment/success',
  metadata: {
    order_id: 'ORD-2026-001'
  }
});

console.log(payment.checkout_url);`,

        python: `import yegnapay

client = yegnapay.Client('sk_live_...')

payment = client.payments.create(
    amount=5000,
    currency='ETB',
    customer_email='customer@example.com',
    customer_name='Abebe Kebede',
    callback_url='https://yourapp.com/payment/success',
    metadata={
        'order_id': 'ORD-2026-001'
    }
)

print(payment.checkout_url)`,

        curl: `curl -X POST https://api.yegnapay.com/v1/payments \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 5000,
    "currency": "ETB",
    "customer_email": "customer@example.com",
    "customer_name": "Abebe Kebede",
    "callback_url": "https://yourapp.com/payment/success",
    "metadata": {
      "order_id": "ORD-2026-001"
    }
  }'`
    }
    const bankLogos = [
        { name: 'Commercial Bank of Ethiopia', src: '/banks/CBE.png' },
        { name: 'Awash Bank', src: '/banks/awash.png' },
        { name: 'Bank of Abyssinia', src: '/banks/abs.png' },
    ];
    const marqueeItems = [...bankLogos, ...bankLogos, ...bankLogos, ...bankLogos];
    return (
        <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-[#020617] pt-28 pb-10">
            {/* Dark SaaS Abstract Gradients Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[10%] w-[45%] h-[45%] rounded-full bg-[#10B981]/10 blur-[130px] mix-blend-screen" />
                <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-[#34D399]/5 blur-[120px] mix-blend-screen" />

                {/* Dark Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B_1px,transparent_1px),linear-gradient(to_bottom,#1E293B_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-30" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-8 mb-20 mt-10">

                {/* Left Content Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 flex flex-col items-start"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-[#34D399] bg-[#020617] border border-[#10B981]/30 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.15)] mb-8"
                    >
                        <ShieldCheck size={14} className="text-[#10B981]" />
                        <span>The Fintech Engine for Developers</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#F8FAFC] leading-[1.05] mb-6">
                        Automate your payment <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#34D399]">verification.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-[#94A3B8] leading-relaxed max-w-xl font-medium mb-10">
                        Stop manually checking receipts. Connect directly to banking ledgers to securely verify transfers and prevent fraud in milliseconds.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <button onClick={() => window.location.href = "/dashboard"} className="group relative flex items-center justify-center gap-2 px-8 py-4 bg-[#10B981] text-[#020617] font-extrabold rounded-xl overflow-hidden transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:bg-[#34D399] active:translate-y-0 active:scale-95">
                            Launch Dashboard <ChevronRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button onClick={() => window.location.href = "/documentation"} className="group flex items-center justify-center gap-2 px-8 py-4 bg-[#0F172A] border border-[#1E293B] text-[#F8FAFC] font-bold rounded-xl hover:bg-[#1E293B] hover:border-[#10B981]/50 transition-all active:scale-95">
                            <SearchCode size={18} className="text-[#94A3B8] group-hover:text-[#10B981] transition-colors" /> Read the Docs
                        </button>
                    </div>

                    <div className="mt-10 flex items-center gap-6 text-sm font-medium text-[#94A3B8]">
                        <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-[#10B981]" /> No credit card required</div>
                        <div className="flex items-center gap-1.5"><Lock size={16} className="text-[#10B981]" /> Bank-grade security</div>
                    </div>
                </motion.div>

                {/* Right Abstract Cards Area */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 w-full relative h-[500px] hidden md:block perspective-[1000px]"
                >
                    {/* Primary Code Window */}
                    <div className="absolute top-10 right-4 w-[480px] rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden z-20 group transform-gpu transition-transform duration-500 hover:rotate-y-[2deg] hover:scale-[1.01]">
                        <div className="flex items-center justify-between px-4 py-3 bg-[#020617] border-b border-[#1E293B]">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                                <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                            </div>
                            <div className="flex gap-2">
                                {(Object.keys(codeSnippets) as Array<keyof typeof codeSnippets>).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded transition-colors ${activeTab === tab ? 'bg-[#1E293B] text-[#F8FAFC]' : 'text-[#64748B] hover:text-[#94A3B8]'}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 relative bg-[#0F172A] min-h-[260px]">
                            <button
                                onClick={copyCode}
                                className="absolute top-4 right-4 p-2 rounded-lg bg-[#020617] border border-[#1E293B] hover:border-[#10B981]/50 text-[#94A3B8] hover:text-[#10B981] transition-all shadow-sm"
                            >
                                {copied ? <CheckCircle2 size={16} className="text-[#10B981]" /> : <Copy size={16} />}
                            </button>
                            <pre className="font-mono text-[13px] leading-relaxed text-[#F8FAFC] overflow-x-auto">
                                <AnimatePresence mode="wait">
                                    <motion.code
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        transition={{ duration: 0.2 }}
                                        className="block whitespace-pre"
                                    >
                                        {codeSnippets[activeTab]}
                                    </motion.code>
                                </AnimatePresence>
                            </pre>
                        </div>
                    </div>

                    {/* Floating Success Card Overlay */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6, ease: "backOut" }}
                        className="absolute bottom-12 left-0 bg-[#020617] border border-[#1E293B] p-4 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] z-30 flex items-center gap-4 w-[280px]"
                    >
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#10B981]/10 border border-[#10B981]/30">
                            <ShieldCheck size={24} className="text-[#34D399]" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-[#F8FAFC] leading-tight">Fraud Detected: 0%</p>
                            <p className="text-[11px] font-semibold text-[#10B981] mt-1 uppercase tracking-widest">Transaction Secured</p>
                        </div>
                    </motion.div>

                    {/* Floating Bank Check Overlay */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.8, ease: "backOut" }}
                        className="absolute top-20 left-16 bg-[#020617] border border-[#1E293B] p-3 rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.6)] z-10 flex items-center gap-3"
                    >
                        <Building2 size={16} className="text-[#94A3B8]" />
                        <span className="text-xs font-bold text-[#F8FAFC]">Cross-Referenced Match</span>
                    </motion.div>
                </motion.div>
            </div>

            {/* Premium Marquee Bank Logo Section */}
            <div className="w-full relative z-10 mt-12 bg-[#020617] border-y border-[#1E293B] py-12 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 mb-8 relative z-20">
                    <p className="text-center text-sm font-bold text-[#94A3B8] uppercase tracking-widest drop-shadow-md">
                        Built for Ethiopia's Banking Ecosystem
                    </p>
                </div>

                <section className="py-14 border-y border-[#10B981]/10 bg-[#020617] relative z-10 overflow-hidden group">
                    {/* Premium Emerald/Green Ambient Radial Background Glow */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.06),transparent_65%)]" />
                    </div>

                    {/* Smooth Fade edges to match the deep dark background */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#020617] via-[#020617]/90 to-transparent z-20 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020617] via-[#020617]/90 to-transparent z-20 pointer-events-none"></div>

                    <div className="flex w-fit animate-marquee group-hover:[animation-play-state:paused]">

                        {/* First Set */}
                        <div className="flex items-center gap-8 px-8">
                            {bankLogos.map((bank, i) => (
                                <div
                                    key={`first-${i}`}
                                    className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-[#0F172A]/40 border border-[#1E293B] backdrop-blur-xl transition-all duration-500 hover:bg-[#0F172A] hover:border-[#10B981]/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:-translate-y-1 group/card"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-[#020617] border border-[#1E293B] group-hover/card:border-[#10B981]/20 flex items-center justify-center transition-colors duration-500">
                                        <img
                                            src={bank.src}
                                            alt={bank.name}
                                            className="h-8 object-contain grayscale opacity-60 group-hover/card:grayscale-0 group-hover/card:opacity-100 transition-all duration-500"
                                        />
                                    </div>

                                    <span className="text-sm font-bold tracking-wide text-[#94A3B8] whitespace-nowrap transition-colors duration-300 group-hover/card:text-[#34D399]">
                                        {bank.name}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Clone */}
                        <div className="flex items-center gap-8 px-8">
                            {bankLogos.map((bank, i) => (
                                <div
                                    key={`second-${i}`}
                                    className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-[#0F172A]/40 border border-[#1E293B] backdrop-blur-xl transition-all duration-500 hover:bg-[#0F172A] hover:border-[#10B981]/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:-translate-y-1 group/card"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-[#020617] border border-[#1E293B] group-hover/card:border-[#10B981]/20 flex items-center justify-center transition-colors duration-500">
                                        <img
                                            src={bank.src}
                                            alt={bank.name}
                                            className="h-8 object-contain grayscale opacity-60 group-hover/card:grayscale-0 group-hover/card:opacity-100 transition-all duration-500"
                                        />
                                    </div>

                                    <span className="text-sm font-bold tracking-wide text-[#94A3B8] whitespace-nowrap transition-colors duration-300 group-hover/card:text-[#34D399]">
                                        {bank.name}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Third Clone */}
                        <div className="flex items-center gap-8 px-8">
                            {bankLogos.map((bank, i) => (
                                <div
                                    key={`third-${i}`}
                                    className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-[#0F172A]/40 border border-[#1E293B] backdrop-blur-xl transition-all duration-500 hover:bg-[#0F172A] hover:border-[#10B981]/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:-translate-y-1 group/card"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-[#020617] border border-[#1E293B] group-hover/card:border-[#10B981]/20 flex items-center justify-center transition-colors duration-500">
                                        <img
                                            src={bank.src}
                                            alt={bank.name}
                                            className="h-8 object-contain grayscale opacity-60 group-hover/card:grayscale-0 group-hover/card:opacity-100 transition-all duration-500"
                                        />
                                    </div>

                                    <span className="text-sm font-bold tracking-wide text-[#94A3B8] whitespace-nowrap transition-colors duration-300 group-hover/card:text-[#34D399]">
                                        {bank.name}
                                    </span>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>
            </div>

        </section>
    )
}