"use client"

import NavBar from "@/components/landing-page/nav-bar"
import Footer from "@/components/landing-page/footer"
import { motion } from "framer-motion"
import { ShieldCheck, Activity, SearchCheck, Banknote, DatabaseZap, Users, ChevronRight, ArrowRight, Server, Lock } from "lucide-react"

export default function ConnectedBanksPage() {

    const banks = [
        {
            name: "Commercial Bank of Ethiopia",
            logo: "/banks/CBE.png",
            color: "from-purple-500/20 to-[#10B981]/20",
            status: "Operational",
            features: ["Direct Integration", "Instant Verification", "Dispute Resolution"]
        },
        {
            name: "Bank of Abyssinia",
            logo: "/banks/abs.png",
            color: "from-yellow-500/20 to-[#10B981]/20",
            status: "Operational",
            features: ["Direct Integration", "Instant Verification", "Webhooks Active"]
        },
        {
            name: "Awash Bank",
            logo: "/banks/awash.png",
            color: "from-blue-500/20 to-[#10B981]/20",
            status: "Operational",
            features: ["Direct Integration", "Instant Verification", "High Volume Ready"]
        }
    ]

    const features = [
        {
            icon: ShieldCheck,
            title: "Transaction Verification",
            desc: "Instantly cross-check transfer signatures across native banking core infrastructure to cryptographically confirm payments."
        },
        {
            icon: SearchCheck,
            title: "Duplicate Detection",
            desc: "Prevents double-spending attacks by logging absolute transaction history and rejecting any replayed receipt sequences."
        },
        {
            icon: Users,
            title: "Payer Verification",
            desc: "Mitigate identity fraud by guaranteeing that the individual listed on the receipt officially matches the transferring account holder."
        },
        {
            icon: Banknote,
            title: "Amount Validation",
            desc: "Secures your cart by confirming the transferred amount matches the expected API payload to the exact decimal."
        },
        {
            icon: DatabaseZap,
            title: "Real-Time Pipeline",
            desc: "No scraping, no polling. Our servers constantly sync with central banking APIs to resolve your verifications sub-second."
        },
        {
            icon: Activity,
            title: "Fraud Detection Algorthims",
            desc: "Advanced heuristic models that score interactions in real time to isolate manipulated or synthetic transfer payloads."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    }

    return (
        <main className="min-h-screen bg-[#020617] text-[#F8FAFC] selection:bg-[#10B981]/30 overflow-hidden">
            <NavBar />

            {/* Background Effects */}
            <div className="absolute top-0 left-0 right-0 h-[800px] overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-20 rounded-full blur-[120px] bg-gradient-to-b from-[#10B981] to-transparent"></div>
                <div className="absolute top-[200px] left-[-200px] w-[500px] h-[500px] opacity-10 rounded-full blur-[100px] bg-[#10B981]"></div>
                <div className="absolute top-[300px] right-[-200px] w-[600px] h-[600px] opacity-10 rounded-full blur-[120px] bg-blue-500"></div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 xl:px-0 max-w-7xl mx-auto z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#34D399] text-xs font-bold uppercase tracking-widest mb-8 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                >
                    <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
                    Direct Banking Infrastructure
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-black tracking-tight mb-6"
                >
                    Connected to Ethiopia's <br className="hidden md:block" /> Leading <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34D399] to-[#059669]">Banking Networks</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-[#94A3B8] text-lg md:text-xl max-w-3xl leading-relaxed mb-10 font-medium"
                >
                    Yegna Pay bypasses legacy bottlenecks by plugging directly into the core ledgers of top financial institutions. Verify transactions instantly with zero scraping.
                </motion.p>
            </section>

            {/* Infinite Marquee Section */}
            <section className="py-10 border-y border-[#1E293B] bg-[#0A0F1C]/50 backdrop-blur-sm relative z-10 overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#020617] to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020617] to-transparent z-10"></div>

                <div className="flex w-fit animate-marquee group-hover:[animation-play-state:paused]">
                    {/* First Set */}
                    <div className="flex items-center space-x-20 px-10">
                        {banks.map((bank, i) => (
                            <div key={`first-${i}`} className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                                <img src={bank.logo} alt={bank.name} className="h-10 object-contain" />
                                <span className="text-xl font-bold text-[#64748B] whitespace-nowrap">{bank.name}</span>
                            </div>
                        ))}
                    </div>
                    {/* Clone Set for infinite scroll */}
                    <div className="flex items-center space-x-20 px-10">
                        {banks.map((bank, i) => (
                            <div key={`second-${i}`} className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                                <img src={bank.logo} alt={bank.name} className="h-10 object-contain" />
                                <span className="text-xl font-bold text-[#64748B] whitespace-nowrap">{bank.name}</span>
                            </div>
                        ))}
                    </div>
                    {/* Third Clone Set for ultra-wide screens */}
                    <div className="flex items-center space-x-20 px-10">
                        {banks.map((bank, i) => (
                            <div key={`third-${i}`} className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                                <img src={bank.logo} alt={bank.name} className="h-10 object-contain" />
                                <span className="text-xl font-bold text-[#64748B] whitespace-nowrap">{bank.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Connection Flow Section */}
            <section className="py-32 px-6 xl:px-0 max-w-5xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">The Neural Verification Pipeline</h2>
                    <p className="text-[#94A3B8] max-w-2xl mx-auto">A seamless sub-second data propagation architecture guaranteeing trust between banks and merchants.</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#1E293B] -z-10 translate-y-[-50%]">
                        <motion.div
                            className="h-full bg-gradient-to-r from-transparent via-[#10B981] to-transparent w-1/3"
                            animate={{
                                x: ['-100%', '300%']
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    {/* Step 1 */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 w-full md:w-64 flex flex-col items-center text-center shadow-xl hover:border-[#10B981]/50 hover:shadow-[0_10px_30px_rgba(16,185,129,0.1)] transition-all"
                    >
                        <div className="w-16 h-16 bg-[#020617] rounded-xl flex items-center justify-center mb-4 border border-[#1E293B] shadow-inner">
                            <Banknote size={28} className="text-[#64748B]" />
                        </div>
                        <h3 className="font-bold text-lg mb-1">Banking Core</h3>
                        <p className="text-xs text-[#94A3B8]">Customer completes transfer via mobile app</p>
                    </motion.div>

                    <ChevronRight size={32} className="text-[#334155] md:hidden" />

                    {/* Step 2 */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-[#020617] relative border border-[#10B981]/50 rounded-2xl p-6 w-full md:w-72 flex flex-col items-center text-center shadow-[0_0_40px_rgba(16,185,129,0.15)] z-10"
                    >
                        <div className="absolute inset-0 bg-[#10B981]/5 rounded-2xl blur-md -z-10" />
                        <div className="w-20 h-20 bg-[#10B981]/10 rounded-2xl flex items-center justify-center mb-4 border border-[#10B981]/30">
                            <ShieldCheck size={36} className="text-[#34D399]" />
                        </div>
                        <h3 className="font-black text-xl mb-1 text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#34D399]">Yegna Pay Engine</h3>
                        <p className="text-xs text-[#94A3B8] font-medium block">Interprets receipt, queries ledger, parses fraud rules</p>
                    </motion.div>

                    <ChevronRight size={32} className="text-[#334155] md:hidden" />

                    {/* Step 3 */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 w-full md:w-64 flex flex-col items-center text-center shadow-xl hover:border-[#38bdf8]/50 hover:shadow-[0_10px_30px_rgba(56,189,248,0.1)] transition-all"
                    >
                        <div className="w-16 h-16 bg-[#020617] rounded-xl flex items-center justify-center mb-4 border border-[#1E293B] shadow-inner">
                            <Server size={28} className="text-[#38bdf8]" />
                        </div>
                        <h3 className="font-bold text-lg mb-1">Your Application</h3>
                        <p className="text-xs text-[#94A3B8]">Receives instant verified webhook payload</p>
                    </motion.div>

                </div>
            </section>

            {/* Connected Banks Showcase Cards */}
            <section className="py-24 px-6 xl:px-0 max-w-7xl mx-auto relative z-10">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Supported Integrations</h2>
                    <p className="text-[#94A3B8] max-w-2xl text-lg">Deep systemic integrations offering military-grade transaction assurances across the region's largest ledgers.</p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {banks.map((bank, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="bg-[#0F172A] border border-[#1E293B] rounded-3xl p-8 relative overflow-hidden group shadow-xl transition-all hover:border-[#10B981]/40 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)]"
                        >
                            {/* Decorative Glow */}
                            <div className={`absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br ${bank.color} rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                            <div className="flex justify-between items-start mb-8 relative z-10">
                                <div className="h-14 bg-[#020617] border border-[#1E293B] rounded-xl p-2.5 shadow-inner">
                                    <img src={bank.logo} alt={bank.name} className="h-full object-contain" />
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></div>
                                    <span className="text-[10px] font-bold text-[#34D399] uppercase">{bank.status}</span>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-6 text-[#F8FAFC] tracking-tight relative z-10">{bank.name}</h3>

                            <div className="space-y-3 relative z-10">
                                {bank.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded bg-[#10B981]/10 text-[#10B981] flex items-center justify-center shrink-0">
                                            <CheckCircle2 size={12} strokeWidth={4} />
                                        </div>
                                        <span className="text-sm text-[#94A3B8] font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Features Grid */}
            <section className="py-24 px-6 xl:px-0 max-w-7xl mx-auto relative z-10 border-t border-[#1E293B]">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Security & Validation Engine</h2>
                    <p className="text-[#94A3B8] max-w-2xl mx-auto text-lg">Every transaction is subjected to an exhaustive gauntlet of validation checks before reaching your server.</p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-[#0A0F1C] border border-[#1E293B] rounded-2xl p-8 hover:bg-[#0F172A] transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#1E293B] border border-[#334155] flex items-center justify-center text-[#94A3B8] mb-6 group-hover:text-[#10B981] group-hover:border-[#10B981]/30 group-hover:bg-[#10B981]/10 transition-all">
                                    <Icon size={24} />
                                </div>
                                <h3 className="text-lg font-bold mb-3 text-[#F8FAFC] tracking-tight">{feature.title}</h3>
                                <p className="text-[#64748B] text-sm leading-relaxed font-medium">{feature.desc}</p>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </section>

            {/* CTA */}
            <section className="py-32 relative z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#10B981]/5 pointer-events-none" />
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Ready to integrate?</h2>
                    <p className="text-[#94A3B8] text-lg mb-10 max-w-2xl mx-auto">Stop worrying about fraud and manual reconciliation. Build your next Fintech app on top of Yegna Pay's rock-solid foundation.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button onClick={() => window.location.href = "/documentation"} className="w-full sm:w-auto px-8 py-4 bg-[#10B981] text-[#020617] font-bold rounded-xl hover:bg-[#34D399] transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2">
                            Read the Docs <ArrowRight size={18} />
                        </button>
                        <button onClick={() => window.location.href = "/sign-up"} className="w-full sm:w-auto px-8 py-4 bg-[#0F172A] border border-[#1E293B] text-[#F8FAFC] font-bold rounded-xl hover:bg-[#1E293B] transition-colors flex items-center justify-center gap-2 group">
                            <Lock size={18} className="text-[#10B981] group-hover:scale-110 transition-transform" />
                            Create Workspace
                        </button>
                    </div>
                </div>
            </section>

            <Footer />

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
            `}} />
        </main>
    )
}

function CheckCircle2(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
        >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    )
}
