"use client";

import { CheckCircle2, ImageUp, Link2, AlertTriangle, Copy, Check } from "lucide-react";
import { receiptUploadPostmanFields, receiptUploadTextExample, transactionLinkExample } from "../docs-data";

interface DocsVerificationMethodsProps {
    copiedCode: string | null;
    onCopy: (text: string, id: string) => void;
}

export default function DocsVerificationMethods({ copiedCode, onCopy }: DocsVerificationMethodsProps) {
    return (
        <section id="verification-methods" className="scroll-mt-24 space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-2 flex items-center gap-2">
                    <CheckCircle2 className="text-[#059669] dark:text-[#10B981]" size={22} /> Transaction Verification Methods
                </h2>
                <p className="text-slate-600 dark:text-[#94A3B8] text-sm leading-relaxed">
                    Choose either Method A (upload a bank receipt image so the backend decodes its QR code) or Method B
                    (send the bank transaction link directly as JSON).
                </p>
            </div>

            {/* Method A: Receipt Image Upload */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/[0.1] bg-slate-50 dark:bg-[#0c1219] p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2">
                        <ImageUp size={18} className="text-[#059669] dark:text-[#34D399]" />
                        Method A: Verify Using a Receipt Image (QR Code)
                    </h3>
                    <span className="px-2.5 py-1 rounded bg-emerald-50 dark:bg-[#10B981]/15 border border-emerald-200 dark:border-[#10B981]/30 font-mono text-xs text-[#047857] dark:text-[#34D399]">
                        multipart/form-data
                    </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                    Upload the customer&apos;s bank receipt image as <code className="text-[#059669] dark:text-[#34D399]">receipt_image</code>.
                    The backend automatically extracts the QR code content from the image and runs bank-specific
                    verification against the official bank receipt service.
                </p>

                <div>
                    <div className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-[#64748B] mb-2">
                        Postman Form-Data Payload
                    </div>
                    <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] overflow-x-auto bg-white dark:bg-[#070b10]">
                        <table className="w-full text-left font-mono text-xs">
                            <thead className="bg-slate-50 dark:bg-[#070b10] border-b border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-[#64748B] uppercase">
                                <tr>
                                    <th className="p-3">Key</th>
                                    <th className="p-3">Type</th>
                                    <th className="p-3">Value</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-white/[0.06] text-slate-700 dark:text-[#cbd5e1]">
                                {receiptUploadPostmanFields.map((row) => (
                                    <tr key={row.key}>
                                        <td className="p-3 text-[#059669] dark:text-[#34D399] font-bold">{row.key}</td>
                                        <td className="p-3">
                                            <span
                                                className={`px-2 py-0.5 rounded text-[11px] ${
                                                    row.type === "File"
                                                        ? "bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-transparent"
                                                        : "bg-slate-100 text-slate-700 dark:bg-white/5 dark:text-[#cbd5e1]"
                                                }`}
                                            >
                                                {row.type}
                                            </span>
                                        </td>
                                        <td className="p-3 text-slate-900 dark:text-[#F8FAFC]">{row.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <div className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-[#64748B] mb-2">
                        Example Request Body
                    </div>
                    <pre className="p-4 rounded-xl bg-slate-100 dark:bg-[#070b10] border border-slate-200 dark:border-white/[0.08] font-mono text-xs text-slate-900 dark:text-[#F8FAFC] overflow-x-auto">
                        {receiptUploadTextExample}
                    </pre>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/25 flex gap-3 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                    <AlertTriangle size={16} className="flex-shrink-0 mt-0.5 text-amber-600 dark:text-amber-300" />
                    <ul className="space-y-1 list-disc list-inside">
                        <li>
                            <code className="font-semibold">receipt_image</code> must be sent as a <strong>File</strong> (PNG, JPG, or JPEG, max 5 MB), not as a text field.
                        </li>
                        <li>
                            Frontend integrations must build the request with <code className="font-semibold">FormData</code>.
                        </li>
                        <li>
                            <strong>Do NOT manually set the Content-Type header</strong> when sending <code className="font-semibold">FormData</code> — allow the browser to generate the boundary automatically.
                        </li>
                    </ul>
                </div>
            </div>

            {/* Method B: Transaction Link */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/[0.1] bg-slate-50 dark:bg-[#0c1219] p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2">
                        <Link2 size={18} className="text-[#059669] dark:text-[#34D399]" />
                        Method B: Verify Using a Transaction Link
                    </h3>
                    <span className="px-2.5 py-1 rounded bg-emerald-50 dark:bg-[#10B981]/15 border border-emerald-200 dark:border-[#10B981]/30 font-mono text-xs text-[#047857] dark:text-[#34D399]">
                        application/json
                    </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                    Send the bank receipt URL directly inside <code className="text-[#059669] dark:text-[#34D399]">transaction_id</code> as a JSON body with{" "}
                    <code className="text-slate-950 dark:text-white font-semibold">Content-Type: application/json</code> and your{" "}
                    <code className="text-slate-950 dark:text-white font-semibold">Authorization: Bearer &lt;API_KEY&gt;</code> header.
                </p>

                <div className="rounded-xl bg-slate-100 dark:bg-[#070b10] border border-slate-200 dark:border-white/[0.08] overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between">
                        <span className="font-mono text-xs text-slate-500 dark:text-[#64748B]">Example JSON Payload</span>
                        <button
                            type="button"
                            onClick={() => onCopy(transactionLinkExample, "link-json")}
                            className="text-slate-500 hover:text-slate-950 dark:text-[#64748B] dark:hover:text-white inline-flex items-center gap-1 font-mono text-xs"
                        >
                            {copiedCode === "link-json" ? (
                                <>
                                    <Check size={14} className="text-[#059669] dark:text-[#34D399]" /> Copied
                                </>
                            ) : (
                                <>
                                    <Copy size={14} /> Copy
                                </>
                            )}
                        </button>
                    </div>
                    <pre className="p-4 font-mono text-xs text-slate-900 dark:text-[#F8FAFC] overflow-x-auto">
                        {transactionLinkExample}
                    </pre>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 font-mono text-xs text-slate-600 dark:text-[#94A3B8]">
                    <li>
                        • <code className="text-[#059669] dark:text-[#34D399]">transaction_id</code>: Bank receipt URL or reference
                    </li>
                    <li>
                        • <code className="text-[#059669] dark:text-[#34D399]">platform</code>: Bank identifier (CBE, AWASH, BOA)
                    </li>
                    <li>
                        • <code className="text-[#059669] dark:text-[#34D399]">currency</code>: Transaction currency (ETB)
                    </li>
                    <li>
                        • <code className="text-[#059669] dark:text-[#34D399]">price_amount</code>: Expected payment amount
                    </li>
                </ul>
            </div>
        </section>
    );
}

