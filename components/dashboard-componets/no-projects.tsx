"use client"
import { Folders } from "lucide-react"

export default function NoProjects() {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-[400px] rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-xl h-screen animate-in fade-in zoom-in-95 duration-300">
            <div className="relative mb-8">
                {/* Decorative background glow - switched to green */}
                <div className="absolute inset-0 bg-[#10B981]/10 blur-3xl rounded-full"></div>

                {/* Switched background to dark slate */}
                <div className="relative p-6 bg-[#020617] rounded-2xl shadow-xl border border-[#1E293B]">
                    {/* Switched icon color to emerald */}
                    <Folders size={48} className="text-[#34D399]" strokeWidth={1.5} />
                </div>
            </div>

            <div className="space-y-2 text-center max-w-sm px-6">
                {/* Updated typography colors */}
                <h2 className="text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
                    Empty Space
                </h2>
                <p className="text-[#94A3B8] text-lg font-medium leading-relaxed">
                    Your workspace is currently quiet. Start a new journey by creating your first payment project above.
                </p>
            </div>

            {/* Subtle footer detail - updated colors */}
            <div className="mt-12 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#64748B] font-bold">
                <div className="w-12 h-[1px] bg-[#1E293B]"></div>
                System Ready
                <div className="w-12 h-[1px] bg-[#1E293B]"></div>
            </div>
        </div>
    )
}