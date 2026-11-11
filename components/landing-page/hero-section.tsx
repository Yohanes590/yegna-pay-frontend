"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import HeroHud from "@/components/landing-page/hero-hud";

export default function HeroSectionRender() {
    const [liveCount, setLiveCount] = useState(1482);
    const [activeVerification, setActiveVerification] = useState({
        bank: "Commercial Bank of Ethiopia",
        code: "CBE",
        txId: "FT26133F833J",
        amount: "4,000.00 ETB",
        sender: "ALEMU TEFERA GENERAL TRADING",
        status: "CONFIRMED_MATCH",
        latency: "172ms",
    });

    const liveVerifications = [
        {
            bank: "Commercial Bank of Ethiopia",
            code: "CBE",
            txId: "FT26133F833J",
            amount: "4,000.00 ETB",
            sender: "ALEMU TEFERA GENERAL TRADING",
            status: "CONFIRMED_MATCH",
            latency: "172ms",
        },
        {
            bank: "Awash Bank",
            code: "AWASH",
            txId: "-2KCLVVWOY3-4R75E0",
            amount: "12,850.00 ETB",
            sender: "MULUGETA KASSAW CLEANING",
            status: "CONFIRMED_MATCH",
            latency: "185ms",
        },
        {
            bank: "Bank of Abyssinia",
            code: "BOA",
            txId: "BOA7719284109",
            amount: "750.00 ETB",
            sender: "RAHEL GIRMA KEBEDE",
            status: "CONFIRMED_MATCH",
            latency: "164ms",
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveVerification((prev) => {
                const idx = (liveVerifications.findIndex(v => v.txId === prev.txId) + 1) % liveVerifications.length;
                return liveVerifications[idx];
            });
            setLiveCount((c) => c + 1);
        }, 4200);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full pt-32 pb-24 lg:pt-40 lg:pb-32 bg-[#060a0f] text-[#f1f5f9] overflow-hidden border-b border-white/[0.06]">
            <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-gradient-to-br from-[#064e3b]/25 to-transparent blur-[140px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-gradient-to-tr from-[#022c22]/30 to-transparent blur-[160px]" />
                <div className="absolute inset-0 bg-grid-architectural opacity-40" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-16">
                    <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-8">
                        <div className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#34d399] mb-8 bg-[#064e3b]/25 border border-[#10b981]/30 px-3.5 py-1.5 rounded">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                            <span>Infrastructure Spec // Ethiopian Banking Rails</span>
                        </div>

                        <h1 className="font-sans font-black text-4xl sm:text-6xl xl:text-7xl tracking-[-0.035em] text-white leading-[1.04] mb-8">
                            Payments verified.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#6ee7b7]">
                                Business moving.
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-[#94a3b8] leading-relaxed max-w-2xl font-normal mb-10">
                            Automate Ethiopian bank payment verification with one simple API. Less manual checking, more time building your business.
                        </p>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-14">
                            <Link
                                href="/sign-up"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[#059669] hover:bg-[#10b981] text-white font-sans font-bold text-sm uppercase tracking-wider transition-all shadow-[0_10px_30px_-10px_rgba(5,150,105,0.6)] active:scale-[0.98] border border-[#34d399]/40"
                            >
                                <span>Start Building</span>
                                <ArrowUpRight size={16} />
                            </Link>

                            <Link
                                href="/documentation"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[#0a1118] hover:bg-[#0f1922] text-[#cbd5e1] hover:text-white font-sans font-bold text-sm uppercase tracking-wider transition-all border border-white/10 hover:border-[#10b981]/40"
                            >
                                <BookOpen size={16} className="text-[#34d399]" />
                                <span>Explore Documentation</span>
                            </Link>
                        </div>

                        <div className="w-full pt-8 border-t border-white/[0.08] grid grid-cols-3 gap-6 font-mono text-left">
                            <div>
                                <span className="block text-[10px] uppercase tracking-widest text-[#64748b]">Clearing Latency</span>
                                <span className="text-lg sm:text-xl font-bold text-white mt-1 block">~180ms</span>
                                <span className="text-[11px] text-[#34d399]">Direct ledger match</span>
                            </div>
                            <div>
                                <span className="block text-[10px] uppercase tracking-widest text-[#64748b]">Developer Fee</span>
                                <span className="text-lg sm:text-xl font-bold text-white mt-1 block">0.5 ETB</span>
                                <span className="text-[11px] text-[#94a3b8]">Per verified transaction</span>
                            </div>
                            <div>
                                <span className="block text-[10px] uppercase tracking-widest text-[#64748b]">False Positives</span>
                                <span className="text-lg sm:text-xl font-bold text-white mt-1 block">0.00%</span>
                                <span className="text-[11px] text-[#34d399]">Cryptographic check</span>
                            </div>
                        </div>
                    </div>

                    <HeroHud activeVerification={activeVerification} liveCount={liveCount} />
                </div>
            </div>
        </section>
    );
}
