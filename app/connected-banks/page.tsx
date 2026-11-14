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
    code: "CBE",
    logo: "/banks/CBE.png",
    endpoint: "apps.cbe.com.et",
    features: [
      "Transaction Link Verification",
      "QR Receipt Image Extraction",
      "Amount & Receiver Validation",
    ],
  },
  {
    name: "Awash Bank",
    code: "AWASH",
    logo: "/banks/awash.png",
    endpoint: "awashpay.awashbank.com:8225",
    features: [
      "Transaction Link Verification",
      "QR Receipt Image Extraction",
      "Duplicate Replay Protection",
    ],
  },
  {
    name: "Bank of Abyssinia",
    code: "BOA",
    logo: "/banks/abs.png",
    endpoint: "cs.bankofabyssinia.com",
    features: [
      "Transaction Link Verification",
      "QR Receipt Image Extraction",
      "Unified JSON & Webhook Output",
    ],
  },
];

export default function ConnectedBanksPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#070b10] text-slate-900 dark:text-[#f1f5f9] selection:bg-[#10b981]/25 overflow-x-hidden">
      <NavBar />

      <section className="relative pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12 space-y-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#059669] dark:text-[#34d399]">
            Supported Bank Integrations
          </p>
          <h1 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white leading-tight">
            Direct verification across Ethiopia&apos;s 3 core banks.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-[#94a3b8] leading-relaxed">
            Connect once to <code className="font-mono text-sm text-slate-900 dark:text-[#e2e8f0]">POST /api/transaction-create</code>. Yegna Pay normalizes bank receipt portals and QR payloads across CBE, Awash Bank, and Bank of Abyssinia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left mb-20">
          {banks.map((bank) => (
            <div
              key={bank.code}
              className="bg-slate-50/70 dark:bg-[#0c1219] border border-slate-200 dark:border-white/[0.08] hover:border-[#059669]/50 dark:hover:border-[#10b981]/35 rounded-2xl p-6 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 dark:border-white/10 p-2 flex items-center justify-center">
                    <Image
                      src={bank.logo}
                      alt={bank.name}
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-emerald-50 text-[#047857] border border-emerald-200 dark:bg-[#059669]/15 dark:text-[#34d399] dark:border-[#10b981]/25">
                    {bank.code}
                  </span>
                </div>
                <h2 className="font-sans text-lg font-bold text-slate-950 dark:text-white mb-1">
                  {bank.name}
                </h2>
                <p className="text-xs font-mono text-slate-500 dark:text-[#64748b] mb-6">
                  Portal: {bank.endpoint}
                </p>
                <ul className="space-y-2.5 mb-6">
                  {bank.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-[#cbd5e1]"
                    >
                      <CheckCircle2 size={14} className="text-[#059669] dark:text-[#34d399] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between font-mono text-[11px] text-slate-500 dark:text-[#64748b]">
                <span>TLS 1.3</span>
                <span className="text-[#059669] dark:text-[#34d399]">Link &amp; QR Supported</span>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full text-left mb-16">
          <div className="mb-8 space-y-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#059669] dark:text-[#34d399] block">
              Verification Architecture
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white">
              How every receipt is validated
            </h2>
          </div>
          <BankFeatureGrid />
        </div>

        <div className="w-full bg-slate-50 dark:bg-[#0c1219] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="font-sans text-2xl font-bold text-slate-950 dark:text-white">
              Start verifying bank payments today
            </h3>
            <p className="text-sm text-slate-600 dark:text-[#94a3b8] mt-1 font-mono">
              200 free verification queries included when you create a workspace
            </p>
          </div>
          <Link
            href="/sign-up"
            className="px-6 py-3 rounded-lg bg-[#059669] hover:bg-[#047857] dark:hover:bg-[#10b981] text-white font-sans text-sm font-semibold inline-flex items-center gap-2 transition-colors shrink-0"
          >
            <span>Create Account</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
