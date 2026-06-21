"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function LoadingScreen() {
    const messages = [
        "Initializing Verification Engine...",
        "Connecting Banking Networks...",
        "Validating Secure Environment...",
        "Preparing Dashboard Ecosystem..."
    ];

    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % messages.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020617] text-[#F8FAFC]">

            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#10B981]/10 blur-[80px] pointer-events-none" />

            <div className="relative flex flex-col items-center">
                {/* Logo / Shield Core */}
                <div className="relative w-24 h-24 flex items-center justify-center mb-8">

                    {/* Pulsing Outer Rings */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: [1, 1.5, 1], opacity: [0, 0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-xl border-2 border-[#10B981]/30"
                    />
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: [1, 2, 1], opacity: [0, 0.2, 0] }}
                        transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-xl border border-[#10B981]/20"
                    />

                    {/* Central Icon Block */}
                    <motion.div
                        animate={{ boxShadow: ["0 0 15px rgba(16,185,129,0.2)", "0 0 35px rgba(16,185,129,0.5)", "0 0 15px rgba(16,185,129,0.2)"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-16 h-16 bg-[#10B981] rounded-2xl flex items-center justify-center relative z-10"
                    >
                        <span className="text-[#020617] font-black text-3xl">Y</span>
                    </motion.div>
                </div>

                {/* Animated Text Message */}
                <div className="h-6 overflow-hidden relative">
                    <motion.div
                        key={messageIndex}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-[#94A3B8] font-bold text-sm tracking-wide"
                    >
                        {messages[messageIndex]}
                    </motion.div>
                </div>

                {/* Progress Line */}
                <div className="mt-8 mb-4 w-48 h-1 bg-[#1E293B] rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-transparent via-[#10B981] to-transparent w-1/2"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                <span className="text-[#64748B] text-[10px] font-bold uppercase tracking-widest">
                    Secured by Yegna Pay
                </span>
            </div>
        </div>
    )
}