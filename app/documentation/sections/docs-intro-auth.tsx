"use client";

import { Terminal, Shield, Server, FileCode2, Key, Copy, Check } from "lucide-react";
import { getPublicBackendUrl } from "@/lib/backend-url";
import { TRANSACTION_CREATE_ENDPOINT } from "../docs-data";

interface DocsIntroAuthProps {
    copiedCode: string | null;
    onCopy: (text: string, id: string) => void;
}

export default function DocsIntroAuth({ copiedCode, onCopy }: DocsIntroAuthProps) {
    const backendBaseUrl = getPublicBackendUrl();

    return (
        <>
            {/* 1. Introduction */}
            <section id="introduction" className="scroll-mt-24">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-[#10B981]/10 border border-emerald-200 dark:border-[#10B981]/30 font-mono text-xs text-[#047857] dark:text-[#34D399] mb-4">
                    <Terminal size={14} /> API v1.0 Reference
                </div>
                <h1 className="text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mb-4">
                    Yegna Pay Verification API
                </h1>
                <p className="text-lg text-slate-600 dark:text-[#94A3B8] leading-relaxed mb-6">
                    Verify customer bank transfers across Commercial Bank of Ethiopia (CBE), Awash Bank, and Bank of
                    Abyssinia (BOA) through a single endpoint supporting both QR receipt image uploads and direct
                    bank transaction links.
                </p>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0c1219] border border-slate-200 dark:border-white/[0.08] font-mono text-xs text-slate-700 dark:text-[#cbd5e1] flex flex-wrap items-center justify-between gap-2">
                    <span>
                        Active Base URL (<code className="text-[#059669] dark:text-[#34D399]">NEXT_PUBLIC_BACKEND_URL</code>):{" "}
                        <code className="text-slate-950 dark:text-[#F8FAFC] font-semibold">{backendBaseUrl}</code>
                    </span>
                    <span className="text-slate-500 dark:text-[#64748B]">Protocol: HTTPS / REST</span>
                </div>
            </section>

            {/* 2. Authentication */}
            <section id="authentication" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-2">
                    <Shield className="text-[#059669] dark:text-[#10B981]" size={22} /> Authentication
                </h2>
                <p className="text-slate-600 dark:text-[#94A3B8] text-sm leading-relaxed mb-4">
                    Every verification request must be authenticated with your project secret API key. Pass the key in
                    either the <code className="text-[#059669] dark:text-[#34D399]">Authorization</code> Bearer header or the{" "}
                    <code className="text-[#059669] dark:text-[#34D399]">x-api-key</code> header.
                </p>
                <div className="rounded-xl bg-slate-100 dark:bg-[#0c1219] border border-slate-200 dark:border-white/[0.08] p-4 font-mono text-xs space-y-2 mb-4">
                    <div className="text-slate-800 dark:text-[#cbd5e1]">
                        Authorization: Bearer <span className="text-[#059669] dark:text-[#34D399] font-semibold">YOUR_PROJECT_API_KEY</span>
                    </div>
                    <div className="text-slate-500 dark:text-[#64748B]"># Alternative header:</div>
                    <div className="text-slate-800 dark:text-[#cbd5e1]">
                        x-api-key: <span className="text-[#059669] dark:text-[#34D399] font-semibold">YOUR_PROJECT_API_KEY</span>
                    </div>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-[#064e3b]/20 border border-emerald-200 dark:border-[#10B981]/30 flex gap-3 text-xs text-[#047857] dark:text-[#34D399]">
                    <Key size={16} className="flex-shrink-0 mt-0.5" />
                    <span>
                        Keep your project secret key on your server or protected backend environment. Missing, invalid,
                        or inactive-account keys return <code className="text-slate-950 dark:text-white font-semibold">401 Unauthorized</code>.
                    </span>
                </div>
            </section>

            {/* 3. API Endpoint */}
            <section id="endpoint" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-2">
                    <Server className="text-[#059669] dark:text-[#10B981]" size={22} /> API Endpoint
                </h2>
                <p className="text-slate-600 dark:text-[#94A3B8] text-sm leading-relaxed mb-4">
                    The endpoint URL is dynamically resolved from{" "}
                    <code className="text-[#059669] dark:text-[#34D399]">process.env.NEXT_PUBLIC_BACKEND_URL</code> with trailing slashes
                    normalized to prevent duplicate <code className="text-slate-950 dark:text-white font-semibold">/</code> characters:
                </p>
                <div className="rounded-xl bg-slate-100 dark:bg-[#0c1219] border border-slate-200 dark:border-white/[0.08] p-4 flex items-center justify-between gap-4 font-mono text-xs overflow-x-auto">
                    <div className="flex items-center gap-3 min-w-0">
                        <span className="px-2.5 py-1 rounded bg-emerald-100 text-[#047857] dark:bg-[#10B981]/20 dark:text-[#34D399] font-bold flex-shrink-0">
                            POST
                        </span>
                        <span className="text-slate-900 dark:text-[#34D399] break-all font-medium">{TRANSACTION_CREATE_ENDPOINT}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => onCopy(TRANSACTION_CREATE_ENDPOINT, "endpoint")}
                        className="text-slate-500 hover:text-slate-950 dark:text-[#64748B] dark:hover:text-white flex-shrink-0"
                        title="Copy endpoint URL"
                    >
                        {copiedCode === "endpoint" ? <Check size={16} className="text-[#059669] dark:text-[#34D399]" /> : <Copy size={16} />}
                    </button>
                </div>
                <div className="mt-4 rounded-xl bg-slate-100 dark:bg-[#0c1219] border border-slate-200 dark:border-white/[0.08] p-4 font-mono text-xs text-slate-600 dark:text-[#94A3B8]">
                    <div className="text-slate-500 dark:text-[#64748B] mb-1"># Environment configuration (.env.local / Vercel)</div>
                    <div className="text-slate-900 dark:text-[#F8FAFC] font-medium">
                        NEXT_PUBLIC_BACKEND_URL=https://your-real-backend-domain.com
                    </div>
                </div>
            </section>

            {/* 4. Parameters Schema */}
            <section id="parameters" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-4 flex items-center gap-2">
                    <FileCode2 className="text-[#059669] dark:text-[#10B981]" size={22} /> Parameters Schema
                </h2>
                <p className="text-slate-600 dark:text-[#94A3B8] text-sm leading-relaxed mb-4">
                    Send either a <code className="text-[#059669] dark:text-[#34D399]">multipart/form-data</code> payload containing{" "}
                    <code className="text-[#059669] dark:text-[#34D399]">receipt_image</code> (Method A) or an{" "}
                    <code className="text-[#059669] dark:text-[#34D399]">application/json</code> payload containing{" "}
                    <code className="text-[#059669] dark:text-[#34D399]">transaction_id</code> (Method B).
                </p>
                <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] overflow-x-auto bg-white dark:bg-[#0c1219]">
                    <table className="w-full text-left font-mono text-xs">
                        <thead className="bg-slate-50 dark:bg-[#070b10] border-b border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-[#64748B] uppercase">
                            <tr>
                                <th className="p-4">Field</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Requirement</th>
                                <th className="p-4">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-white/[0.06] text-slate-700 dark:text-[#cbd5e1]">
                            <tr>
                                <td className="p-4 text-[#059669] dark:text-[#34D399] font-bold">price_amount</td>
                                <td className="p-4">number | string</td>
                                <td className="p-4 text-emerald-700 dark:text-emerald-400 font-bold">Required</td>
                                <td className="p-4">Expected payment amount (must be greater than 0). Verified against the bank receipt.</td>
                            </tr>
                            <tr>
                                <td className="p-4 text-[#059669] dark:text-[#34D399] font-bold">receipt_image</td>
                                <td className="p-4">File</td>
                                <td className="p-4 text-amber-700 dark:text-amber-300 font-bold">Method A</td>
                                <td className="p-4">
                                    Original bank receipt image containing a QR code (PNG, JPG, or JPEG, max 5 MB). Must be sent as a file field in{" "}
                                    <code className="text-slate-950 dark:text-white font-semibold">multipart/form-data</code>.
                                </td>
                            </tr>
                            <tr>
                                <td className="p-4 text-[#059669] dark:text-[#34D399] font-bold">transaction_id</td>
                                <td className="p-4">string</td>
                                <td className="p-4 text-amber-700 dark:text-amber-300 font-bold">Method B</td>
                                <td className="p-4">
                                    Bank transaction verification URL (recommended, e.g.{" "}
                                    <code className="text-slate-950 dark:text-white font-semibold">https://apps.cbe.com.et:100/?id=...</code>) or clean bank reference ID.
                                </td>
                            </tr>
                            <tr>
                                <td className="p-4 text-[#059669] dark:text-[#34D399] font-bold">platform</td>
                                <td className="p-4">string</td>
                                <td className="p-4 text-slate-500 dark:text-[#94A3B8]">Recommended</td>
                                <td className="p-4">
                                    Bank identifier (<code className="text-slate-950 dark:text-white font-semibold">CBE</code>,{" "}
                                    <code className="text-slate-950 dark:text-white font-semibold">AWASH</code>,{" "}
                                    <code className="text-slate-950 dark:text-white font-semibold">BOA</code>, case-insensitive). Auto-detected from recognized bank URLs when omitted.
                                </td>
                            </tr>
                            <tr>
                                <td className="p-4 text-[#059669] dark:text-[#34D399] font-bold">full_name</td>
                                <td className="p-4">string</td>
                                <td className="p-4 text-slate-500 dark:text-[#94A3B8]">Optional</td>
                                <td className="p-4">Expected recipient or merchant name for caller context.</td>
                            </tr>
                            <tr>
                                <td className="p-4 text-[#059669] dark:text-[#34D399] font-bold">currency</td>
                                <td className="p-4">string</td>
                                <td className="p-4 text-slate-500 dark:text-[#94A3B8]">Optional</td>
                                <td className="p-4">Transaction currency code (defaults to <code className="text-slate-950 dark:text-white font-semibold">&quot;ETB&quot;</code>).</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}

