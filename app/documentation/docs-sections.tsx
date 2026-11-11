"use client";

import { useState } from "react";
import { Terminal, Copy, Check } from "lucide-react";
import { bankPayloads, integrationPayloads } from "./docs-data";

export default function DocsSections() {
    const [copied, setCopied] = useState(false);
    const [bankTab, setBankTab] = useState<"cbe" | "awash" | "boa">("cbe");
    const [langTab, setLangTab] = useState<"javascript" | "python" | "go">("javascript");

    const copyCode = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-16">
            <section id="introduction" className="scroll-mt-28">
                <h1 className="text-3xl font-black text-white mb-4">API Documentation</h1>
                <p className="text-base text-[#94A3B8] leading-relaxed">
                    Yegna Pay provides automated bank transaction verification and anti-fraud interrogation for Ethiopian developers. All endpoints require HTTPS and Bearer token authentication.
                </p>
            </section>

            <section id="authentication" className="scroll-mt-28 p-6 rounded-2xl bg-[#0A1118] border border-white/[0.08]">
                <h2 className="text-xl font-bold text-white mb-3">Authentication</h2>
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-4">
                    Include your secret project API key in the Authorization header of every request:
                </p>
                <div className="bg-[#060a0f] border border-white/10 rounded-xl p-4 font-mono text-xs text-[#34D399]">
                    Authorization: Bearer sk_live_89a4fe91d0b1...
                </div>
            </section>

            <section id="endpoint" className="scroll-mt-28">
                <h2 className="text-2xl font-bold text-white mb-4">API Endpoint</h2>
                <div className="p-4 rounded-xl bg-[#0A1118] border border-white/[0.08] flex items-center gap-4 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded bg-[#059669] text-white font-bold">POST</span>
                    <span className="text-[#34D399]">https://yegna-pay.vercel.app/api/transaction-create</span>
                </div>
            </section>

            <section id="parameters" className="scroll-mt-28">
                <h2 className="text-2xl font-bold text-white mb-4">Parameters Schema</h2>
                <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#0A1118]">
                    <table className="w-full text-left font-mono text-xs">
                        <thead>
                            <tr className="border-b border-white/[0.08] bg-[#060a0f] text-[#64748B]">
                                <th className="p-4">Field</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Required</th>
                                <th className="p-4">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04] text-[#CBD5E1]">
                            <tr>
                                <td className="p-4 text-[#34D399] font-bold">full_name</td>
                                <td className="p-4">String</td>
                                <td className="p-4 text-[#10B981]">Yes</td>
                                <td className="p-4">Payer account name to cross-reference</td>
                            </tr>
                            <tr>
                                <td className="p-4 text-[#34D399] font-bold">price_amount</td>
                                <td className="p-4">String / Number</td>
                                <td className="p-4 text-[#10B981]">Yes</td>
                                <td className="p-4">Exact expected amount in ETB</td>
                            </tr>
                            <tr>
                                <td className="p-4 text-[#34D399] font-bold">platform</td>
                                <td className="p-4">String</td>
                                <td className="p-4 text-[#10B981]">Yes</td>
                                <td className="p-4">"CBE" | "AWASH" | "BOA"</td>
                            </tr>
                            <tr>
                                <td className="p-4 text-[#34D399] font-bold">transaction_id</td>
                                <td className="p-4">String</td>
                                <td className="p-4 text-[#10B981]">Yes</td>
                                <td className="p-4">Unique reference code from banking slip</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section id="examples" className="scroll-mt-28">
                <h2 className="text-2xl font-bold text-white mb-4">Request Examples by Bank</h2>
                <div className="rounded-xl border border-white/[0.08] bg-[#0A1118] overflow-hidden">
                    <div className="p-3 bg-[#060a0f] border-b border-white/[0.08] flex items-center justify-between font-mono text-xs">
                        <div className="flex gap-2">
                            {(["cbe", "awash", "boa"] as const).map((b) => (
                                <button
                                    key={b}
                                    onClick={() => setBankTab(b)}
                                    className={`px-3 py-1 rounded uppercase font-bold transition-colors ${
                                        bankTab === b ? "bg-[#064e3b] text-[#34D399]" : "text-[#64748B] hover:text-white"
                                    }`}
                                >
                                    {b.toUpperCase()}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => copyCode(bankPayloads[bankTab])}
                            className="text-[#64748B] hover:text-white flex items-center gap-1"
                        >
                            {copied ? <Check size={14} className="text-[#34D399]" /> : <Copy size={14} />}
                        </button>
                    </div>
                    <pre className="p-4 text-xs font-mono text-[#F1F5F9] overflow-x-auto">
                        <code>{bankPayloads[bankTab]}</code>
                    </pre>
                </div>
            </section>

            <section id="integration" className="scroll-mt-28">
                <h2 className="text-2xl font-bold text-white mb-4">How to Send Requests</h2>
                <div className="rounded-xl border border-white/[0.08] bg-[#0A1118] overflow-hidden">
                    <div className="p-3 bg-[#060a0f] border-b border-white/[0.08] flex items-center gap-2 font-mono text-xs">
                        {(["javascript", "python", "go"] as const).map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setLangTab(lang)}
                                className={`px-3 py-1 rounded uppercase font-bold transition-colors ${
                                    langTab === lang ? "bg-[#064e3b] text-[#34D399]" : "text-[#64748B] hover:text-white"
                                }`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                    <pre className="p-4 text-xs font-mono text-[#F1F5F9] overflow-x-auto leading-relaxed">
                        <code>{integrationPayloads[langTab]}</code>
                    </pre>
                </div>
            </section>

            <section id="expected-response" className="scroll-mt-28">
                <h2 className="text-2xl font-bold text-white mb-4">Expected Response</h2>
                <pre className="p-4 rounded-xl bg-[#060a0f] border border-white/[0.08] text-xs font-mono text-[#34D399] overflow-x-auto">
{`{
  "success": true,
  "data": {
    "verified": true,
    "amount": 4000.00,
    "platform": "awash",
    "transaction_id": "-2KCLVVWOY3-4R75E0",
    "verification_fee_etb": 0.50,
    "timestamp": "2026-11-02T11:45:12Z"
  }
}`}
                </pre>
            </section>
        </div>
    );
}

