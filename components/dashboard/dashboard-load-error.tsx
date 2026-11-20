"use client";

import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
    message: string;
    onRetry?: () => void;
};

export default function DashboardLoadError({ message, onRetry }: Props) {
    const friendly =
        message === "network_error"
            ? "Could not reach the server. Check your connection and try again."
            : message || "We could not load your account data.";

    return (
        <div className="rounded-xl border border-[#fecaca] dark:border-[#7f1d1d] bg-[#fef2f2] dark:bg-[#450a0a]/30 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex gap-3 flex-1 min-w-0">
                <AlertCircle className="text-[#dc2626] dark:text-[#f87171] shrink-0 mt-0.5" size={22} />
                <div>
                    <p className="text-sm font-bold text-[#991b1b] dark:text-[#fecaca]">Dashboard data unavailable</p>
                    <p className="text-xs text-[#b91c1c] dark:text-[#fca5a5] mt-1 leading-relaxed">{friendly}</p>
                    <p className="text-[11px] text-[#64748b] dark:text-[#94a3b8] mt-2">
                        If you just signed in with GitHub, confirm Vercel has{" "}
                        <code className="font-mono">NEXT_PUBLIC_BACKEND_URL</code> and redeploy backend on Dokploy.
                    </p>
                </div>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
                {onRetry && (
                    <Button type="button" variant="outline" className="h-9 gap-2 text-xs" onClick={onRetry}>
                        <RefreshCw size={14} />
                        Retry
                    </Button>
                )}
                <Link href="/sign-in">
                    <Button type="button" className="h-9 text-xs bg-[#059669] hover:bg-[#047857]">
                        Sign in again
                    </Button>
                </Link>
            </div>
        </div>
    );
}