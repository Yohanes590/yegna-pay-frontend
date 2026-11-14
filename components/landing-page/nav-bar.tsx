"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import MobileNavDrawer from "./mobile-nav-drawer";
import { productItems, developerItems } from "./nav-data";

export default function NavigationBarRender() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<"product" | "developers" | null>(null);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenDropdown(null);
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpenDropdown(null);
                setMobileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const toggleDropdown = (key: "product" | "developers") => {
        setOpenDropdown((prev) => (prev === key ? null : key));
    };

    const renderDropdown = (key: "product" | "developers", label: string, items: typeof productItems) => (
        <div className="relative">
            <button
                type="button"
                onClick={() => toggleDropdown(key)}
                aria-expanded={openDropdown === key}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-950 dark:text-[#cbd5e1] dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors"
            >
                <span>{label}</span>
                <ChevronDown
                    size={14}
                    className={`text-slate-400 dark:text-[#64748b] transition-transform duration-150 ${
                        openDropdown === key ? "rotate-180 text-[#059669] dark:text-[#34d399]" : ""
                    }`}
                />
            </button>

            {openDropdown === key && (
                <div className="absolute left-0 top-full mt-2 w-72 rounded-xl bg-white dark:bg-[#0c1219] border border-slate-200 dark:border-white/[0.1] shadow-xl dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85)] p-2 z-50">
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpenDropdown(null)}
                            className="block px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-white/[0.05] transition-colors group"
                        >
                            <span className="block text-sm font-medium text-slate-900 dark:text-white group-hover:text-[#059669] dark:group-hover:text-[#34d399] transition-colors">
                                {item.label}
                            </span>
                            <span className="block text-xs text-slate-500 dark:text-[#94a3b8] mt-0.5 leading-snug">
                                {item.description}
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <header
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
                scrolled || mobileMenuOpen
                    ? "bg-white/95 dark:bg-[#070b10]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/[0.08]"
                    : "bg-white/80 dark:bg-[#070b10]/70 backdrop-blur-sm border-b border-slate-200/70 dark:border-white/[0.04]"
            }`}
        >
            <div className="max-w-7xl mx-auto h-16 px-5 sm:px-8 flex items-center justify-between gap-6">
                <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
                    <div className="w-8 h-8 rounded-md bg-[#059669] dark:bg-[#064e3b] border border-[#059669] dark:border-[#10b981]/40 flex items-center justify-center transition-colors">
                        <span className="font-mono text-xs font-bold text-white dark:text-[#34d399] tracking-tight">YP</span>
                    </div>
                    <span className="font-sans font-bold text-base tracking-tight text-slate-900 dark:text-white">
                        Yegna<span className="text-[#059669] dark:text-[#34d399]">Pay</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
                    {renderDropdown("product", "Product", productItems)}
                    {renderDropdown("developers", "Developers", developerItems)}
                    <Link
                        href="/#pricing"
                        className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-950 dark:text-[#cbd5e1] dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors"
                    >
                        Pricing
                    </Link>
                </nav>

                <div className="hidden md:flex items-center gap-2.5 shrink-0">
                    <ThemeToggle />
                    <Link
                        href="/sign-in"
                        className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-950 dark:text-[#cbd5e1] dark:hover:text-white transition-colors"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/sign-up"
                        className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-[#059669] hover:bg-[#047857] dark:hover:bg-[#10b981] text-white text-sm font-semibold transition-colors"
                    >
                        <span>Get Started</span>
                        <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="md:hidden flex items-center gap-1.5">
                    <ThemeToggle />
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                        className="p-2 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-100 dark:text-[#cbd5e1] dark:hover:text-white dark:hover:bg-white/[0.06] transition-colors"
                        aria-label="Toggle navigation menu"
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            <MobileNavDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        </header>
    );
}
