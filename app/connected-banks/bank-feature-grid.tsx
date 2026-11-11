"use client";

import { ShieldCheck, SearchCheck, Users, Banknote, DatabaseZap, Activity } from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "Transaction Verification",
        desc: "Instantly cross-check transfer signatures across native banking core infrastructure to cryptographically confirm payments.",
    },
    {
        icon: SearchCheck,
        title: "Duplicate Detection",
        desc: "Prevents double-spending attacks by logging absolute transaction history and rejecting any replayed receipt sequences.",
    },
    {
        icon: Users,
        title: "Payer Verification",
        desc: "Mitigate identity fraud by guaranteeing that the individual listed on the receipt matches the transferring account holder.",
    },
    {
        icon: Banknote,
        title: "Amount Validation",
        desc: "Secures your cart by confirming the transferred amount matches the expected API payload to the exact decimal.",
    },
    {
        icon: DatabaseZap,
        title: "Real-Time Pipeline",
        desc: "No scraping, no polling. Our servers constantly sync with central banking APIs to resolve your verifications sub-second.",
    },
    {
        icon: Activity,
        title: "Fraud Detection Heuristics",
        desc: "Advanced scoring models in real time to isolate manipulated or synthetic transfer payloads.",
    },
];

export default function BankFeatureGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                    <div
                        key={idx}
                        className="p-8 rounded-2xl bg-[#0F172A]/50 border border-[#1E293B] hover:border-[#10B981]/40 transition-colors group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#34D399] mb-6">
                            <Icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-[#F8FAFC] mb-3 group-hover:text-[#34D399] transition-colors">
                            {feature.title}
                        </h3>
                        <p className="text-[#94A3B8] text-sm leading-relaxed font-medium">
                            {feature.desc}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

