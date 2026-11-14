"use client";

import React from "react";

const steps = [
    {
        step: "01",
        title: "Submit Receipt or Link",
        detail: "Your application posts either a receipt image containing a bank QR code (multipart/form-data) or the bank receipt URL (application/json) along with the expected amount.",
        meta: "FormData or JSON",
    },
    {
        step: "02",
        title: "Extract QR & Query Bank",
        detail: "When a receipt image is uploaded, Yegna Pay decodes the embedded QR payload, validates the bank domain, and fetches the live official bank receipt.",
        meta: "CBE · Awash · BOA",
    },
    {
        step: "03",
        title: "Match Amount, Receiver & Uniqueness",
        detail: "The engine compares the transferred amount, normalized recipient name, and payment date against your project rules while enforcing database-level transaction_id uniqueness.",
        meta: "409 YP_03DeFg on Replay",
    },
    {
        step: "04",
        title: "Persist Audit & Trigger Webhook",
        detail: "Verified payments are recorded in your project ledger, receipt images are stored cleanly, and your configured webhook URL receives the verified transaction payload.",
        meta: "200 OK + Callback",
    },
];

export default function HowItWorks() {
    return (
        <section
            id="how-it-works"
            className="py-20 sm:py-28 bg-white dark:bg-[#070b10] text-slate-900 dark:text-[#f1f5f9] border-b border-slate-200 dark:border-white/[0.07]"
        >
            <div className="max-w-7xl mx-auto px-5 sm:px-8">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
                    <div className="max-w-2xl">
                        <span className="font-mono text-xs text-[#059669] dark:text-[#34d399] uppercase tracking-wider block mb-3">
                            How Yegna Pay Works
                        </span>
                        <h2 className="font-sans font-bold text-3xl sm:text-4xl tracking-tight text-slate-950 dark:text-white">
                            From customer transfer to confirmed settlement.
                        </h2>
                    </div>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-[#94a3b8] max-w-md leading-relaxed">
                        Both QR receipt uploads and direct transaction links pass through the same deterministic
                        verification pipeline.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-slate-200 dark:border-white/[0.08] rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-white/[0.08] bg-slate-50/70 dark:bg-[#0c1219]">
                    {steps.map((item) => (
                        <div key={item.step} className="p-6 sm:p-7 flex flex-col justify-between gap-6">
                            <div>
                                <div className="flex items-center justify-between mb-5">
                                    <span className="font-mono text-xs font-bold text-[#059669] dark:text-[#34d399]">{item.step}</span>
                                    <span className="font-mono text-[11px] text-slate-500 dark:text-[#64748b]">{item.meta}</span>
                                </div>
                                <h3 className="font-sans font-semibold text-base text-slate-950 dark:text-white mb-2.5">{item.title}</h3>
                                <p className="text-sm text-slate-600 dark:text-[#94a3b8] leading-relaxed">{item.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
