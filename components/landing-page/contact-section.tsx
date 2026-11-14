"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import ContactInfoPanel from "./contact-info-panel";

export default function ContactSection() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Inquiry received. An integration engineer will respond within 24 hours.");
      setFullName("");
      setEmail("");
      setCompany("");
      setMessage("");
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-28 bg-slate-50 dark:bg-[#070b10] text-slate-900 dark:text-[#f1f5f9] border-t border-slate-200 dark:border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-8 border-b border-slate-200 dark:border-white/[0.07]">
          <div className="max-w-2xl space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#059669] dark:text-[#34d399]">
              Engineering Support
            </p>
            <h2 className="font-sans font-bold text-3xl sm:text-4xl tracking-tight text-slate-950 dark:text-white leading-tight">
              Speak with our integration team.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-[#94a3b8] max-w-md leading-relaxed">
            Need help connecting your checkout, handling high-volume receipt uploads, or configuring webhook endpoints?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-5">
            <ContactInfoPanel />
          </div>

          <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0c1219] p-6 sm:p-8 shadow-sm dark:shadow-none">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-[#94a3b8] block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Abebe Kebede"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#070b10] border border-slate-300 dark:border-white/[0.09] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#475569] focus:outline-none focus:border-[#059669] dark:focus:border-[#10b981] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-[#94a3b8] block">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="abebe@company.et"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#070b10] border border-slate-300 dark:border-white/[0.09] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#475569] focus:outline-none focus:border-[#059669] dark:focus:border-[#10b981] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-[#94a3b8] block">
                  Company / Project Name
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Abyssinia Commerce PLC"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#070b10] border border-slate-300 dark:border-white/[0.09] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#475569] focus:outline-none focus:border-[#059669] dark:focus:border-[#10b981] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-[#94a3b8] block">
                  Integration Details &amp; Monthly Volume *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your tech stack and estimated monthly verification queries..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#070b10] border border-slate-300 dark:border-white/[0.09] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#475569] focus:outline-none focus:border-[#059669] dark:focus:border-[#10b981] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#059669] hover:bg-[#047857] dark:hover:bg-[#10b981] text-white font-sans font-semibold text-sm transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending Request...</span>
                ) : (
                  <>
                    <span>Submit Technical Request</span>
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
