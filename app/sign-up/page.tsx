"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Github, Eye, EyeOff, Lock, Mail, User, ArrowRight, Loader2 } from "lucide-react";
import AuthSidePanel from "@/components/auth/auth-side-panel";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSocialSignUp = async () => {
        setIsLoading(true);
        localStorage.setItem("yegna_theme", "dark");
        document.documentElement.classList.add("dark");
        try {
            const redirectUrl = typeof window !== "undefined" ? `${window.location.origin}/dashboard` : "http://localhost:3000/dashboard";
            const res = await authClient.signIn.social({
                provider: "github",
                callbackURL: redirectUrl,
            });
            if (res?.error) {
                toast.error(res.error.message || "GitHub sign-up failed. Verify GitHub OAuth settings on the backend.");
                setIsLoading(false);
            }
        } catch (err: any) {
            const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000").replace(/\/+$/, "");
            if (typeof window !== "undefined" && window.location.protocol === "https:" && backendUrl.startsWith("http://")) {
                toast.error("Mixed content blocked: NEXT_PUBLIC_BACKEND_URL must use https:// in production.");
            } else {
                toast.error(err?.message || "Unable to connect to authentication server. Check NEXT_PUBLIC_BACKEND_URL and backend CORS.");
            }
            setIsLoading(false);
        }
    };

    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName || !email || !password) return toast.error("Please fill in all registration fields.");

        setIsLoading(true);
        localStorage.setItem("yegna_theme", "dark");
        document.documentElement.classList.add("dark");
        try {
            const { error } = await authClient.signUp.email({
                email,
                password,
                name: fullName,
            });

            if (error) throw error;
            await fetch("/api/user/info", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" }).catch(() => null);
            toast.success("Account created successfully.");
            setTimeout(() => { window.location.href = "/dashboard"; }, 800);
        } catch {
            // Fallback to backend email signup endpoint
            const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000").replace(/\/+$/, "");
            const res = await fetch(`${backendUrl}/auth/email-signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email_address: email,
                    password,
                    full_name: fullName,
                }),
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok && data?.status === 200) {
                toast.success(data.message || "Registration successful.");
                setTimeout(() => { window.location.href = "/sign-in"; }, 1500);
            } else {
                toast.error(data?.message || "Registration failed.");
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-[#060a0f] text-[#f1f5f9] font-sans">
            <AuthSidePanel subtitle="Start verifying bank payments with 200 free requests." />

            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10">
                <div className="w-full max-w-md space-y-8 bg-[#0a1118] p-8 sm:p-10 rounded-2xl border border-white/[0.08] shadow-2xl">
                    <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-[#34d399] font-bold">
                            Developer Registration
                        </span>
                        <h2 className="text-2xl font-black text-white mt-1">Create workspace</h2>
                        <p className="text-xs text-[#94a3b8] mt-1 font-mono">
                            Includes 200 free sandbox API verification queries
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleSocialSignUp}
                        disabled={isLoading}
                        className="w-full py-3 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-mono text-xs font-bold flex items-center justify-center gap-3 transition-all"
                    >
                        <Github size={16} /> Sign up with GitHub
                    </button>

                    <div className="flex items-center gap-4 text-xs font-mono text-[#64748b]">
                        <span className="flex-1 h-px bg-white/10" /> OR REGISTER <span className="flex-1 h-px bg-white/10" />
                    </div>

                    <form onSubmit={handleEmailSignUp} className="space-y-4">
                        <div className="space-y-1.5 font-mono text-xs">
                            <label className="text-[#94a3b8]">Full Legal Name / Company</label>
                            <div className="relative flex items-center">
                                <User size={16} className="absolute left-3 text-[#64748b]" />
                                <input
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Abebe Kebede"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#060a0f] border border-white/10 text-white placeholder:text-[#475569] focus:outline-none focus:border-[#10b981]"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5 font-mono text-xs">
                            <label className="text-[#94a3b8]">Work Email</label>
                            <div className="relative flex items-center">
                                <Mail size={16} className="absolute left-3 text-[#64748b]" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="abebe@fintech.et"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#060a0f] border border-white/10 text-white placeholder:text-[#475569] focus:outline-none focus:border-[#10b981]"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5 font-mono text-xs">
                            <label className="text-[#94a3b8]">Secret Password</label>
                            <div className="relative flex items-center">
                                <Lock size={16} className="absolute left-3 text-[#64748b]" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-[#060a0f] border border-white/10 text-white placeholder:text-[#475569] focus:outline-none focus:border-[#10b981]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 text-[#64748b] hover:text-white"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 rounded-lg bg-[#059669] hover:bg-[#10b981] text-white font-sans text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all shadow-lg border border-[#34d399]/40 disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 size={16} className="animate-spin" /> : (
                                <>
                                    <span>Create Free Account</span>
                                    <ArrowRight size={14} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="pt-4 border-t border-white/[0.06] text-center font-mono text-xs text-[#94a3b8]">
                        Already registered? <Link href="/sign-in" className="text-[#34d399] font-bold hover:underline">Sign in here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
