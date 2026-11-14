"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import DocsSidebar from "./docs-sidebar";
import DocsSections from "./docs-sections";

export default function DocumentationPage() {
    const [activeSection, setActiveSection] = useState("introduction");
    const [searchQuery, setSearchQuery] = useState("");

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo({
                top: el.offsetTop - 100,
                behavior: "smooth",
            });
            setActiveSection(id);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#070b10] text-slate-900 dark:text-[#f1f5f9] font-sans selection:bg-[#10b981]/25 selection:text-[#047857] dark:selection:text-[#34d399]">
            <header className="fixed top-0 left-0 right-0 h-16 bg-white/90 dark:bg-[#070b10]/85 backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.07] z-50 flex items-center justify-between px-4 sm:px-6">
                <div className="flex items-center gap-4 sm:gap-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 group cursor-pointer text-slate-600 hover:text-slate-950 dark:text-[#94a3b8] dark:hover:text-white transition-colors font-mono text-xs font-medium"
                    >
                        <ArrowLeft size={15} />
                        <span className="hidden sm:inline">Return to Main Site</span>
                        <span className="sm:hidden">Back</span>
                    </Link>
                    <div className="h-4 w-px bg-slate-200 dark:bg-white/10" />
                    <span className="font-semibold text-slate-950 dark:text-white flex items-center gap-2 font-sans text-sm">
                        <span className="px-2 py-0.5 rounded bg-[#059669] text-white font-mono text-xs font-bold">YP</span>
                        API Documentation
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 bg-slate-50 dark:bg-[#0c1219] border border-slate-200 dark:border-white/[0.08] rounded-lg px-3 py-1.5 text-slate-400 dark:text-[#64748b] focus-within:border-[#059669] dark:focus-within:border-[#10b981]/50 transition-all font-mono text-xs">
                        <Search size={14} />
                        <input
                            type="text"
                            placeholder="Search endpoints..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none outline-none text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 dark:placeholder:text-[#64748B] w-40"
                        />
                    </div>
                    <ThemeToggle />
                </div>
            </header>

            <main className="max-w-7xl mx-auto pt-28 pb-20 px-6 flex gap-12">
                <DocsSidebar
                    activeSection={activeSection}
                    onSelectSection={scrollToSection}
                    searchQuery={searchQuery}
                />
                <div className="flex-1 min-w-0">
                    <DocsSections />
                </div>
            </main>
        </div>
    );
}
