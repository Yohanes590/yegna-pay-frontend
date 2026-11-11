"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
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
        <div className="min-h-screen bg-[#060a0f] text-[#F8FAFC] font-sans selection:bg-[#10B981]/30 selection:text-[#34D399]">
            <header className="fixed top-0 left-0 right-0 h-16 bg-[#060a0f]/80 backdrop-blur-xl border-b border-white/[0.08] z-50 flex items-center justify-between px-6">
                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 group cursor-pointer text-[#94A3B8] hover:text-[#F8FAFC] transition-colors font-mono text-xs font-bold"
                    >
                        <ArrowLeft size={16} />
                        <span>Return to Main Site</span>
                    </Link>
                    <div className="h-4 w-px bg-white/10" />
                    <span className="font-bold text-white flex items-center gap-2 font-mono text-xs">
                        <span className="px-2 py-0.5 rounded bg-[#10B981] text-[#060a0f] font-black">YP</span>
                        API Documentation
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 bg-[#0A1118] border border-white/10 rounded-lg px-3 py-1.5 text-[#64748B] focus-within:border-[#10B981]/50 transition-all font-mono text-xs">
                        <Search size={14} />
                        <input
                            type="text"
                            placeholder="Search endpoints..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none outline-none text-[#F8FAFC] placeholder:text-[#64748B] w-40"
                        />
                    </div>
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
