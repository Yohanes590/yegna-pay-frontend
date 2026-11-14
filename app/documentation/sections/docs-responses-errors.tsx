"use client";

import { CheckCircle2, AlertTriangle } from "lucide-react";
import { errorCodeReference } from "../docs-data";

export default function DocsResponsesErrors() {
    return (
        <>
            {/* 8. Expected Response */}
            <section id="expected-response" className="scroll-mt-24 space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-2 flex items-center gap-2">
                        <CheckCircle2 className="text-[#059669] dark:text-[#10B981]" size={22} /> Expected Response
                    </h2>
                    <p className="text-slate-600 dark:text-[#94A3B8] text-sm">
                        Verified requests return HTTP <code className="text-[#059669] dark:text-[#34D399]">200 OK</code> with{" "}
                        <code className="text-[#059669] dark:text-[#34D399]">success: true</code> and{" "}
                        <code className="text-[#059669] dark:text-[#34D399]">transaction_status: &quot;VERIFIED&quot;</code>. When a receipt
                        image is uploaded and persisted, <code className="text-[#059669] dark:text-[#34D399]">receipt_image_url</code> is
                        also included.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-slate-100 dark:bg-[#0c1219] border border-slate-200 dark:border-white/[0.08] p-5 font-mono text-xs overflow-x-auto">
                        <div className="text-[#047857] dark:text-[#34D399] font-bold mb-2">200 OK — Transaction Link</div>
                        <pre className="text-slate-900 dark:text-[#F8FAFC]">{`{
  "status": 200,
  "success": true,
  "transaction_status": "VERIFIED",
  "message": "Transaction Verified Successfully",
  "data": {
    "transaction_id": "FT26063D7W5C11294152",
    "transaction_amount": 4000,
    "created_at": 12,
    "method": "CBE",
    "status": "verified",
    "from": "payer name",
    "to": "MULUGETA KASSAW CLEANING SERVICE",
    "currency": "ETB",
    "risk_score": 98
  }
}`}</pre>
                    </div>

                    <div className="rounded-xl bg-slate-100 dark:bg-[#0c1219] border border-slate-200 dark:border-white/[0.08] p-5 font-mono text-xs overflow-x-auto">
                        <div className="text-[#047857] dark:text-[#34D399] font-bold mb-2">200 OK — Receipt Image Upload</div>
                        <pre className="text-slate-900 dark:text-[#F8FAFC]">{`{
  "status": 200,
  "success": true,
  "transaction_status": "VERIFIED",
  "message": "Transaction Verified Successfully",
  "receipt_image_url": "/api/qr-images/file/clx...",
  "data": {
    "transaction_id": "-2KCLVVWOY3-4R75E0",
    "transaction_amount": 1050,
    "created_at": 12,
    "method": "AWASH",
    "status": "verified",
    "from": "payer name",
    "to": "JOHN DOE ENTERPRISE",
    "currency": "ETB",
    "risk_score": 98,
    "receipt_image_url": "/api/qr-images/file/clx..."
  }
}`}</pre>
                    </div>
                </div>
            </section>

            {/* 9. Error Codes Reference */}
            <section id="error-codes" className="scroll-mt-24 space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-2 flex items-center gap-2">
                        <AlertTriangle className="text-[#059669] dark:text-[#10B981]" size={22} /> Error Codes Reference
                    </h2>
                    <p className="text-slate-600 dark:text-[#94A3B8] text-sm leading-relaxed">
                        Every error response follows a standardized JSON envelope containing{" "}
                        <code className="text-[#059669] dark:text-[#34D399]">status</code>,{" "}
                        <code className="text-[#059669] dark:text-[#34D399]">success: false</code>,{" "}
                        <code className="text-[#059669] dark:text-[#34D399]">message</code>,{" "}
                        <code className="text-[#059669] dark:text-[#34D399]">error_code</code>, and{" "}
                        <code className="text-[#059669] dark:text-[#34D399]">data: null</code>.
                    </p>
                </div>

                <div className="rounded-xl bg-slate-100 dark:bg-[#0c1219] border border-slate-200 dark:border-white/[0.08] p-5 font-mono text-xs overflow-x-auto">
                    <div className="text-[#047857] dark:text-[#34D399] font-bold mb-2">Example Duplicate Transaction Response (409)</div>
                    <pre className="text-slate-900 dark:text-[#F8FAFC]">{`{
  "status": 409,
  "success": false,
  "message": "This transaction has already been verified",
  "error_code": "YP_03DeFg",
  "data": null
}`}</pre>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] overflow-x-auto bg-white dark:bg-[#0c1219]">
                    <table className="w-full text-left font-mono text-xs">
                        <thead className="bg-slate-50 dark:bg-[#070b10] border-b border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-[#64748B] uppercase">
                            <tr>
                                <th className="p-3.5">Error Code</th>
                                <th className="p-3.5">HTTP Status</th>
                                <th className="p-3.5">Error Name</th>
                                <th className="p-3.5">Category</th>
                                <th className="p-3.5">Meaning &amp; Handling</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-white/[0.06] text-slate-700 dark:text-[#cbd5e1]">
                            {errorCodeReference.map((entry) => (
                                <tr key={entry.code}>
                                    <td className="p-3.5 text-[#059669] dark:text-[#34D399] font-bold whitespace-nowrap">{entry.code}</td>
                                    <td className="p-3.5 font-bold">{entry.status}</td>
                                    <td className="p-3.5 text-slate-950 dark:text-white whitespace-nowrap">{entry.name}</td>
                                    <td className="p-3.5 text-slate-500 dark:text-[#94A3B8] whitespace-nowrap">{entry.category}</td>
                                    <td className="p-3.5 font-sans text-xs text-slate-700 dark:text-[#cbd5e1] space-y-1">
                                        <div className="font-semibold text-slate-950 dark:text-white">{entry.meaning}</div>
                                        <div className="text-slate-600 dark:text-[#94A3B8]">{entry.whenItOccurs}</div>
                                        <div className="text-[#047857] dark:text-[#34D399]/90">Action: {entry.handling}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 10. Pipeline & Best Practices */}
            <section id="pipeline" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white mb-4">Verification Pipeline</h2>
                <ol className="space-y-3 font-mono text-xs text-slate-700 dark:text-[#cbd5e1] bg-slate-50 dark:bg-[#0c1219] border border-slate-200 dark:border-white/[0.08] rounded-xl p-5 list-decimal list-inside">
                    <li>Parse either JSON or <code className="text-[#059669] dark:text-[#34D399]">multipart/form-data</code> and validate <code className="text-[#059669] dark:text-[#34D399]">price_amount</code>.</li>
                    <li>If a receipt image was uploaded, decode its QR payload and use the extracted string as the transaction reference/URL.</li>
                    <li>Resolve the target bank (<code className="font-semibold">CBE</code>, <code className="font-semibold">AWASH</code>, <code className="font-semibold">BOA</code>) and normalize the transaction ID.</li>
                    <li>Authenticate the project API key, reject duplicate transaction IDs (<code className="font-semibold">409 YP_03DeFg</code>), and check quota.</li>
                    <li>Fetch the live bank receipt, verify receiver name and exact amount, persist the transaction, and trigger your webhook.</li>
                </ol>
            </section>
        </>
    );
}

