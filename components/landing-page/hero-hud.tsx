"use client";

import React, { useState } from "react";
import { CheckCircle2, ImageUp, Link2, ShieldCheck } from "lucide-react";

export default function HeroHud() {
    const [method, setMethod] = useState<"link" | "receipt">("link");
    const [outcome, setOutcome] = useState<"verified" | "duplicate">("verified");

    return (
        <div className="rounded-xl border border-white/[0.1] bg-[#0c1219] overflow-hidden shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)]">
            {/* Top Bar */}
            <div className="px-4 py-3 bg-[#070b10] border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-mono text-xs text-[#cbd5e1]">
                    <span className="px-2 py-0.5 rounded bg-[#064e3b] text-[#34d399] font-semibold">POST</span>
                    <span>/api/transaction-create</span>
                </div>

                <div className="flex items-center gap-1 bg-white/[0.04] p-0.5 rounded-md font-mono text-[11px]">
                    <button
                        type="button"
                        onClick={() => setMethod("link")}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
                            method === "link"
                                ? "bg-[#064e3b] text-[#34d399] font-semibold"
                                : "text-[#94a3b8] hover:text-white"
                        }`}
                    >
                        <Link2 size={12} />
                        <span>Transaction Link</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setMethod("receipt")}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
                            method === "receipt"
                                ? "bg-[#064e3b] text-[#34d399] font-semibold"
                                : "text-[#94a3b8] hover:text-white"
                        }`}
                    >
                        <ImageUp size={12} />
                        <span>QR Receipt</span>
                    </button>
                </div>
            </div>

            {/* Request Block */}
            <div className="p-4 sm:p-5 border-b border-white/[0.08]">
                <div className="flex items-center justify-between mb-2.5 font-mono text-[11px] text-[#64748b]">
                    <span>
                        {method === "link"
                            ? "Content-Type: application/json"
                            : "Content-Type: multipart/form-data (FormData)"}
                    </span>
                    <span className="text-[#94a3b8]">Authorization: Bearer yegna_live_...</span>
                </div>

                {method === "link" ? (
                    <pre className="p-3.5 rounded-lg bg-[#070b10] border border-white/[0.06] font-mono text-xs text-[#e2e8f0] overflow-x-auto leading-relaxed">
{`{
  "full_name": "MULUGETA KASSAW CLEANING SERVICE",
  "price_amount": "4000",
  "platform": "cbe",
  "currency": "ETB",
  "transaction_id": "https://apps.cbe.com.et:100/?id=FT26063D7W5C11294152"
}`}
                    </pre>
                ) : (
                    <div className="p-3.5 rounded-lg bg-[#070b10] border border-white/[0.06] font-mono text-xs text-[#e2e8f0] space-y-1.5">
                        <div className="flex justify-between gap-4">
                            <span className="text-[#94a3b8]">full_name</span>
                            <span>JOHN DOE ENTERPRISE</span>
                        </div>
                        <div className="flex justify-between gap-4">
                            <span className="text-[#94a3b8]">platform / currency</span>
                            <span>AWASH / ETB</span>
                        </div>
                        <div className="flex justify-between gap-4">
                            <span className="text-[#94a3b8]">price_amount</span>
                            <span>1050</span>
                        </div>
                        <div className="flex justify-between gap-4 pt-1 border-t border-white/[0.06]">
                            <span className="text-[#34d399]">receipt_image (File)</span>
                            <span className="text-[#cbd5e1]">bank-receipt.png (QR decoded)</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Response Preview */}
            <div className="p-4 sm:p-5 bg-[#090e15]">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 font-mono text-xs">
                        {outcome === "verified" ? (
                            <span className="inline-flex items-center gap-1.5 text-[#34d399] font-semibold">
                                <CheckCircle2 size={14} />
                                <span>200 OK — Verified</span>
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 text-amber-300 font-semibold">
                                <ShieldCheck size={14} />
                                <span>409 Conflict — Replay Blocked</span>
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-1 font-mono text-[11px]">
                        <button
                            type="button"
                            onClick={() => setOutcome("verified")}
                            className={`px-2 py-0.5 rounded transition-colors ${
                                outcome === "verified"
                                    ? "bg-white/10 text-white"
                                    : "text-[#64748b] hover:text-[#cbd5e1]"
                            }`}
                        >
                            200 OK
                        </button>
                        <button
                            type="button"
                            onClick={() => setOutcome("duplicate")}
                            className={`px-2 py-0.5 rounded transition-colors ${
                                outcome === "duplicate"
                                    ? "bg-white/10 text-white"
                                    : "text-[#64748b] hover:text-[#cbd5e1]"
                            }`}
                        >
                            409 Duplicate
                        </button>
                    </div>
                </div>

                {outcome === "verified" ? (
                    <pre className="p-3.5 rounded-lg bg-[#070b10] border border-white/[0.06] font-mono text-xs text-[#cbd5e1] overflow-x-auto leading-relaxed">
{`{
  "status": 200,
  "success": true,
  "transaction_status": "VERIFIED",
  "message": "Transaction Verified Successfully",
  "data": {
    "transaction_id": "${method === "link" ? "FT26063D7W5C11294152" : "-2KCLVVWOY3-4R75E0"}",
    "transaction_amount": ${method === "link" ? 4000 : 1050},
    "method": "${method === "link" ? "CBE" : "AWASH"}",
    "status": "verified",
    "currency": "ETB"
  }
}`}
                    </pre>
                ) : (
                    <pre className="p-3.5 rounded-lg bg-[#070b10] border border-amber-500/20 font-mono text-xs text-amber-200/90 overflow-x-auto leading-relaxed">
{`{
  "status": 409,
  "success": false,
  "message": "This transaction has already been verified",
  "error_code": "YP_03DeFg",
  "data": null
}`}
                    </pre>
                )}
            </div>
        </div>
    );
}
