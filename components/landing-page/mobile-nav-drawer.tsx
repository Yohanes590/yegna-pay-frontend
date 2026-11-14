"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface MobileNavDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const navGroups = [
    {
        title: "Product",
        links: [
            { href: "/#product-showcase", label: "Verification Console" },
            { href: "/#bank-infrastructure", label: "Supported Banks" },
            { href: "/#how-it-works", label: "How It Works" },
            { href: "/#security", label: "Security & Reliability" },
            { href: "/#pricing", label: "Pricing" },
        ],
    },
    {
        title: "Developers",
        links: [
            { href: "/documentation", label: "API Documentation" },
            { href: "/documentation#error-codes", label: "Error Codes Reference" },
            { href: "/#developer-api", label: "Integration Examples" },
            { href: "/blog", label: "Engineering Blog" },
            { href: "/connected-banks", label: "Bank Specifications" },
        ],
    },
];

export default function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="md:hidden overflow-hidden bg-white dark:bg-[#070b10] border-b border-slate-200 dark:border-white/[0.08]"
                >
                    <div className="px-5 py-6 space-y-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {navGroups.map((group) => (
                                <div key={group.title} className="space-y-2.5">
                                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-[#64748b] font-semibold">
                                        {group.title}
                                    </div>
                                    <div className="flex flex-col space-y-1">
                                        {group.links.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={onClose}
                                                className="py-1.5 text-sm font-medium text-slate-700 hover:text-[#059669] dark:text-[#cbd5e1] dark:hover:text-[#34d399] transition-colors"
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/sign-in"
                                onClick={onClose}
                                className="flex-1 text-center py-2.5 px-4 rounded-lg border border-slate-300 dark:border-white/[0.12] text-sm font-medium text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/sign-up"
                                onClick={onClose}
                                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-[#059669] hover:bg-[#10b981] text-sm font-semibold text-white transition-colors"
                            >
                                <span>Get Started</span>
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
