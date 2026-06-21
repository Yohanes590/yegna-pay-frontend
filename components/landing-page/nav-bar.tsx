"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Terminal, Database, Menu, X, ArrowRight } from "lucide-react";

export default function NavigationBarRender() {
    const pathname = usePathname();
    const [isDevHovered, setIsDevHovered] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { scrollY } = useScroll();
    const yTransform = useTransform(scrollY, [0, 50], [0, 1]);

    // Active state tracker for /blog or /blog/[slug]
    const isBlogActive = pathname.startsWith("/blog");

    return (
        <motion.div
            className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-300 border-b ${yTransform.get() > 0
                ? "bg-[#020617]/80 border-[#1E293B] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                : "bg-transparent border-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
                <div className="flex items-center gap-12">
                    <Link href="/" className="flex items-center gap-2 group cursor-pointer z-50">
                        <h1 className="font-extrabold text-2xl tracking-tight text-[#F8FAFC]">
                            Yegna<span className="text-[#10B981]">Pay</span>
                        </h1>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1">
                        <Link href="/#about" className="px-4 py-2 text-sm font-semibold text-[#94A3B8] hover:text-[#F8FAFC] bg-transparent hover:bg-[#0F172A] rounded-lg transition-all duration-200">
                            Platform
                        </Link>

                        {/* Developer Submenu Container */}
                        <div
                            className="relative py-2"
                            onMouseEnter={() => setIsDevHovered(true)}
                            onMouseLeave={() => setIsDevHovered(false)}
                        >
                            <button className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-1.5 ${isDevHovered ? 'text-[#F8FAFC] bg-[#0F172A]' : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0F172A]'}`}>
                                Developers
                                <ChevronDown size={14} className={`transition-transform duration-200 ${isDevHovered ? 'rotate-180 text-[#10B981]' : 'text-[#64748B]'}`} />
                            </button>

                            <div className={`absolute left-0 top-[90%] pt-2 w-72 transition-all duration-300 origin-top-left ${isDevHovered ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl shadow-xl p-2 flex flex-col gap-1 relative overflow-hidden">
                                    <Link href="/documentation" className="flex gap-4 p-3 rounded-xl hover:bg-[#020617] transition-colors group">
                                        <div className="w-10 h-10 rounded-lg bg-[#020617] border border-[#1E293B] flex items-center justify-center text-[#94A3B8] group-hover:border-[#10B981]/50 group-hover:text-[#10B981] group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all">
                                            <Terminal size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-[#F8FAFC]">API Documentation</p>
                                            <p className="text-xs text-[#94A3B8] mt-0.5">Integration guides & SDKs</p>
                                        </div>
                                    </Link>

                                    <Link href="/connected-banks" className="flex gap-4 p-3 rounded-xl hover:bg-[#020617] transition-colors group">
                                        <div className="w-10 h-10 rounded-lg bg-[#020617] border border-[#1E293B] flex items-center justify-center text-[#94A3B8] group-hover:border-[#10B981]/50 group-hover:text-[#10B981] group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all">
                                            <Database size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-[#F8FAFC]">Bank Nodes</p>
                                            <p className="text-xs text-[#94A3B8] mt-0.5">Live core banking connections</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <Link href="/#pricing" className="px-4 py-2 text-sm font-semibold text-[#94A3B8] hover:text-[#F8FAFC] bg-transparent hover:bg-[#0F172A] rounded-lg transition-all duration-200">
                            Pricing
                        </Link>

                        {/* Clean active dynamic state applied here */}
                        <Link
                            href="/blog"
                            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${isBlogActive
                                ? "text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]"
                                : "text-[#94A3B8] hover:text-[#F8FAFC] bg-transparent hover:bg-[#0F172A]"
                                }`}
                        >
                            Blog
                        </Link>
                    </nav>
                </div>

                {/* Right side CTA Action Links */}
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/sign-in" className="px-5 py-2.5 text-sm font-bold text-[#94A3B8] hover:text-[#F8FAFC] transition-colors">
                        Sign In
                    </Link>
                    <Link href="/sign-up" className="group flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-[#10B981] text-[#020617] rounded-lg hover:bg-[#34D399] transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] active:scale-95">
                        Start Building <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>

                <div className="md:hidden flex items-center z-50">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-[#F8FAFC] p-2 hover:bg-[#0F172A] rounded-lg transition-colors">
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-[#020617] pt-24 px-6 flex flex-col gap-6 z-40 border-b border-[#1E293B]">
                    <Link onClick={() => setMobileMenuOpen(false)} href="/#about" className="text-2xl font-bold text-[#F8FAFC] border-b border-[#1E293B] pb-4">Platform Features</Link>
                    <Link onClick={() => setMobileMenuOpen(false)} href="/documentation" className="text-2xl font-bold text-[#F8FAFC] border-b border-[#1E293B] pb-4">API Documentation</Link>
                    <Link onClick={() => setMobileMenuOpen(false)} href="/#pricing" className="text-2xl font-bold text-[#F8FAFC] border-b border-[#1E293B] pb-4">Pricing Plans</Link>
                    <Link
                        onClick={() => setMobileMenuOpen(false)}
                        href="/blog"
                        className={`text-2xl font-bold border-b border-[#1E293B] pb-4 ${isBlogActive ? 'text-[#10B981]' : 'text-[#F8FAFC]'}`}
                    >
                        Blog Insights
                    </Link>

                    <div className="flex flex-col gap-4 mt-4">
                        <Link onClick={() => setMobileMenuOpen(false)} href="/sign-in" className="w-full py-4 text-center text-lg font-bold text-[#F8FAFC] bg-[#0F172A] border border-[#1E293B] rounded-xl">Sign In</Link>
                        <Link onClick={() => setMobileMenuOpen(false)} href="/sign-up" className="w-full py-4 text-center text-lg font-bold text-[#020617] bg-[#10B981] rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)]">Create Account</Link>
                    </div>
                </div>
            )}
        </motion.div>
    );
}