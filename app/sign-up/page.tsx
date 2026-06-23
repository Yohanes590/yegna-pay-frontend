"use client"
import {
    Github,
    Chrome,
    User,
    Mail,
    Lock,
    CheckCircle2,
    ShieldCheck,
    ChevronRight,
    Terminal,
    Loader2
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function SignUpPage() {
    const [loadingScreen, setLoadingScreen] = useState<boolean>(false)
    const [FirstName, setFirstName] = useState<string>("")
    const [LastName, setLastName] = useState<string>("")
    const [EmailAddress, setEmail] = useState<string>("")
    const [Password, setPassword] = useState<string>("")

    const [LoadingButton, setLoading] = useState<boolean>(false)


    const HandelThirdParty = async (locator: string) => {
        setLoading(true)
        const YegnaServer = await fetch(process.env.NEXT_PUBLIC_YEGNA_SERVER! + "/auth/third-party", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: locator })
        })
        const serverResponse = await YegnaServer.json()
        if (!YegnaServer.ok) {
            toast.error("Internal Server Error")
        } else {
            if (serverResponse.status == 200) {
                window.location.href = serverResponse.url
            } else {
                toast.error("Something went wrong!!")
            }
        }
    }

    const signUpForm = async () => {
        if (FirstName == "" || LastName == "" || EmailAddress == "" || Password == "") {
            toast.error("Please fill in the necessary credentials")
        } else {
            toast.success("check your email for verification")
            setLoadingScreen(true)
            const ServerRequest = await fetch(process.env.NEXT_PUBLIC_YEGNA_SERVER! + '/auth/email-signup', {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ first_name: FirstName, last_name: LastName, email: EmailAddress, password: Password })
            })
            const ServerResponse = await ServerRequest.json()
            if (ServerRequest.ok) {
                if (ServerResponse.status == 200) {
                    setLoadingScreen(false)
                    toast.success(ServerResponse.message)
                } else {
                    toast(ServerResponse.message)
                    setLoadingScreen(false)
                }
            } else {
                setLoadingScreen(false)
                toast.error(ServerResponse.message)
            }
        }
    }

    return (
        <div className="min-h-screen w-full flex bg-[#020617] font-sans text-[#F8FAFC]">

            {/* Abstract Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[45%] h-[50%] rounded-full bg-[#10B981]/8 blur-[140px]" />
                <div className="absolute bottom-[-15%] left-[-5%] w-[40%] h-[40%] rounded-full bg-[#34D399]/5 blur-[120px]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B_1px,transparent_1px),linear-gradient(to_bottom,#1E293B_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
            </div>

            {/* Left Brand Panel */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-center p-20 border-r border-[#1E293B]">
                <div className="relative z-10 space-y-10">
                    <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-10 h-10 bg-[#10B981] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:scale-105 transition-all">
                            <span className="text-[#020617] font-black text-xl">Y</span>
                        </div>
                        <span className="text-2xl font-black text-[#F8FAFC] tracking-tight">Yegna<span className="text-[#10B981]">Pay</span></span>
                    </Link>

                    <div>
                        <h2 className="text-5xl font-black text-[#F8FAFC] leading-tight tracking-tight mb-4">
                            Build the future of<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#34D399]">Ethiopian Fintech.</span>
                        </h2>
                        <p className="text-[#94A3B8] font-medium">Join hundreds of developers building on Ethiopia's most reliable payment verification platform.</p>
                    </div>

                    <div className="space-y-3">
                        {['No hidden monthly fees', 'API-first architecture', 'Automated receipt verification'].map((feature, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center">
                                    <CheckCircle2 size={12} className="text-[#34D399]" />
                                </div>
                                <span className="text-[#cbd5e1] font-medium text-sm">{feature}</span>
                            </div>
                        ))}
                    </div>

                    {/* Code Preview */}
                    <div className="bg-[#0F172A] rounded-2xl border border-[#1E293B] p-5 font-mono text-xs shadow-2xl">
                        <div className="flex gap-1.5 mb-4 items-center">
                            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                            <div className="w-3 h-3 rounded-full bg-[#10B981]/80" />
                            <Terminal size={12} className="ml-2 text-[#64748B]" />
                            <span className="ml-1 text-[#64748B]">yegnapay-sdk</span>
                        </div>
                        <div className="text-[#94A3B8] leading-relaxed">
                            <span className="text-[#34D399]">const</span> <span className="text-[#F8FAFC]">yegna</span> = <span className="text-[#fbbf24]">require</span>(<span className="text-[#34D399]">'yegnapay-sdk'</span>);<br />
                            <span className="text-[#F8FAFC]">yegna</span>.<span className="text-[#38bdf8]">verify</span>({"{"}amount: <span className="text-[#fbbf24]">1250</span>, currency: <span className="text-[#34D399]">'ETB'</span>{"}"})
                            <br />&nbsp;&nbsp;.<span className="text-[#38bdf8]">then</span>(res =&gt; console.<span className="text-[#38bdf8]">log</span>(<span className="text-[#34D399]">'Verified! ✅'</span>));
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Form Panel */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 relative z-10">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-2 mb-10 justify-center">
                        <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center">
                            <span className="text-[#020617] font-black">Y</span>
                        </div>
                        <span className="text-xl font-black text-[#F8FAFC]">Yegna<span className="text-[#10B981]">Pay</span></span>
                    </div>

                    <div className="mb-10">
                        <h2 className="text-4xl font-black text-[#F8FAFC] mb-2 tracking-tight">Create account</h2>
                        <p className="text-[#94A3B8] font-medium">Get started with your developer sandbox today.</p>
                    </div>

                    {/* Social Auth */}
                    {/* <div className="flex flex-col sm:flex-row gap-3 mb-8">

                        <button disabled={LoadingButton} onClick={() => HandelThirdParty("google")} className="flex-1 flex items-center justify-center gap-2.5 px-4 py-3 bg-[#0F172A] border border-[#1E293B] rounded-xl hover:bg-[#1E293B] hover:border-[#334155] transition-all font-bold text-[#F8FAFC] text-sm active:scale-95">

                            {
                                LoadingButton ? (<>
                                    <Loader2 className='w-4 h-4 animate-spin' />
                                </>) : (<>
                                    <Chrome size={16} className="text-[#34D399]" />
                                    Google
                                </>)
                            }

                        </button>
                        <button disabled={LoadingButton} onClick={() => HandelThirdParty("github")} className="flex-1 flex items-center justify-center gap-2.5 px-4 py-3 bg-[#0F172A] border border-[#1E293B] rounded-xl hover:bg-[#1E293B] hover:border-[#334155] transition-all font-bold text-[#F8FAFC] text-sm active:scale-95">
                            {
                                LoadingButton ? (<>
                                    <Loader2 className='w-4 h-4 animate-spin' />
                                </>) : (<>
                                    <Github size={16} />
                                    GitHub
                                </>)
                            }

                        </button>
                    </div> */}

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#1E293B]"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase">
                            <span className="bg-[#020617] px-4 text-[#64748B] font-black tracking-widest">Direct Registration</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#94A3B8] tracking-widest ml-1">First Name</label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" size={15} />
                                    <input
                                        value={FirstName}
                                        onChange={(e: any) => setFirstName(e.target.value)}
                                        type="text" placeholder="Abebe"
                                        className="w-full pl-10 pr-4 py-4 bg-[#0F172A] border border-[#1E293B] rounded-xl focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981] outline-none transition-all font-medium text-sm text-[#F8FAFC] placeholder:text-[#475569]" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#94A3B8] tracking-widest ml-1">Last Name</label>
                                <input
                                    value={LastName}
                                    onChange={(e: any) => setLastName(e.target.value)}
                                    type="text" placeholder="Kebede"
                                    className="w-full px-4 py-4 bg-[#0F172A] border border-[#1E293B] rounded-xl focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981] outline-none transition-all font-medium text-sm text-[#F8FAFC] placeholder:text-[#475569]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[#94A3B8] tracking-widest ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" size={15} />
                                <input
                                    value={EmailAddress}
                                    onChange={(e: any) => setEmail(e.target.value)}
                                    type="email" placeholder="abebe@tech.et"
                                    className="w-full pl-10 pr-4 py-4 bg-[#0F172A] border border-[#1E293B] rounded-xl focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981] outline-none transition-all font-medium text-sm text-[#F8FAFC] placeholder:text-[#475569]" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[#94A3B8] tracking-widest ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" size={15} />
                                <input
                                    value={Password}
                                    onChange={(e: any) => setPassword(e.target.value)}
                                    type="password" placeholder="••••••••••••"
                                    className="w-full pl-10 pr-4 py-4 bg-[#0F172A] border border-[#1E293B] rounded-xl focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981] outline-none transition-all font-medium text-sm text-[#F8FAFC] placeholder:text-[#475569]" />
                            </div>
                        </div>

                        <div className="flex items-start gap-3 pt-1">
                            <input type="checkbox" className="mt-1 w-4 h-4 rounded border-[#334155] bg-[#0F172A] text-[#10B981] focus:ring-[#10B981]/30" />
                            <p className="text-xs text-[#94A3B8] leading-relaxed">
                                I agree to the <Link href="#" className="text-[#34D399] font-bold hover:text-[#10B981]">Terms of Service</Link> and <Link href="#" className="text-[#34D399] font-bold hover:text-[#10B981]">Privacy Policy</Link>.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={signUpForm}
                        disabled={loadingScreen}
                        className="w-full mt-6 py-4 bg-[#10B981] text-[#020617] font-extrabold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:bg-[#34D399] transition-all active:scale-[0.98] flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loadingScreen ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (
                            <>
                                Create My Account
                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>

                    <p className="mt-8 text-center text-[#94A3B8] font-medium text-sm">
                        Already have an account?{' '}
                        <Link href="/sign-in" className="text-[#34D399] font-bold hover:text-[#10B981] transition-colors">Sign in</Link>
                    </p>

                    <div className="mt-8 flex items-center justify-center gap-2 p-4 bg-[#0F172A] rounded-xl border border-[#1E293B]">
                        <ShieldCheck size={16} className="text-[#10B981]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#64748B]">Enterprise-grade security</span>
                    </div>
                </div>
            </div>
        </div>
    );
}