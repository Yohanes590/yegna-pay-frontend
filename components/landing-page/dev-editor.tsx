"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { requestSnippets, responseSnippet, webhookSnippet } from "./dev-snippets";

export default function DevEditor() {
    const [copied, setCopied] = useState(false);
    const [activeLang, setActiveLang] = useState<"curl" | "node" | "python" | "go">("curl");
    const [activeView, setActiveView] = useState<"request" | "response" | "webhook">("request");

    const getCurrentSnippet = () => {
        if (activeView === "response") return responseSnippet;
        if (activeView === "webhook") return webhookSnippet;
        return requestSnippets[activeLang];
    };

    const copyCode = () => {
        navigator.clipboard.writeText(getCurrentSnippet());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="lg:col-span-7 rounded-2xl border border-white/[0.12] bg-[#0a1118] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] overflow-hidden">
            <div className="p-4 bg-[#060a0f] border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 font-mono text-xs">
                    {(["request", "response", "webhook"] as const).map((view) => (
                        <button
                            key={view}
                            onClick={() => setActiveView(view)}
                            className={`px-3 py-1.5 rounded uppercase font-bold transition-colors ${
                                activeView === view
                                    ? "bg-[#064e3b] text-[#34d399] border border-[#10b981]/40"
                                    : "text-[#94a3b8] hover:text-white"
                            }`}
                        >
                            {view === "request" ? "Request Payload" : view === "response" ? "Response (200 OK)" : "Webhook Event"}
                        </button>
                    ))}
                </div>

                <button
                    onClick={copyCode}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-[#cbd5e1] hover:text-white transition-all"
                >
                    {copied ? (
                        <>
                            <Check size={13} className="text-[#34d399]" />
                            <span className="text-[#34d399]">Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy size={13} />
                            <span>Copy Code</span>
                        </>
                    )}
                </button>
            </div>

            {activeView === "request" && (
                <div className="px-5 py-2.5 bg-[#080d14] border-b border-white/[0.06] flex items-center gap-3 overflow-x-auto font-mono text-xs">
                    <span className="text-[#64748b] text-[10px] uppercase tracking-wider mr-2">Language:</span>
                    {(["curl", "node", "python", "go"] as const).map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setActiveLang(lang)}
                            className={`px-2.5 py-1 rounded transition-colors uppercase text-[11px] font-bold ${
                                activeLang === lang ? "text-white bg-white/10" : "text-[#64748b] hover:text-[#94a3b8]"
                            }`}
                        >
                            {lang === "node" ? "Node.js" : lang}
                        </button>
                    ))}
                </div>
            )}

            <div className="p-6 bg-[#060a0f] overflow-x-auto min-h-[360px] font-mono text-[13px] leading-relaxed">
                <pre className="text-[#f1f5f9] whitespace-pre">
                    <code>{getCurrentSnippet()}</code>
                </pre>
            </div>

            <div className="px-6 py-3 bg-[#0a1118] border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-[#64748b]">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                    <span>SSL Encrypted / TLS 1.3 Strict</span>
                </div>
                <span className="text-[#34d399]">JSON Schema v1.4 Validated</span>
            </div>
        </div>
    );
}

