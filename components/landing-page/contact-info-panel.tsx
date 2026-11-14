import React from "react";
import { Mail, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";

export default function ContactInfoPanel() {
  return (
    <div className="space-y-5">
      <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0c1219] border border-slate-200 dark:border-white/[0.08] space-y-5 shadow-sm dark:shadow-none">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-[#64748b] block">
          Direct Contact
        </span>

        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-slate-50 dark:bg-[#070b10] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center text-[#059669] dark:text-[#34d399] shrink-0">
            <Mail size={16} />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-[#64748b] block">
              Engineering &amp; Sales
            </span>
            <a
              href="mailto:jplussince34@gmail.com"
              className="font-mono text-sm text-slate-900 dark:text-white hover:text-[#059669] dark:hover:text-[#34d399] transition-colors font-medium"
            >
              jplussince34@gmail.com
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-slate-50 dark:bg-[#070b10] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center text-[#059669] dark:text-[#34d399] shrink-0">
            <Phone size={16} />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-[#64748b] block">
              Telephone
            </span>
            <a
              href="tel:+251962579755"
              className="font-mono text-sm text-slate-900 dark:text-white hover:text-[#059669] dark:hover:text-[#34d399] transition-colors font-medium"
            >
              +251 96 257 9755
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-slate-50 dark:bg-[#070b10] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center text-[#059669] dark:text-[#34d399] shrink-0">
            <MapPin size={16} />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-[#64748b] block">
              Office
            </span>
            <span className="font-sans text-sm text-slate-700 dark:text-[#cbd5e1]">
              Bole Financial District, Addis Ababa, Ethiopia
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-white/[0.06] flex items-center gap-2.5 text-xs font-mono text-slate-600 dark:text-[#94a3b8]">
          <Clock size={14} className="text-[#059669] dark:text-[#34d399]" />
          <span>Mon – Fri · 08:30 – 17:30 EAT</span>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-[#0c1219] border border-emerald-200 dark:border-[#10b981]/20 flex items-start gap-3.5">
        <ShieldCheck size={20} className="text-[#059669] dark:text-[#34d399] shrink-0 mt-0.5" />
        <div>
          <h4 className="font-sans font-semibold text-sm text-slate-950 dark:text-white mb-1">
            Zero Credential Storage
          </h4>
          <p className="text-xs text-slate-600 dark:text-[#94a3b8] leading-relaxed">
            Yegna Pay verifies public bank receipt references and uploaded QR receipts—we never request or store customer banking passwords or PINs.
          </p>
        </div>
      </div>
    </div>
  );
}
