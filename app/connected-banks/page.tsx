"use client";

import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/landing-page/nav-bar";
import Footer from "@/components/landing-page/footer";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import BankFeatureGrid from "./bank-feature-grid";

const banks = [
    {
        name: "Commercial Bank of Ethiopia",
        logo: "/banks/CBE.png",
        status: "Operational",
        latency: "165ms",
        features: ["Direct Integration", "Instant Verification", "Telebirr Gateway"],
    },
    {
        name: "Bank of Abyssinia",
        logo: "/banks/abs.png",
        status: "Operational",
        latency: "172ms",
        features: ["Virtual Ledger", "Instant Verification", "Webhooks Active"],
    },
    {
        name: "Awash Bank",
        logo: "/banks/awash.png",
        status: "Operational",
        latency: "180ms",
        features: ["Direct Integration", "Instant Verification", "High Volume Ready"],
    },
    {
        name: "Bank of Africa",
        logo: "/banks/boa.svg",
        status: "Operational",
        latency: "210ms",
        features: ["Institutional Node", "Enterprise Matching", "Unified JSON"],
    },
];

export default function ConnectedBanksPage() {
    return (
        <main className="min-h-screen bg-[#060a0f] text-[#F8FAFC] selection:bg-[#10B981]/30 overflow-hidden">
            <NavBar />

            <section className="relative pt-36 pb-20 px-6 max-w-7xl mx-auto z-10 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#34D399] text-xs font-mono uppercase tracking-widest mb-8">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                    Direct Banking Infrastructure Rails
                </div>

                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white max-w-4xl mb-6">
                    Real-time verification for Ethiopia's leading banks.
                </h1>
                <p className="text-lg text-[#94A3B8] max-w-2xl leading-relaxed font-normal mb-12">
                    Connect once to Yegna Pay. We handle the direct ledger cross-referencing and fraud prevention across every major banking network in Ethiopia.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-left mb-28">
                    {banks.map((bank, index) => (
                        <div
                            key={index}
                            className="bg-[#0A1118] border border-white/[0.08] hover:border-[#10B981]/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <div className="w-14 h-14 rounded-xl bg-[#060a0f] border border-white/10 p-2.5 flex items-center justify-center">
                                        <Image src={bank.logo} alt={bank.name} width={44} height={44} className="object-contain" />
                                    </div>
                                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-[#10B981]/10 text-[#34D399] border border-[#10B981]/25">
                                        {bank.status}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">{bank.name}</h3>
                                <p className="text-xs font-mono text-[#64748B] mb-6">Median Latency: {bank.latency}</p>
                                <ul className="space-y-2 mb-6">
                                    {bank.features.map((feat, fidx) => (
                                        <li key={fidx} className="flex items-center gap-2 text-xs text-[#94A3B8] font-mono">
                                            <CheckCircle2 size={13} className="text-[#34D399]" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-[11px] text-[#64748B]">
                                <span>SSL Encrypted</span>
                                <span className="text-[#34D399]">Direct Rail</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full text-left mb-20">
                    <div className="mb-12">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#34D399] font-bold block mb-2">Engine Architecture</span>
                        <h2 className="text-3xl font-black text-white">Cryptographic Verification Pipeline</h2>
                    </div>
                    <BankFeatureGrid />
                </div>

                <div className="w-full bg-[#0A1118] border border-white/[0.1] rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-left">
                        <h3 className="text-2xl font-bold text-white">Start integrating Ethiopian bank rails today</h3>
                        <p className="text-sm text-[#94A3B8] mt-1 font-mono">200 free verification queries included in standard developer account</p>
                    </div>
                    <Link
                        href="/sign-up"
                        className="px-8 py-3.5 rounded-lg bg-[#059669] hover:bg-[#10B981] text-white font-sans text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-all shadow-lg"
                    >
                        <span>Start Building</span>
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
