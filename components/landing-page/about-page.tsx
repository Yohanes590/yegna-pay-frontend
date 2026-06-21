"use client"
import { ShieldCheck, Server, Globe2, Zap, ShieldAlert, Plug, Layers, Lock, Cpu, Activity } from "lucide-react"
import { motion } from "framer-motion"

export default function AboutPageRender() {
    const CardData = [
        {
            title: "Security First",
            description: "Multi-layer verification ensures every transaction is authentic and protected to prevent fraudulent payments.",
            icon: ShieldCheck,
            color: "text-[#10B981]",
            bgClass: "bg-[#10B981]/10 border border-[#10B981]/20"
        },
        {
            title: "Developer Focused",
            description: "Built by developers, for developers. Clean APIs, detailed documentation, and fast integration times.",
            icon: Cpu,
            color: "text-[#F8FAFC]",
            bgClass: "bg-[#1E293B] border border-[#334155]"
        },
        {
            title: "Bank Agnostic",
            description: "Integrations across leading banking networks. Switch and scale across different gateways confidently.",
            icon: Globe2,
            color: "text-[#34D399]",
            bgClass: "bg-[#34D399]/10 border border-[#34D399]/20"
        },
        {
            title: "Lightning Fast",
            description: "Process payments in mere seconds with our highly optimized, scalable verification engine.",
            icon: Zap,
            color: "text-[#10B981]",
            bgClass: "bg-[#10B981]/10 border border-[#10B981]/20"
        },
        {
            title: "Fraud Prevention",
            description: "Advanced duplicate detection and intelligent receipt validation to stop fake transactions.",
            icon: ShieldAlert,
            color: "text-[#fbbf24]",
            bgClass: "bg-[#fbbf24]/10 border border-[#fbbf24]/20"
        },
        {
            title: "Seamless Setup",
            description: "Plug-and-play API with Bearer token authentication, webhooks, and streamlined guides.",
            icon: Plug,
            color: "text-[#F8FAFC]",
            bgClass: "bg-[#1E293B] border border-[#334155]"
        }
    ];

    const TeamData = [
        { name: "Yohanes Mulugeta", position: "CEO & Founder" },
        { name: "Nathan Hailu", position: "Co-Founder" },
        { name: "Selamawit Admasu", position: "Head of Engineering" },
        { name: "Yonatan Taddess", position: "Head of Product" },
        { name: "Rebeka Alemu", position: "Customer Support Lead" },
        { name: "Eden Tesgaye", position: "Community Manager" },
    ];

    return (
        <section id="about" className="min-h-screen bg-[#020617] py-32 px-6 font-sans border-t border-[#1E293B]">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h2 className="text-[#34D399] font-bold tracking-[0.2em] uppercase text-[11px] mb-4 bg-[#10B981]/10 border border-[#10B981]/20 px-3 py-1.5 rounded-full inline-block shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                        Platform Architecture
                    </h2>
                    <h1 className="text-4xl md:text-5xl font-black text-[#F8FAFC] tracking-tight mb-6">
                        Built for Scale & Security
                    </h1>
                    <p className="text-lg text-[#94A3B8] leading-relaxed font-medium">
                        We're on a mission to make digital payments accessible, secure, and fully autonomous for developer platforms.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                    {CardData.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-[#0F172A] rounded-3xl border border-[#1E293B] p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] hover:border-[#334155] transition-all duration-300"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${item.bgClass} flex items-center justify-center ${item.color} mb-6 transition-colors shadow-sm`}>
                                    <Icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-[#F8FAFC] mb-3">{item.title}</h3>
                                <p className="text-[#94A3B8] text-sm leading-relaxed font-medium">
                                    {item.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-10 bg-[#0F172A] border border-[#1E293B] rounded-[2rem] shadow-xl mb-24 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#1E293B]"
                >
                    {[
                        { icon: Server, title: "Scalable Core", label: "Built for throughput" },
                        { icon: Layers, title: "Multi-Verification", label: "Cross-checks records" },
                        { icon: Lock, title: "Fraud Detetcion", label: "Anomaly prevention" },
                        { icon: Activity, title: "Real-Time APIs", label: "Instant webhooks" }
                    ].map((stat, i) => (
                        <div key={i} className={`flex flex-col items-center justify-center text-center ${i !== 0 ? 'pt-8 md:pt-0' : ''}`}>
                            <div className="w-12 h-12 rounded-full bg-[#020617] border border-[#1E293B] flex items-center justify-center mb-4 shadow-sm">
                                <stat.icon size={20} className="text-[#10B981]" />
                            </div>
                            <div className="text-base font-bold text-[#F8FAFC] mb-1">
                                {stat.title}
                            </div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-[#64748B]">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* <div className="pt-20 border-t border-[#1E293B]">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-black text-[#F8FAFC] mb-4">The Driving Force</h2>
                        <p className="text-base text-[#94A3B8] max-w-2xl mx-auto font-medium">
                            The engineers and product leaders building our transaction engine.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {TeamData.map((item, index) => (
                            <div 
                                key={index}
                                className="flex items-center gap-5 p-4 bg-[#0F172A] rounded-2xl border border-[#1E293B] shadow-md hover:shadow-lg hover:border-[#10B981]/30 transition-all cursor-default"
                            >
                                <div className="w-12 h-12 rounded-full bg-[#020617] border border-[#1E293B] flex items-center justify-center text-[#10B981] font-bold shadow-sm">
                                    {item.name.split(" ")[0].charAt(0) + (item.name.split(" ")[1]?.charAt(0) || "")}
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#F8FAFC] text-sm">{item.name}</h4>
                                    <p className="text-[10px] font-bold text-[#64748B] mt-1 uppercase tracking-wider">{item.position}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>
        </section>
    )
}