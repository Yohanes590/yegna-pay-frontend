"use client";

import { ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type VerificationModeToggleProps = {
    enabled: boolean;
    onChange: (enabled: boolean) => void;
    disabled?: boolean;
};

export default function VerificationModeToggle({
    enabled,
    onChange,
    disabled = false,
}: VerificationModeToggleProps) {
    return (
        <div className="rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] bg-[#f8fafc] dark:bg-[#0a1018] p-4 space-y-3">
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#475569] dark:text-[#94a3b8]">
                        Verification mode
                    </p>
                    <p className="text-sm text-[#0f172a] dark:text-[#f8fafc] font-medium">
                        {enabled ? "Detailed verification" : "Payment-only verification"}
                    </p>
                    <p className="text-xs text-[#64748b] dark:text-[#94a3b8] leading-relaxed max-w-md">
                        {enabled
                            ? "Match receiver name, amount, eligibility date, and block duplicate transaction IDs."
                            : "Confirm amount against the bank receipt and block duplicates only — no receiver or date rules."}
                    </p>
                </div>
                <button
                    type="button"
                    role="switch"
                    aria-checked={enabled}
                    disabled={disabled}
                    onClick={() => onChange(!enabled)}
                    className={cn(
                        "relative shrink-0 w-12 h-7 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#059669]",
                        enabled ? "bg-[#059669]" : "bg-[#cbd5e1] dark:bg-[#334155]",
                        disabled && "opacity-50 cursor-not-allowed"
                    )}
                >
                    <span
                        className={cn(
                            "absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform",
                            enabled ? "translate-x-5" : "translate-x-0"
                        )}
                    />
                </button>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                <span
                    className={cn(
                        "inline-flex items-center gap-1 px-2 py-1 rounded-md border",
                        enabled
                            ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
                            : "border-[#e2e8f0] dark:border-[#334155] text-[#64748b]"
                    )}
                >
                    <ShieldCheck size={12} />
                    Receiver + date checks
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-[#e2e8f0] dark:border-[#334155] text-[#64748b]">
                    <Zap size={12} />
                    Amount + duplicate (always on)
                </span>
            </div>
        </div>
    );
}