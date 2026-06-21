"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertTriangle, ArrowLeft, Home } from "lucide-react"
export default function NotFound() {
    const router = useRouter()
    return (
        <div className="relative min-h-screen bg-[#020617] flex items-center justify-center p-6 font-sans antialiased overflow-hidden">

            {/* Ambient Background Glow Map */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#10B981]/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Main Container Card */}
            <div className="relative w-full max-w-md bg-[#0F172A]/80 backdrop-blur-md rounded-3xl shadow-[0_0_60px_rgba(16,185,129,0.07)] border border-[#1E293B] hover:border-[#10B981]/20 p-10 text-center transition-all duration-300">

                {/* Neon Warning Icon */}
                <div className="relative mx-auto w-20 h-20 mb-8 flex items-center justify-center bg-[#10B981]/5 rounded-2xl border border-[#10B981]/20 shadow-[inset_0_0_15px_rgba(16,185,129,0.1)]">
                    <AlertTriangle size={36} className="text-[#10B981] drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
                    {/* Tiny pulsing accent dot */}
                    <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#10B981] rounded-full shadow-[0_0_8px_#10B981] animate-pulse" />
                </div>

                {/* Status Code Accent Badge */}
                <span className="inline-block text-[10px] font-black tracking-widest text-[#10B981] uppercase bg-[#10B981]/10 px-3.5 py-1 rounded-full border border-[#10B981]/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    Error 404
                </span>

                {/* Typography */}
                <h2 className="text-2xl font-black text-[#F8FAFC] tracking-tight mt-5 mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                    Endpoint Not Found
                </h2>
                <p className="text-[#94A3B8] text-sm leading-relaxed mb-8 max-w-[320px] mx-auto">
                    The requested route does not exist or has been permanently moved beyond our secure perimeter.
                </p>

                {/* Navigation Controls */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                        onClick={() => router.back()}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold rounded-xl border border-[#1E293B] bg-[#0F172A] text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F8FAFC] hover:border-[#334155] transition-all active:scale-95"
                    >
                        <ArrowLeft size={16} />
                        Go Back
                    </button>

                    <Link
                        href="/dashboard"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#10B981] text-[#020617] text-sm font-black rounded-xl hover:bg-[#34D399] transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95"
                    >
                        <Home size={16} />
                        Dashboard
                    </Link>
                </div>
            </div>
        </div>
    )
}