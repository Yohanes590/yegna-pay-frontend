"use client";

import { ShieldCheck, SearchCheck, Users, Banknote, DatabaseZap, Activity } from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "Transaction Verification",
        desc: "Verify payment references directly against supported bank receipt portals for CBE, Awash Bank, and Bank of Abyssinia.",
    },
    {
        icon: SearchCheck,
        title: "Duplicate Detection",
        desc: "Prevents double-spending attacks by enforcing unique transaction references and returning HTTP 409 YP_03DeFg on replay.",
    },
    {
        icon: Users,
        title: "Receiver Verification",
        desc: "Normalizes recipient names and checks that the transfer destination matches your configured merchant account.",
    },
    {
        icon: Banknote,
        title: "Amount Validation",
        desc: "Confirms the transferred amount on the official bank receipt matches the expected price_amount in your API request.",
    },
    {
        icon: DatabaseZap,
        title: "QR Receipt Extraction",
        desc: "Accepts uploaded receipt images via multipart/form-data, decodes the QR payload, and archives compressed receipts cleanly.",
    },
    {
        icon: Activity,
        title: "Standardized Error Registry",
        desc: "Returns consistent YP_* error codes for missing fields, invalid amounts, duplicate transactions, and upstream bank failures.",
    },
];

export default function BankFeatureGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                    <div
                        key={idx}
                        className="p-7 rounded-2xl bg-slate-50/70 dark:bg-[#0c1219] border border-slate-200 dark:border-white/[0.08] hover:border-[#059669]/40 dark:hover:border-[#10b981]/40 transition-colors group"
                    >
                        <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-[#10b981]/10 border border-emerald-200 dark:border-[#10b981]/20 flex items-center justify-center text-[#059669] dark:text-[#34d399] mb-5">
                            <Icon size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2 group-hover:text-[#059669] dark:group-hover:text-[#34d399] transition-colors">
                            {feature.title}
                        </h3>
                        <p className="text-slate-600 dark:text-[#94a3b8] text-sm leading-relaxed">
                            {feature.desc}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
