"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Terminal, Database, Menu, X, ArrowUpRight, Activity } from "lucide-react";
import MobileNavDrawer from "./mobile-nav-drawer";

export default function NavigationBarRender() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isBlogActive = pathname.startsWith("/blog");

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-[#060a0f]/90 backdrop-blur-md border-b border-white/[0.08] shadow-[0_12px_40px_-15px_rgba(0,0,0,0.8)]"
                    : "bg-transparent border-b border-white/[0.04]"
            }`}
        >
            <div className="max-w-7xl mx-auto h-20 px-6 sm:px-8 flex items-center justify-between">
                <div className="flex items-center gap-10">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-[#064e3b] to-[#022c22] border border-[#10b981]/40 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.15)] group-hover:border-[#10b981] transition-all">
                            <span className="font-mono text-xs font-black text-[#34d399] tracking-tighter">YP</span>
                            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-sans font-black text-lg tracking-tight text-white flex items-center gap-1">
                                YEGNA<span className="text-[#34d399] font-light">PAY</span>
                            </span>
                            <span className="text-[9px] uppercase tracking-[0.22em] text-[#64748b] font-medium -mt-1">
                                National Clearing Engine
                            </span>
                        </div>
                    </Link>

                    <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#022c22]/40 border border-[#10b981]/25 text-[11px] font-mono text-[#34d399]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
                        <span className="text-[10px] uppercase tracking-wider font-semibold">4 Banking Rails Online</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-1">
                        <Link
                            href="/#product-showcase"
                            className="px-3.5 py-1.5 text-xs uppercase tracking-widest font-semibold text-[#94a3b8] hover:text-white hover:bg-white/[0.04] rounded transition-colors"
                        >
                            Console
                        </Link>
                        <Link
                            href="/#bank-infrastructure"
                            className="px-3.5 py-1.5 text-xs uppercase tracking-widest font-semibold text-[#94a3b8] hover:text-white hover:bg-white/[0.04] rounded transition-colors"
                        >
                            Networks
                        </Link>
                        <Link
                            href="/#developer-api"
                            className="px-3.5 py-1.5 text-xs uppercase tracking-widest font-semibold text-[#94a3b8] hover:text-white hover:bg-white/[0.04] rounded transition-colors"
                        >
                            API Docs
                        </Link>
                        <Link
                            href="/#pricing"
                            className="px-3.5 py-1.5 text-xs uppercase tracking-widest font-semibold text-[#94a3b8] hover:text-white hover:bg-white/[0.04] rounded transition-colors"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/blog"
                            className={`px-3.5 py-1.5 text-xs uppercase tracking-widest font-semibold rounded transition-colors ${
                                isBlogActive
                                    ? "text-[#34d399] bg-[#064e3b]/30 border border-[#10b981]/30"
                                    : "text-[#94a3b8] hover:text-white hover:bg-white/[0.04]"
                            }`}
                        >
                            Dispatches
                        </Link>
                    </nav>
                </div>

                <div className="hidden sm:flex items-center gap-4">
                    <Link
                        href="/documentation"
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#94a3b8] hover:text-[#34d399] transition-colors"
                    >
                        <span>DOCS</span>
                        <ArrowUpRight size={13} />
                    </Link>

                    <div className="h-4 w-px bg-white/10" />

                    <Link
                        href="/sign-in"
                        className="px-4 py-2 text-xs uppercase tracking-widest font-semibold text-[#cbd5e1] hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
                    >
                        Sign In
                    </Link>

                    <Link
                        href="/sign-up"
                        className="relative group inline-flex items-center justify-center px-4 py-2 text-xs uppercase tracking-widest font-bold text-white rounded-lg overflow-hidden transition-all"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#059669] to-[#10b981] group-hover:from-[#10b981] group-hover:to-[#34d399] transition-all" />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10" />
                        <span className="relative z-10 flex items-center gap-1.5">
                            Start Building
                        </span>
                    </Link>
                </div>

                <div className="flex md:hidden items-center gap-3">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#94a3b8] hover:text-white"
                        aria-label="Toggle navigation menu"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            <MobileNavDrawer
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            />
        </header>
    );
}
