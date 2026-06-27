"use client";
import {
  Github,
  Chrome,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Loader2,
  Terminal,
} from "lucide-react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [LoadingButton, setLoading] = useState<boolean>(false)
  const ThirdPartyHandler = async () => {
    setLoading(true)
    const authToGithub = await fetch("/api/auth",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          method: "user"
        })
      }
    )
    const serverResponse = await authToGithub.json()
    if (authToGithub.ok) {
      window.location.href = serverResponse.generatedLink
    } else {
      toast.error("Internal server error!")
    }
  };
  const handleSubmit = async () => {
    if (emailAddress == "" || password == "") {
      toast("Please provide necessary information");
    } else {
      setIsLoading(true);
      const ServerRequest = await fetch("/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailAddress,
            password: password,
          }),
        },
      );
      const ServerResponse = await ServerRequest.json();
      if (ServerRequest.ok) {
        if (ServerResponse.status == true) {
          toast.success(ServerResponse.message);
          Cookies.set("access_token", ServerResponse.token);
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 2000);
        } else {
          setIsLoading(false);
          toast(ServerResponse.message);
        }
      } else {
        setIsLoading(false);
        toast(ServerResponse.message);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#020617] font-sans text-[#F8FAFC]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#10B981]/8 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-[#34D399]/5 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E293B_1px,transparent_1px),linear-gradient(to_bottom,#1E293B_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12 border-r border-[#1E293B]">
        <div className="relative z-10 max-w-lg space-y-10">
          <Link
            href="/"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-[#10B981] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all">
              <span className="text-[#020617] font-black text-xl">Y</span>
            </div>
            <h1 className="text-2xl font-black text-[#F8FAFC] tracking-tight">
              Yegna<span className="text-[#10B981]">Pay</span>
            </h1>
          </Link>
          <div>
            <h2 className="text-4xl font-black text-[#F8FAFC] leading-tight mb-4 tracking-tight">
              The fastest way to verify payments in Ethiopia.
            </h2>
            <p className="text-[#94A3B8] font-medium leading-relaxed">
              Connect your application to live banking ledgers and automate
              transaction verification in milliseconds.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                t: "Multi-Layer Fraud Prevention",
                d: "Intelligent duplicate checks & anomaly detection.",
              },
              {
                t: "Direct Banking Ledger Access",
                d: "Verified directly against CBE, Awash and BOA.",
              },
              {
                t: "Developer-First Architecture",
                d: "Clean REST API with comprehensive SDKs.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 bg-[#0F172A] rounded-xl border border-[#1E293B]"
              >
                <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#34D399] shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#F8FAFC]">{item.t}</p>
                  <p className="text-xs text-[#94A3B8] mt-0.5 font-medium">
                    {item.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#0F172A] rounded-2xl border border-[#1E293B] p-5 font-mono text-xs shadow-xl">
            <div className="flex gap-1.5 mb-4">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-[#10B981]/80" />
              <Terminal size={12} className="ml-2 text-[#64748B]" />
            </div>
            <div className="text-[#94A3B8]">
              <span className="text-[#34D399]">const</span> result ={" "}
              <span className="text-[#38bdf8]">await</span> yegnaPay.
              <span className="text-[#F8FAFC]">verify</span>({"{"}
              <br />
              &nbsp;&nbsp;platform:{" "}
              <span className="text-[#34D399]">'CBE'</span>,
              <br />
              &nbsp;&nbsp;amount: <span className="text-[#fbbf24]">4000</span>,
              currency: <span className="text-[#34D399]">'ETB'</span>
              <br />
              {"}"}); <span className="text-[#64748B]">// ✅ Verified</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 relative z-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-10 justify-center">
            <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center">
              <span className="text-[#020617] font-black">Y</span>
            </div>
            <span className="text-xl font-black text-[#F8FAFC]">
              Yegna<span className="text-[#10B981]">Pay</span>
            </span>
          </div>
          <div className="mb-10">
            <h2 className="text-3xl font-black text-[#F8FAFC] mb-2 tracking-tight">
              Welcome back
            </h2>
            <p className="text-[#94A3B8] font-medium">
              Sign in to your developer account.
            </p>
          </div>
          <div className="grid gap-3 mb-8">
            <button
              onClick={() => ThirdPartyHandler()}
              className="flex items-center justify-center gap-2.5 px-4 py-3 bg-[#0F172A] border border-[#1E293B] rounded-xl hover:bg-[#1E293B] hover:border-[#334155] transition-all font-bold text-[#F8FAFC] text-sm active:scale-[0.98]"
            >
              {
                LoadingButton ? (<>
                  <Loader2 className='w-4 h-4 animate-spin' />
                </>) : (<>
                  <Github size={18} />
                  GitHub
                </>)
              }


            </button>
          </div>
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#1E293B]"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-[#020617] px-4 text-[#64748B] font-black tracking-widest">
                Or continue with email
              </span>
            </div>
          </div>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"
                  size={16}
                />
                <input
                  value={emailAddress}
                  onChange={(e: any) => setEmailAddress(e.target.value)}
                  type="email"
                  placeholder="dev@company.com"
                  className="w-full pl-11 pr-4 py-4 bg-[#0F172A] border border-[#1E293B] rounded-xl focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981] outline-none transition-all font-medium text-[#F8FAFC] placeholder:text-[#475569]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-[#94A3B8] uppercase tracking-widest">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs font-bold text-[#34D399] hover:text-[#10B981] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]"
                  size={16}
                />
                <input
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-4 bg-[#0F172A] border border-[#1E293B] rounded-xl focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981] outline-none transition-all font-medium text-[#F8FAFC] placeholder:text-[#475569]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#94A3B8] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>
          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className="w-full mt-8 py-4 bg-[#10B981] text-[#020617] font-extrabold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:bg-[#34D399] transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>
                Sign In to Dashboard
                <ArrowRight size={18} />
              </>
            )}
          </button>
          <p className="mt-8 text-center text-[#94A3B8] font-medium text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-[#34D399] font-bold hover:text-[#10B981] transition-colors"
            >
              Create an account
            </Link>
          </p>
          <div className="mt-10 flex items-center justify-center gap-2 text-[#64748B]">
            <ShieldCheck size={14} className="text-[#10B981]" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              256-bit SSL Encrypted
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
