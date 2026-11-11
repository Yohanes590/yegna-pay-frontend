"use client";

import { useState } from "react";
import { Copy, Eye, EyeOff, KeyRound } from "lucide-react";
import { toast } from "sonner";

export default function SettingsApiKey({
    apiKey,
    onGenerateNew,
}: {
    apiKey: string;
    onGenerateNew: () => void;
}) {
    const [showKey, setShowKey] = useState(false);

    return (
        <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 shadow-xl">
            <div className="mb-6">
                <div className="w-10 h-10 bg-[#10B981]/10 rounded-xl flex items-center justify-center text-[#34D399] border border-[#10B981]/20 mb-4">
                    <KeyRound size={20} />
                </div>
                <h2 className="text-lg font-bold text-[#F8FAFC]">API Secrets</h2>
                <p className="text-xs text-[#94A3B8] font-medium mt-1">
                    Use these to authenticate your backend requests.
                </p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#64748B]">
                        Project Key (Private)
                    </label>
                    <div className="flex items-center gap-2 bg-[#020617] border border-[#1E293B] rounded-xl p-1.5 focus-within:border-[#10B981]/50 transition-colors">
                        <input
                            type={showKey ? "text" : "password"}
                            readOnly
                            value={apiKey || "sk_live_1234567890abcdef"}
                            className="w-full bg-transparent border-none outline-none text-xs font-mono text-[#34D399] px-3 font-bold"
                        />
                        <button
                            type="button"
                            onClick={() => setShowKey(!showKey)}
                            className="p-2 hover:bg-[#1E293B] rounded-lg text-[#64748B] hover:text-[#F8FAFC] transition-colors"
                        >
                            {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                        <button
                            type="button"
                            onClick={async () => {
                                await navigator.clipboard.writeText(apiKey || "sk_live_1234567890abcdef");
                                toast.success("Copied to clipboard");
                            }}
                            className="p-2 hover:bg-[#1E293B] rounded-lg text-[#64748B] hover:text-[#F8FAFC] transition-colors"
                        >
                            <Copy size={14} />
                        </button>
                    </div>

                    <div className="mt-4 mb-2">
                        <button
                            type="button"
                            onClick={onGenerateNew}
                            className="w-full flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-extrabold rounded-xl transition-all shadow-[0_0_10px_rgba(16,185,129,0.2)] active:scale-95 bg-[#10B981] text-[#020617] hover:bg-[#34D399]"
                        >
                            Generate New API Key
                        </button>
                    </div>

                    <p className="text-[10px] text-amber-500/70 font-medium leading-relaxed">
                        WARNING: Do not expose this key in client-side code like React or browser JS.
                    </p>
                </div>
            </div>
        </div>
    );
}

