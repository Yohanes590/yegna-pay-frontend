"use client";

import { useState } from "react";
import { Code2, Copy, Check, Terminal, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    getDashboardSnippets,
    SUPPORTED_DASHBOARD_BANKS,
    type DevLang,
    type VerificationMethod,
} from "./dev-snippets-helper";

interface DevProps {
    project: any;
}

export default function DashboardDevelopers({ project }: DevProps) {
    const [verificationMethod, setVerificationMethod] = useState<VerificationMethod>("link");
    const [selectedLang, setSelectedLang] = useState<DevLang>("curl");
    const [copied, setCopied] = useState(false);

    const apiKey = project?.api_sec_key || "yegna_live_sec_demo_key";
    const receiverName = project?.receiver_name || "MULUGETA KASSAW CLEANING SERVICE";
    const { linkSnippets, receiptSnippets } = getDashboardSnippets(apiKey, receiverName);

    const activeSnippet =
        verificationMethod === "receipt" ? receiptSnippets[selectedLang] : linkSnippets[selectedLang];

    const copySnippet = () => {
        navigator.clipboard.writeText(activeSnippet);
        setCopied(true);
        toast.success("Code snippet copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b] rounded-xl shadow-2xs">
                <div>
                    <h2 className="text-lg font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-2">
                        <Code2 size={20} className="text-[#059669] dark:text-[#34d399]" />
                        Developer API &amp; Integration
                    </h2>
                    <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-0.5">
                        Verify transactions via bank transaction link (JSON) or QR receipt image upload (FormData)
                    </p>
                </div>
                <a href="/documentation" target="_blank" rel="noreferrer">
                    <Button variant="outline" size="sm" className="gap-2 text-xs">
                        <span>Full Specification</span>
                        <ExternalLink size={13} />
                    </Button>
                </a>
            </div>

            <Card className="border-[#e2e8f0] dark:border-[#1e293b] bg-white dark:bg-[#0c141f] shadow-xs overflow-hidden">
                <div className="px-5 py-3 bg-slate-50 dark:bg-[#060a10] flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-[#1e293b]">
                    <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2">
                            <Terminal size={14} className="text-[#059669] dark:text-[#34d399]" />
                            <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                                Payment Verification Request
                            </span>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-white/5 p-0.5 rounded-md">
                            <button
                                onClick={() => setVerificationMethod("link")}
                                className={`px-2 py-1 text-[11px] font-mono rounded font-semibold transition-colors ${
                                    verificationMethod === "link"
                                        ? "bg-[#059669] text-white dark:bg-[#064e3b] dark:text-[#34d399]"
                                        : "text-slate-600 hover:text-slate-950 dark:text-[#94a3b8] dark:hover:text-white"
                                }`}
                            >
                                Transaction Link
                            </button>
                            <button
                                onClick={() => setVerificationMethod("receipt")}
                                className={`px-2 py-1 text-[11px] font-mono rounded font-semibold transition-colors ${
                                    verificationMethod === "receipt"
                                        ? "bg-[#059669] text-white dark:bg-[#064e3b] dark:text-[#34d399]"
                                        : "text-slate-600 hover:text-slate-950 dark:text-[#94a3b8] dark:hover:text-white"
                                }`}
                            >
                                Receipt Image (QR)
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {(["curl", "node", "python"] as const).map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setSelectedLang(lang)}
                                className={`px-2.5 py-1 text-[11px] font-mono rounded font-semibold transition-colors ${
                                    selectedLang === lang
                                        ? "bg-slate-900 text-white dark:bg-[#064e3b] dark:text-[#34d399]"
                                        : "text-slate-600 hover:text-slate-950 dark:text-[#94a3b8] dark:hover:text-white"
                                }`}
                            >
                                {lang.toUpperCase()}
                            </button>
                        ))}
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={copySnippet}
                            className="h-7 px-2 text-xs text-slate-600 hover:text-slate-950 dark:text-[#94a3b8] dark:hover:text-white ml-2"
                        >
                            {copied ? <Check size={13} className="text-[#059669] dark:text-[#34d399]" /> : <Copy size={13} />}
                        </Button>
                    </div>
                </div>
                <pre className="p-5 bg-slate-100 dark:bg-[#060a10] text-slate-900 dark:text-[#f1f5f9] font-mono text-xs overflow-x-auto leading-relaxed">
                    <code>{activeSnippet}</code>
                </pre>
            </Card>

            <Card className="border-[#e2e8f0] dark:border-[#1e293b] bg-white dark:bg-[#0c141f] shadow-xs">
                <CardHeader className="pb-3 border-b border-[#f1f5f9] dark:border-[#1e293b]">
                    <CardTitle className="text-sm font-bold text-[#0f172a] dark:text-[#f8fafc]">
                        Connected Ethiopian Banking Rails
                    </CardTitle>
                    <CardDescription className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                        Active automated parsers and receipt decoders supporting instant verification
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {SUPPORTED_DASHBOARD_BANKS.map((b) => (
                            <div
                                key={b.code}
                                className="p-3 bg-[#f8fafc] dark:bg-[#131d2a] border border-[#e2e8f0] dark:border-[#1e293b] rounded-lg flex items-center justify-between"
                            >
                                <div>
                                    <span className="text-xs font-bold text-[#0f172a] dark:text-[#f8fafc] block">
                                        {b.name}
                                    </span>
                                    <span className="text-[10px] text-[#64748b] dark:text-[#94a3b8] font-mono">
                                        {b.code} · Link &amp; QR
                                    </span>
                                </div>
                                <Badge variant="verified" className="text-[10px]">
                                    {b.status}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
