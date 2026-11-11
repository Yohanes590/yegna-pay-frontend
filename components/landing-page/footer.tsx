"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Activity, Terminal } from "lucide-react";

export default function LongFooter() {
    const [currentTime, setCurrentTime] = useState("");
    const [currentYear, setCurrentYear] = useState(2026);

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
        const updateTime = () => {
            const now = new Date();
            // Format for East Africa Time (EAT, UTC+3)
            const eatString = now.toLocaleTimeString("en-US", {
                timeZone: "Africa/Addis_Ababa",
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });
            setCurrentTime(eatString);
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <footer className="bg-[#04070b] text-[#94a3b8] pt-20 pb-12 px-6 sm:px-8 font-sans border-t border-white/[0.08] relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Top Row: Brand & Architectural Coordinates */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08] items-start">
                    
                    {/* Brand Column (5 cols) */}
                    <div className="lg:col-span-5 space-y-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#064e3b] to-[#022c22] border border-[#10b981]/40 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.15)] group-hover:border-[#10b981] transition-all">
                                <span className="font-mono text-xs font-black text-[#34d399] tracking-tighter">YP</span>
                            </div>
                            <span className="font-sans font-black text-xl tracking-tight text-white">
                                YEGNA<span className="text-[#34d399] font-light">PAY</span>
                            </span>
                        </Link>

                        <p className="text-sm text-[#94a3b8] max-w-sm leading-relaxed font-normal">
                            Autonomous payment verification infrastructure engineered specifically for the Ethiopian banking system. Fast, tamper-proof, and developer-first.
                        </p>

                        {/* Operational Telemetry Badge */}
                        <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#0a1118] border border-white/[0.08] font-mono text-xs text-[#cbd5e1]">
                            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                            <span>Addis Ababa (EAT): {currentTime || "14:45:00"}</span>
                        </div>
                    </div>

                    {/* Nav Links Grid (7 cols) */}
                    <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        <div>
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748b] block mb-4">
                                Platform
                            </span>
                            <ul className="space-y-3 font-mono text-xs">
                                <li>
                                    <Link href="/#product-showcase" className="hover:text-[#34d399] transition-colors">
                                        Verification Console
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#bank-infrastructure" className="hover:text-[#34d399] transition-colors">
                                        Bank Infrastructure
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#pricing" className="hover:text-[#34d399] transition-colors">
                                        Transparent Fee Model
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/connected-banks" className="hover:text-[#34d399] transition-colors">
                                        Active Bank Nodes
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748b] block mb-4">
                                Developers
                            </span>
                            <ul className="space-y-3 font-mono text-xs">
                                <li>
                                    <Link href="/documentation" className="hover:text-[#34d399] transition-colors flex items-center gap-1">
                                        <span>API Documentation</span>
                                        <ArrowUpRight size={12} />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/documentation#examples" className="hover:text-[#34d399] transition-colors">
                                        Request Payloads
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/documentation#expected-response" className="hover:text-[#34d399] transition-colors">
                                        Response Schemas
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/blog" className="hover:text-[#34d399] transition-colors">
                                        Engineering Dispatches
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748b] block mb-4">
                                Access
                            </span>
                            <ul className="space-y-3 font-mono text-xs">
                                <li>
                                    <Link href="/sign-in" className="hover:text-[#34d399] transition-colors">
                                        Merchant Sign In
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/sign-up" className="hover:text-[#34d399] transition-colors">
                                        Register New Account
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/dashboard" className="hover:text-[#34d399] transition-colors">
                                        Production Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#contact" className="hover:text-[#34d399] transition-colors">
                                        Technical Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

                {/* Subfooter: Regulatory & Copyright Bar */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-[#64748b]">
                    <div className="flex items-center gap-4">
                        <span className="text-[#34d399] font-bold">ETHIOPIA CLEARING PROTOCOL</span>
                        <span>•</span>
                        <span>0.5 ETB / VERIFICATION</span>
                    </div>

                    <div className="text-center md:text-right">
                        © {currentYear} Yegna Pay. All rights reserved. Addis Ababa, Ethiopia.
                    </div>
                </div>
            </div>
        </footer>
    );
}
