import React from "react";
import { Mail, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";

export default function ContactInfoPanel() {
    return (
        <div className="space-y-6">
            <div className="p-8 rounded-2xl bg-[#0a1118] border border-white/[0.08] shadow-xl space-y-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748b] block">
                    Direct Coordinates
                </span>

                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#060a0f] border border-white/10 flex items-center justify-center text-[#34d399] flex-shrink-0">
                        <Mail size={18} />
                    </div>
                    <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748b] block">
                            Engineering & Sales Inquiries
                        </span>
                        <a href="mailto:jplussince34@gmail.com" className="font-mono text-sm text-white hover:text-[#34d399] transition-colors font-bold">
                            jplussince34@gmail.com
                        </a>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#060a0f] border border-white/10 flex items-center justify-center text-[#34d399] flex-shrink-0">
                        <Phone size={18} />
                    </div>
                    <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748b] block">
                            Direct Telephone
                        </span>
                        <a href="tel:+251962579755" className="font-mono text-sm text-white hover:text-[#34d399] transition-colors font-bold">
                            +251 96 257 9755
                        </a>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#060a0f] border border-white/10 flex items-center justify-center text-[#34d399] flex-shrink-0">
                        <MapPin size={18} />
                    </div>
                    <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748b] block">
                            Registered Office
                        </span>
                        <span className="font-sans text-sm text-[#cbd5e1] font-medium block">
                            Bole Financial District, Addis Ababa, Ethiopia
                        </span>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/[0.06] flex items-center gap-3 text-xs font-mono text-[#64748b]">
                    <Clock size={16} className="text-[#34d399]" />
                    <span>Support Hours: Mon – Fri (08:30 – 17:30 EAT)</span>
                </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#064e3b]/15 border border-[#10b981]/25 flex items-start gap-4">
                <ShieldCheck size={24} className="text-[#34d399] flex-shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-sans font-bold text-sm text-white mb-1">
                        Bank-Grade Cryptographic Guarantee
                    </h4>
                    <p className="text-xs text-[#94a3b8] leading-relaxed">
                        All API transactions are signed with SHA-256 tokens and protected against replay attacks. Zero customer banking credentials are ever logged or stored.
                    </p>
                </div>
            </div>
        </div>
    );
}

