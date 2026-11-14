"use client";

import { docSections } from "./docs-data";

export default function DocsSidebar({
    activeSection,
    onSelectSection,
    searchQuery,
}: {
    activeSection: string;
    onSelectSection: (id: string) => void;
    searchQuery: string;
}) {
    const filtered = docSections.filter((s) =>
        s.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <aside className="w-64 flex-shrink-0 hidden lg:block sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
            <div className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-[#64748B] mb-4 font-bold">
                Table of Contents
            </div>
            <nav className="space-y-1 font-mono text-xs">
                {filtered.map((sec) => {
                    const isActive = activeSection === sec.id;
                    return (
                        <button
                            key={sec.id}
                            onClick={() => onSelectSection(sec.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors block ${
                                isActive
                                    ? "bg-emerald-50 text-[#047857] dark:bg-[#10B981]/15 dark:text-[#34D399] font-bold border-l-2 border-[#059669] dark:border-[#10B981]"
                                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-100 dark:text-[#94A3B8] dark:hover:text-white dark:hover:bg-white/[0.04]"
                            }`}
                        >
                            {sec.label}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}

