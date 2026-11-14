"use client";

import { useState } from "react";
import { Cpu, Copy, Check } from "lucide-react";
import { bankPayloads, linkIntegrationPayloads, receiptIntegrationPayloads } from "../docs-data";

interface DocsCodeExamplesProps {
    copiedCode: string | null;
    onCopy: (text: string, id: string) => void;
}

export default function DocsCodeExamples({ copiedCode, onCopy }: DocsCodeExamplesProps) {
    const [activeMethod, setActiveMethod] = useState<"receipt" | "link">("receipt");
    const [activeLang, setActiveLang] = useState<"curl" | "javascript" | "python" | "go">("javascript");
    const [activeBank, setActiveBank] = useState<"cbe" | "awash" | "boa">("cbe");

    const currentIntegrationSnippet =
        activeMethod === "receipt"
            ? receiptIntegrationPayloads[activeLang === "go" ? "curl" : activeLang]
            : linkIntegrationPayloads[activeLang];

    return (
        <>
            {/* 6. Bank Payloads */}
            <section id="banks" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-2">
                    <Cpu className="text-[#059669] dark:text-[#10B981]" size={22} /> Bank Link Payload Examples
                </h2>
                <p className="text-slate-600 dark:text-[#94A3B8] text-sm mb-4">
                    Select a bank rail to inspect its transaction link JSON payload:
                </p>
                <div className="flex gap-2 mb-4">
                    {(["cbe", "awash", "boa"] as const).map((bank) => (
                        <button
                            key={bank}
                            type="button"
                            onClick={() => setActiveBank(bank)}
                            className={`px-4 py-1.5 rounded-lg font-mono text-xs uppercase font-bold transition-colors ${
                                activeBank === bank
                                    ? "bg-[#059669] text-white dark:bg-[#10B981] dark:text-[#060a0f]"
                                    : "bg-slate-100 dark:bg-[#0c1219] text-slate-700 dark:text-[#94A3B8] hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-white/[0.08]"
                            }`}
                        >
                            {bank}
                        </button>
                    ))}
                </div>
                <div className="rounded-xl bg-slate-100 dark:bg-[#0c1219] border border-slate-200 dark:border-white/[0.08] p-5 relative font-mono text-xs overflow-x-auto">
                    <button
                        type="button"
                        onClick={() => onCopy(bankPayloads[activeBank], "bank-payload")}
                        className="absolute top-4 right-4 text-slate-500 hover:text-slate-950 dark:text-[#64748B] dark:hover:text-white"
                        title="Copy payload"
                    >
                        {copiedCode === "bank-payload" ? (
                            <Check size={16} className="text-[#059669] dark:text-[#34D399]" />
                        ) : (
                            <Copy size={16} />
                        )}
                    </button>
                    <pre className="text-slate-900 dark:text-[#F8FAFC] leading-relaxed">{bankPayloads[activeBank]}</pre>
                </div>
            </section>

            {/* 7. Code Examples */}
            <section id="integration" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-4">Code Examples</h2>
                <p className="text-slate-600 dark:text-[#94A3B8] text-sm mb-4">
                    All integration snippets below construct the endpoint dynamically from{" "}
                    <code className="text-[#059669] dark:text-[#34D399]">NEXT_PUBLIC_BACKEND_URL</code>.
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                setActiveMethod("receipt");
                                if (activeLang === "go") setActiveLang("javascript");
                            }}
                            className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold transition-colors ${
                                activeMethod === "receipt"
                                    ? "bg-[#059669] text-white dark:bg-[#10B981] dark:text-[#060a0f]"
                                    : "bg-slate-100 dark:bg-[#0c1219] text-slate-700 dark:text-[#94A3B8] hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-white/[0.08]"
                            }`}
                        >
                            Method A: Receipt Image (FormData)
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveMethod("link")}
                            className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold transition-colors ${
                                activeMethod === "link"
                                    ? "bg-[#059669] text-white dark:bg-[#10B981] dark:text-[#060a0f]"
                                    : "bg-slate-100 dark:bg-[#0c1219] text-slate-700 dark:text-[#94A3B8] hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-white/[0.08]"
                            }`}
                        >
                            Method B: Transaction Link (JSON)
                        </button>
                    </div>

                    <div className="flex gap-2">
                        {(activeMethod === "receipt"
                            ? (["javascript", "curl", "python"] as const)
                            : (["javascript", "curl", "python", "go"] as const)
                        ).map((lang) => (
                            <button
                                key={lang}
                                type="button"
                                onClick={() => setActiveLang(lang)}
                                className={`px-3.5 py-1.5 rounded-lg font-mono text-xs capitalize font-bold transition-colors ${
                                    activeLang === lang
                                        ? "bg-slate-900 text-white dark:bg-white/15 dark:text-white border border-slate-900 dark:border-white/20"
                                        : "bg-slate-100 dark:bg-[#0c1219] text-slate-700 dark:text-[#94A3B8] hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-white/[0.08]"
                                }`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl bg-slate-100 dark:bg-[#0c1219] border border-slate-200 dark:border-white/[0.08] p-5 relative font-mono text-xs overflow-x-auto">
                    <button
                        type="button"
                        onClick={() => onCopy(currentIntegrationSnippet, "integration-code")}
                        className="absolute top-4 right-4 text-slate-500 hover:text-slate-950 dark:text-[#64748B] dark:hover:text-white"
                        title="Copy snippet"
                    >
                        {copiedCode === "integration-code" ? (
                            <Check size={16} className="text-[#059669] dark:text-[#34D399]" />
                        ) : (
                            <Copy size={16} />
                        )}
                    </button>
                    <pre className="text-slate-900 dark:text-[#F8FAFC] leading-relaxed">{currentIntegrationSnippet}</pre>
                </div>
            </section>
        </>
    );
}

