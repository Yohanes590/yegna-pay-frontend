"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePublicConfig } from "@/lib/hooks/use-public-config";

export default function LongFooter() {
  const { requestCurrency, currency } = usePublicConfig();
  const [eatTime, setEatTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Addis_Ababa",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setEatTime(formatter.format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#070b10] text-slate-600 dark:text-[#94a3b8] border-t border-slate-200 dark:border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200 dark:border-white/[0.07]">
          {/* Brand */}
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-lg bg-[#059669] flex items-center justify-center text-white font-mono font-bold text-xs">
                YP
              </div>
              <span className="font-sans font-bold text-base tracking-tight text-slate-950 dark:text-white">
                Yegna Pay
              </span>
            </Link>

            <p className="text-sm text-slate-600 dark:text-[#94a3b8] max-w-sm leading-relaxed">
              Automated Ethiopian bank payment verification API for Commercial Bank of Ethiopia, Awash Bank, and Bank of Abyssinia.
            </p>

            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-[#0c1219] border border-slate-200 dark:border-white/[0.07] font-mono text-xs tabular-nums">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              <span className="text-slate-500 dark:text-[#64748b]">Addis Ababa (EAT)</span>
              <span className="text-slate-950 dark:text-white font-medium">{eatTime || "--:--:--"}</span>
            </div>
          </div>

          {/* Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-3.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-950 dark:text-white block">
                Product
              </span>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/#bank-infrastructure" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                    Supported Banks
                  </Link>
                </li>
                <li>
                  <Link href="/#how-it-works" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/#product-showcase" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                    Live Console
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-950 dark:text-white block">
                Developers
              </span>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/documentation" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                    API Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/documentation#error-codes" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                    Error Codes (YP_*)
                  </Link>
                </li>
                <li>
                  <Link href="/connected-banks" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                    Bank Endpoints
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                    Engineering Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-950 dark:text-white block">
                Account
              </span>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/sign-in" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/sign-up" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                    Create Account
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500 dark:text-[#64748b]">
          <div>
            CBE · Awash Bank · Bank of Abyssinia · {requestCurrency.toFixed(2)} {currency} / verification
          </div>
          <div>
            © {currentYear} Yegna Pay. Addis Ababa, Ethiopia.
          </div>
        </div>
      </div>
    </footer>
  );
}
