import React from 'react';
import {
    ArrowUpRight,
    Globe,
    ShieldCheck,
    Send,
    Instagram
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
export default function MinimalFooter() {


    const [Year, setYear] = useState<string | number>()

    useEffect(() => {
        const year = new Date().getFullYear()
        setYear(year)
    }, [])
    return (
        <footer className="bg-[#0F172A] text-[#94A3B8] pt-16 pb-10 px-6 font-sans border-t border-[#1E293B]">
            <div className="max-w-7xl mx-auto">
                {/* Main Content Row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#1E293B] items-start">

                    {/* Brand & Tagline */}
                    <div className="md:col-span-5 space-y-5">
                        <div className="flex items-center gap-2 group cursor-pointer">
                            <div className="w-9 h-9 bg-[#10B981] rounded-xl flex items-center justify-center shadow-lg shadow-[#10B981]/10 group-hover:rotate-6 transition-transform">
                                <span className="text-[#020617] font-black text-lg">Y</span>
                            </div>
                            <h1 className="font-extrabold text-xl tracking-tight text-[#F8FAFC]">
                                Yegna<span className="text-[#10B981]">Pay</span>
                            </h1>
                        </div>
                        <p className="text-sm text-[#64748B] max-w-sm leading-relaxed">
                            Empowering the next generation of Ethiopian commerce with secure, automated payment verification.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3 pt-2">
                            <Link
                                href="https://t.me/your_telegram"
                                target="_blank"
                                className="w-10 h-10 rounded-xl border border-[#1E293B] bg-[#020617] flex items-center justify-center text-[#64748B] hover:border-[#10B981] hover:text-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0)] hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all duration-300"
                            >
                                <Send size={16} />
                            </Link>
                            <Link
                                href="https://instagram.com/your_instagram"
                                target="_blank"
                                className="w-10 h-10 rounded-xl border border-[#1E293B] bg-[#020617] flex items-center justify-center text-[#64748B] hover:border-[#10B981] hover:text-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0)] hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all duration-300"
                            >
                                <Instagram size={16} />
                            </Link>
                        </div>
                    </div>

                    {/* Strict Navigation Links */}
                    <div className="md:col-span-7 md:flex md:justify-end gap-16 md:gap-24">
                        <div>
                            <h3 className="text-[#F8FAFC] font-bold mb-5 tracking-widest uppercase text-[10px]">Resources</h3>
                            <ul className="space-y-3.5">
                                <li>
                                    <Link href="/documentation" className="group flex items-center text-[#94A3B8] hover:text-[#10B981] transition-all duration-200">
                                        <span className="text-sm font-bold">Reading Docs</span>
                                        <ArrowUpRight size={14} className="ml-0.5 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out" />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/documentation" className="group flex items-center text-[#94A3B8] hover:text-[#10B981] transition-all duration-200">
                                        <span className="text-sm font-bold">API Reference</span>
                                        <ArrowUpRight size={14} className="ml-0.5 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-8 md:mt-0">
                            <h3 className="text-[#F8FAFC] font-bold mb-5 tracking-widest uppercase text-[10px]">Company</h3>
                            <ul className="space-y-3.5">
                                <li>
                                    <Link href="#about" className="group flex items-center text-[#94A3B8] hover:text-[#10B981] transition-all duration-200">
                                        <span className="text-sm font-bold">About Us</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#pricing" className="group flex items-center text-[#94A3B8] hover:text-[#10B981] transition-all duration-200">
                                        <span className="text-sm font-bold">Pricing</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bank Grayscale Bar & Security */}
                <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-[#1E293B]">
                    <div className="flex items-center gap-6 opacity-30 grayscale contrast-200 tracking-tighter text-[#F8FAFC] select-none text-sm font-black italic">
                        <span>CBE</span>
                        <div className="w-1 h-1 rounded-full bg-[#1E293B]" />
                        <span>BOA</span>
                        <div className="w-1 h-1 rounded-full bg-[#1E293B]" />
                        <span>AWASH BANK</span>
                    </div>
                    <div className="flex items-center gap-3 bg-[#020617] px-4 py-2.5 rounded-xl border border-[#1E293B]">
                        <ShieldCheck size={16} className="text-[#10B981]" />
                        <p className="text-[10px] font-extrabold text-[#94A3B8] uppercase tracking-widest">
                            PCI DSS Compliant & Secure
                        </p>
                    </div>
                </div>

                {/* Bottom Metadata Bar */}
                <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-[#64748B] text-xs font-medium text-center md:text-left">
                        © {Year} Yegna Pay Technologies. Built with pride in Addis Ababa.
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 text-xs font-bold text-[#64748B] hover:text-[#F8FAFC] transition-colors cursor-pointer">
                            <Globe size={14} className="text-[#10B981]" />
                            <span>English (ET)</span>
                        </button>
                        <div className="hidden md:block h-3 w-[1px] bg-[#1E293B]" />
                        <div className="flex items-center gap-5 text-xs font-bold text-[#64748B]">
                            <Link href="#" className="hover:text-[#F8FAFC] transition-colors">Security</Link>
                            <Link href="#" className="hover:text-[#F8FAFC] transition-colors">Privacy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}