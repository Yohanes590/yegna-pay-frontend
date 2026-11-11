"use client";

import { useTheme } from "@/lib/theme-context";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
    const { resolvedTheme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className={`w-8 h-8 rounded-lg bg-transparent ${className}`} />;
    }

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className={`p-2 rounded-lg text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc] hover:bg-[#f1f5f9] dark:hover:bg-[#1e293b] transition-all cursor-pointer ${className}`}
            title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
            aria-label="Toggle dark/light theme"
        >
            {resolvedTheme === "dark" ? (
                <Sun size={16} className="text-[#fbbf24] transition-transform duration-300 rotate-0" />
            ) : (
                <Moon size={16} className="text-[#64748b] transition-transform duration-300" />
            )}
        </button>
    );
}

