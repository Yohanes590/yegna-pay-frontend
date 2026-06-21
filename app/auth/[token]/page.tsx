"use client"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"
import Cookie from 'js-cookie'
export default function TokenVerification() {
    const Params = useParams()
    const { token } = Params

    useEffect(() => {
        const VerifyTokenFunction = async () => {
            const RequestServer = await fetch(process.env.NEXT_PUBLIC_YEGNA_SERVER! + "/auth/verify-token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: token
                })
            })
            const serverResponse = await RequestServer.json()
            // console.log(serverResponse)
            if (serverResponse.status == 200) {
                Cookie.set('access_token', serverResponse.token.message,)
                window.location.href = "/dashboard"
            } else {
                toast.error(serverResponse.message)

            }
        }
        VerifyTokenFunction()
    }, [])

    return (
        <>
            <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 font-sans antialiased">
                <div className="w-full max-w-md bg-[#0F172A] rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.05)] border border-[#1E293B] p-10 text-center transition-all">

                    {/* Neon Spinner */}
                    <div className="relative mx-auto w-20 h-20 mb-8">
                        <div className="absolute inset-0 rounded-full border-4 border-[#10B981]/10"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-t-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-spin"></div>
                    </div>

                    {/* Text Headers */}
                    <h2 className="text-2xl font-black text-[#F8FAFC] tracking-tight mb-3">
                        Verifying your account
                    </h2>
                    <p className="text-[#94A3B8] text-sm leading-relaxed mb-8">
                        We're currently validating your secure token with
                        <span className="text-[#10B981] font-bold drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]"> Yegna Pay</span> servers.
                    </p>

                    {/* Progress Bar Container */}
                    <div className="w-full bg-[#020617] h-1.5 rounded-full overflow-hidden border border-[#1E293B] mb-8">
                        <div className="bg-[#10B981] h-full w-2/3 rounded-full shadow-[0_0_12px_#10B981] animate-[pulse_1.5s_infinite]"></div>
                    </div>

                    {/* Bottom Protocol Info */}
                    <div className="pt-6 border-t border-[#1E293B]">
                        <p className="text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">
                            Secure Verification Protocol
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}