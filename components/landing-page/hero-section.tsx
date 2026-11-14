"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default function HeroSectionRender() {
    return (
        <section className="relative w-full min-h-[600px] sm:min-h-[660px] lg:min-h-[760px] flex items-center pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28 bg-slate-50 dark:bg-[#070b10] text-slate-900 dark:text-[#f1f5f9] border-b border-slate-200 dark:border-white/[0.07] overflow-hidden">
            {/* Full-bleed Cinematic Background Image */}
            <Image
                src="/assets/hero-laptop-workspace.jpg"
                alt="Yegna Pay fintech workspace"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[68%_center] sm:object-[60%_center] lg:object-center select-none pointer-events-none"
            />

            {/* Directional Readability Overlays (Light & Dark) */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-white/92 via-white/84 to-white/94 lg:bg-gradient-to-r lg:from-white/96 lg:via-white/82 lg:to-white/25 dark:from-[#070b10]/70 dark:via-[#070b10]/65 dark:to-[#070b10]/90 lg:dark:bg-gradient-to-r lg:dark:from-[#070b10]/92 lg:dark:via-[#070b10]/68 lg:dark:to-[#070b10]/20 pointer-events-none"
            />
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40 dark:from-[#070b10] dark:via-transparent dark:to-[#070b10]/45 pointer-events-none"
            />

            {/* Hero Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8">
                <div className="max-w-2xl space-y-6 sm:space-y-7">
                    <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-[56px] tracking-[-0.03em] text-slate-950 dark:text-white leading-[1.08]">
                        Verify Ethiopian bank transfers in one API call.
                    </h1>

                    <p className="text-base sm:text-lg text-slate-700 dark:text-[#cbd5e1] leading-relaxed max-w-xl">
                        Confirm customer payments across Commercial Bank of Ethiopia, Awash Bank, and Bank of Abyssinia
                        using either a bank transaction link or an uploaded QR receipt image—with built-in amount
                        matching and duplicate replay protection.
                    </p>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                        <Link
                            href="/sign-up"
                            className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg bg-[#059669] hover:bg-[#047857] dark:hover:bg-[#10b981] text-white font-semibold text-sm transition-colors shadow-lg shadow-[#059669]/20"
                        >
                            <span>Get Started</span>
                            <ArrowRight size={16} />
                        </Link>

                        <Link
                            href="/documentation"
                            className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg bg-white/90 hover:bg-white dark:bg-[#0c1219]/80 dark:hover:bg-[#111923] text-slate-900 dark:text-[#f1f5f9] dark:hover:text-white font-medium text-sm border border-slate-300 dark:border-white/[0.14] backdrop-blur-sm transition-colors"
                        >
                            <BookOpen size={16} className="text-[#059669] dark:text-[#34d399]" />
                            <span>API Documentation</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
