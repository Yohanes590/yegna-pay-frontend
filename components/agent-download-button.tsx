"use client";

import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

type AgentDownloadButtonProps = {
    className?: string;
    variant?: "primary" | "secondary" | "ghost";
    label?: string;
    /** When set, downloads workspace-specific guide (requires sign-in). */
    projectId?: string;
};

export default function AgentDownloadButton({
    className,
    variant = "secondary",
    label = "Agent Download",
    projectId,
}: AgentDownloadButtonProps) {
    const href = projectId
        ? `/api/user/generate-agent-doc?projectId=${encodeURIComponent(projectId)}`
        : "/api/agent-download";
    const base =
        variant === "primary"
            ? "bg-[#059669] hover:bg-[#047857] text-white border-transparent"
            : variant === "ghost"
            ? "bg-transparent hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-700 dark:text-[#e2e8f0] border-slate-200 dark:border-white/[0.1]"
            : "bg-white/90 hover:bg-white dark:bg-[#0c1219]/80 dark:hover:bg-[#111923] text-slate-900 dark:text-[#f1f5f9] border-slate-300 dark:border-white/[0.14]";

    return (
        <a
            href={href}
            download="yegnapay-agent-integration.md"
            className={cn(
                "inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg text-sm font-semibold border transition-colors",
                base,
                className
            )}
        >
            <Download size={16} className="shrink-0" />
            <span>{label}</span>
        </a>
    );
}