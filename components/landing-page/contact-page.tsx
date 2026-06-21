"use client"
import { Mail, Phone, MapPin, Send, Clock, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';
export default function ContactPage() {


    return (
        <section className="bg-[#020617] font-sans text-[#F8FAFC] py-32 px-6 border-t border-[#1E293B] relative">

            {/* Subtle glow effect behind form */}
            <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-[#10B981]/5 blur-[120px] mix-blend-screen pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto text-center mb-20 relative z-10"
            >
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/20 text-[#34D399] mb-6 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    <Headphones size={24} />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-[#F8FAFC] mb-6 tracking-tight">
                    Get in touch
                </h1>
                <p className="text-lg text-[#94A3B8] leading-relaxed max-w-2xl mx-auto font-medium">
                    Have questions about enterprise integration? We're here to help build your next-gen payment verification flow.
                </p>
            </motion.div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-4 space-y-4"
                    >
                        <div className="flex items-center p-6 bg-[#0F172A] rounded-2xl border border-[#1E293B] hover:border-[#334155] transition-colors shadow-sm">
                            <div className="w-12 h-12 bg-[#020617] rounded-xl flex items-center justify-center text-[#94A3B8] mr-5 border border-[#1E293B] shadow-sm">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-1">Email</p>
                                <p className="text-sm font-bold text-[#F8FAFC]">jplussince34@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex items-center p-6 bg-[#0F172A] rounded-2xl border border-[#1E293B] hover:border-[#334155] transition-colors shadow-sm">
                            <div className="w-12 h-12 bg-[#020617] rounded-xl flex items-center justify-center text-[#94A3B8] mr-5 border border-[#1E293B] shadow-sm">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-1">Phone</p>
                                <p className="text-sm font-bold text-[#F8FAFC]">+251962579755</p>
                            </div>
                        </div>
                        <div className="flex items-center p-6 bg-[#0F172A] rounded-2xl border border-[#1E293B] hover:border-[#334155] transition-colors shadow-sm">
                            <div className="w-12 h-12 bg-[#020617] rounded-xl flex items-center justify-center text-[#94A3B8] mr-5 border border-[#1E293B] shadow-sm">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-1">HQ</p>
                                <p className="text-sm font-bold text-[#F8FAFC]">Addis Ababa</p>
                            </div>
                        </div>

                        <div className="p-6 bg-[linear-gradient(145deg,#0F172A,#020617)] rounded-2xl border border-[#1E293B] text-[#F8FAFC] mt-8 shadow-xl">
                            <div className="flex items-center gap-3 mb-3">
                                <Clock size={20} className="text-[#34D399]" />
                                <h4 className="font-bold text-sm">Engineering Support</h4>
                            </div>
                            <p className="text-[#94A3B8] text-sm leading-relaxed font-medium">
                                Our technical account managers are available Monday through Friday, 8:30 AM to 5:30 PM (EAT).
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-8 bg-[#0F172A] p-8 md:p-10 rounded-[2rem] border border-[#1E293B] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]"
                    >
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#94A3B8] ml-1 uppercase tracking-widest">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Engineering Lead"
                                        className="w-full px-5 py-4 bg-[#020617] border border-[#1E293B] text-[#F8FAFC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981] transition-all placeholder:text-[#475569] font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#94A3B8] ml-1 uppercase tracking-widest">Work Email</label>
                                    <input
                                        type="email"
                                        placeholder="you@company.com"
                                        className="w-full px-5 py-4 bg-[#020617] border border-[#1E293B] text-[#F8FAFC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981] transition-all placeholder:text-[#475569] font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#94A3B8] ml-1 uppercase tracking-widest">Company URL</label>
                                <input
                                    type="text"
                                    placeholder="https://"
                                    className="w-full px-5 py-4 bg-[#020617] border border-[#1E293B] text-[#F8FAFC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981] transition-all placeholder:text-[#475569] font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#94A3B8] ml-1 uppercase tracking-widest">Technical Requirements</label>
                                <textarea
                                    rows={5}
                                    placeholder="Tell us about your tech stack and predicted API volume..."
                                    className="w-full px-5 py-4 bg-[#020617] border border-[#1E293B] text-[#F8FAFC] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981] transition-all resize-none placeholder:text-[#475569] font-medium"
                                ></textarea>
                            </div>

                            <button className="w-full py-4 bg-[#10B981] text-[#020617] font-bold rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:bg-[#34D399] active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer">
                                <Send size={18} />
                                Request Access
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}