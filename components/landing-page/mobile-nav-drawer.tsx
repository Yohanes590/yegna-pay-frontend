"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface MobileNavDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const navLinks = [
    { href: "/#product-showcase", label: "/CONSOLE" },
    { href: "/#bank-infrastructure", label: "/BANK-NODES" },
    { href: "/#developer-api", label: "/API-DOCS" },
    { href: "/#pricing", label: "/FEE-MODEL" },
    { href: "/blog", label: "/DISPATCHES" },
    { href: "/documentation", label: "/DOCUMENTATION" },
];

export default function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="md:hidden bg-[#060a0f] border-b border-white/10 px-6 py-6 space-y-4"
                >
                    <div className="flex flex-col gap-3 font-mono text-sm">
                        {navLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className="text-[#94a3b8] hover:text-white py-1"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                    <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                        <Link
                            href="/sign-in"
                            onClick={onClose}
                            className="w-full text-center py-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-xs uppercase tracking-widest font-bold text-white"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/sign-up"
                            onClick={onClose}
                            className="w-full text-center py-2.5 rounded-lg bg-[#059669] text-xs uppercase tracking-widest font-black text-white shadow-lg"
                        >
                            Start Building
                        </Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

