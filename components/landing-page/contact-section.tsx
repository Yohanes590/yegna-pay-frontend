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
        <section id="contact" className="relative py-28 sm:py-36 bg-[#060a0f] text-[#f1f5f9] border-b border-white/[0.06] overflow-hidden">
            <div className="absolute inset-0 bg-grid-architectural opacity-30 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/[0.08]">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[#34d399] mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                            <span>Engineering Support // Addis Ababa HQ</span>
                        </div>
                        <h2 className="font-sans font-black text-3xl sm:text-5xl tracking-tight text-white leading-tight">
                            Speak with our<br />
                            integration engineers.
                        </h2>
                    </div>
                    <p className="text-sm sm:text-base text-[#94a3b8] max-w-md leading-relaxed font-normal">
                        Have custom high-volume requirements or need technical guidance connecting your core banking workflows?
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-5">
                        <ContactInfoPanel />
                    </div>

                    <div className="lg:col-span-7 rounded-2xl border border-white/[0.1] bg-[#0a1118] p-8 sm:p-10 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-mono uppercase tracking-wider text-[#64748b]">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="e.g. Dawit Bekele"
                                        className="w-full px-4 py-3 rounded-lg bg-[#060a0f] border border-white/10 text-sm text-white focus:outline-none focus:border-[#10b981] font-mono transition-colors"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-mono uppercase tracking-wider text-[#64748b]">
                                        Work Email *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="dawit@company.et"
                                        className="w-full px-4 py-3 rounded-lg bg-[#060a0f] border border-white/10 text-sm text-white focus:outline-none focus:border-[#10b981] font-mono transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-wider text-[#64748b]">
                                    Company / Project Name
                                </label>
                                <input
                                    type="text"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    placeholder="e.g. Abyssinia Commerce PLC"
                                    className="w-full px-4 py-3 rounded-lg bg-[#060a0f] border border-white/10 text-sm text-white focus:outline-none focus:border-[#10b981] font-mono transition-colors"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-wider text-[#64748b]">
                                    Integration Details & Monthly Volume
                                </label>
                                <textarea
                                    rows={4}
                                    required
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Describe your tech stack and estimated monthly verification queries..."
                                    className="w-full px-4 py-3 rounded-lg bg-[#060a0f] border border-white/10 text-sm text-white focus:outline-none focus:border-[#10b981] font-mono transition-colors resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-[#059669] hover:bg-[#10b981] text-white font-sans font-bold text-xs uppercase tracking-widest transition-all shadow-lg border border-[#34d399]/40 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <span>Dispatching Message...</span>
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
