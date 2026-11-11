"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import DevEditor from "./dev-editor";

export default function DeveloperExperience() {
    return (
        <section id="developer-api" className="relative py-28 sm:py-36 bg-[#060a0f] text-[#f1f5f9] border-b border-white/[0.06] overflow-hidden">
            <div className="absolute inset-0 bg-grid-architectural opacity-30 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/[0.08]">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[#34d399] mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                            <span>Developer Infrastructure // API Specification</span>
                        </div>
                        <h2 className="font-sans font-black text-3xl sm:text-5xl tracking-tight text-white leading-tight">
                            Integrate in an afternoon.<br />
                            Verify forever.
                        </h2>
                    </div>
                    <p className="text-sm sm:text-base text-[#94a3b8] max-w-md leading-relaxed font-normal">
                        A single canonical POST endpoint replaces thousands of lines of fragile parsing and human manual checking.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
                    <div className="lg:col-span-5 space-y-6">
                        <div className="p-8 rounded-2xl bg-[#0a1118] border border-white/[0.1] shadow-xl">
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#34d399] block mb-3">
                                Three Simple Steps
                            </span>
                            <h3 className="font-sans font-bold text-xl text-white mb-6">
                                How the verification pipeline executes
                            </h3>

                            <div className="space-y-6 font-mono text-xs">
                                <div className="flex items-start gap-4">
                                    <div className="w-7 h-7 rounded-lg bg-[#064e3b] border border-[#10b981]/40 flex items-center justify-center font-bold text-[#34d399] flex-shrink-0">1</div>
                                    <div>
                                        <h4 className="font-bold text-white uppercase text-xs">Dispatch Inbound Payload</h4>
                                        <p className="font-sans text-xs text-[#94a3b8] mt-1 leading-relaxed">
                                            Send the customer reference code, amount, and bank platform to our verified endpoint.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-7 h-7 rounded-lg bg-[#064e3b] border border-[#10b981]/40 flex items-center justify-center font-bold text-[#34d399] flex-shrink-0">2</div>
                                    <div>
                                        <h4 className="font-bold text-white uppercase text-xs">Bank Core Cross-Check</h4>
                                        <p className="font-sans text-xs text-[#94a3b8] mt-1 leading-relaxed">
                                            Yegna Pay queries the native banking core ledger and calculates an anti-replay cryptographic hash.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-7 h-7 rounded-lg bg-[#064e3b] border border-[#10b981]/40 flex items-center justify-center font-bold text-[#34d399] flex-shrink-0">3</div>
                                    <div>
                                        <h4 className="font-bold text-white uppercase text-xs">Programmatic Settlement</h4>
                                        <p className="font-sans text-xs text-[#94a3b8] mt-1 leading-relaxed">
                                            Receive an instant JSON response with <code className="text-[#34d399]">verified: true</code> in under 200ms.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between">
                                <span className="font-mono text-xs text-[#64748b]">Ready to inspect full schemas?</span>
                                <Link
                                    href="/documentation"
                                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#34d399] hover:text-[#6ee7b7] uppercase tracking-wider"
                                >
                                    <span>Read Full Docs</span>
                                    <ArrowUpRight size={14} />
                                </Link>
                            </div>
                        </div>

                        <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0a1118] aspect-[16/10] shadow-xl">
                            <Image
                                src="/assets/workspace-laptop-closeup.jpg"
                                alt="Developer workstation closeup showing verified Ethiopian banking logs on screen"
                                fill
                                className="object-cover object-center filter brightness-90 contrast-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#060a0f] via-transparent to-transparent opacity-80" />
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[11px] text-[#e2e8f0]">
                                <span className="bg-[#060a0f]/80 px-2.5 py-1 rounded border border-white/10 backdrop-blur">
                                    Production API Telemetry // 180ms
                                </span>
                                <span className="text-[#34d399] font-bold">0.5 ETB / query</span>
                            </div>
                        </div>
                    </div>

                    <DevEditor />
                </div>
            </div>
        </section>
    );
}
