"use client"

import { Copy, Eye, EyeClosed, Server, Settings2 } from "lucide-react"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import cryptoRandomString from "crypto-random-string"
import Cookies from "js-cookie"
import { ClipLoader } from "react-spinners"

export default function ProjectCreationRender() {
    const [ShowApiKey, setAPIkey] = useState<boolean>(false)
    const [GeneratedKey, setGeneratedKey] = useState<string>("")
    const [projectName, setProjectName] = useState<string>("")
    const [webcall_back, setCallBackURL] = useState<string>("")
    const [Loading, setLoading] = useState<boolean>(false)
    const [projectDiscription, setDisc] = useState<string>("")
    const [expiresDate, setExpiresDate] = useState<string>("")
    const [paymentReceiverName, setPaymentReceiverName] = useState<string>("")

    useEffect(() => {
        const GenAPIKey = cryptoRandomString({ length: 32, type: "hex" })
        setGeneratedKey(GenAPIKey)
    }, [])

    const CreateProjectHandler = async () => {
        if (!projectName || !GeneratedKey || !projectDiscription || !expiresDate || !paymentReceiverName) {
            toast.error("Please provide all required information")
            return
        }

        setLoading(true)
        const CookieToken = Cookies.get("access_token")
        
        try {
            const RequestServer = await fetch(process.env.NEXT_PUBLIC_YEGNA_SERVER! + "/user/create-project", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: CookieToken,
                    project_name: projectName,
                    api_sec: GeneratedKey,
                    webcall_back: webcall_back,
                    project_discription: projectDiscription,
                    expiresDate: expiresDate,
                    paymentReceiverName: paymentReceiverName
                })
            })
            const ServerResponse = await RequestServer.json()
            if (!RequestServer.ok) {
                toast.error("Internal Server Error")
            } else if (ServerResponse.status == 200) {
                toast.success(ServerResponse.message)
                setTimeout(() => window.location.href = "/dashboard", 1000)
            } else {
                toast.error(ServerResponse.message)
            }
        } catch (error) {
            toast.error("Network constraint: failed to communicate with server.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl min-h-[calc(100vh-140px)] pb-12 animate-in fade-in duration-300">
            {/* Header */}
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#10B981]/10 border border-[#10B981]/20 rounded-xl flex items-center justify-center text-[#34D399]">
                        <Settings2 size={20} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-[#F8FAFC] tracking-tight">Create Workspace</h1>
                        <p className="text-[#94A3B8] text-sm font-medium mt-0.5">Initialize a new project environment</p>
                    </div>
                </div>
            </div>

            <div className="w-full h-[1px] bg-[#1E293B] mb-10" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* General Settings Card */}
                <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 shadow-xl space-y-6 md:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-[#64748B] ml-1">Project Name</label>
                            <input
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                className="w-full bg-[#020617] border border-[#1E293B] text-[#F8FAFC] text-sm font-bold px-4 py-3 rounded-xl focus:ring-1 focus:ring-[#10B981]/50 focus:border-[#10B981] outline-none transition-all placeholder:text-[#475569] placeholder:font-medium" 
                                placeholder="e.g. Acme Ecommerce" 
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-[#64748B] ml-1">Webhook URL <span className="text-[#475569] font-medium lowercase tracking-normal">(Optional)</span></label>
                            <input
                                value={webcall_back}
                                onChange={(e) => setCallBackURL(e.target.value)}
                                className="w-full bg-[#020617] border border-[#1E293B] text-[#F8FAFC] text-sm font-mono px-4 py-3 rounded-xl focus:ring-1 focus:ring-[#10B981]/50 focus:border-[#10B981] outline-none transition-all placeholder:text-[#475569]" 
                                placeholder="https://api.yourdomain.com/webhook" 
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-[#64748B] ml-1">Accept Payments After</label>
                            <input
                                value={expiresDate}
                                onChange={(e) => setExpiresDate(e.target.value)}
                                type="date" 
                                className="w-full bg-[#020617] border border-[#1E293B] text-[#F8FAFC] text-sm font-medium px-4 py-3 rounded-xl focus:ring-1 focus:ring-[#10B981]/50 focus:border-[#10B981] outline-none transition-all [&::-webkit-calendar-picker-indicator]:invert-[0.8]" 
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-[#64748B] ml-1">Receiver Name</label>
                            <input
                                value={paymentReceiverName}
                                onChange={(e) => setPaymentReceiverName(e.target.value)}
                                placeholder="Legal Entity or Merchant Name"
                                type="text" 
                                className="w-full bg-[#020617] border border-[#1E293B] text-[#F8FAFC] text-sm font-bold px-4 py-3 rounded-xl focus:ring-1 focus:ring-[#10B981]/50 focus:border-[#10B981] outline-none transition-all placeholder:text-[#475569] placeholder:font-medium" 
                            />
                        </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[#1E293B]">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#64748B] ml-1 block mt-4">Project Description</label>
                        <textarea
                            value={projectDiscription}
                            onChange={(e) => setDisc(e.target.value)}
                            className="w-full bg-[#020617] border border-[#1E293B] text-[#F8FAFC] text-sm font-medium p-4 rounded-xl h-[120px] focus:ring-1 focus:ring-[#10B981]/50 focus:border-[#10B981] outline-none transition-all placeholder:text-[#475569]" 
                            placeholder="Briefly describe what this project represents..." 
                        />
                    </div>
                </div>

                {/* API Key Showcase */}
                <div className="bg-[#0F172A] border border-[#10B981]/20 rounded-2xl p-6 shadow-[0_0_30px_rgba(16,185,129,0.05)] md:col-span-2">
                    <div className="mb-4">
                        <h2 className="text-lg font-bold text-[#F8FAFC] flex items-center gap-2">
                            <Server size={18} className="text-[#10B981]" />
                            API Secret Generation
                        </h2>
                        <p className="text-xs text-[#94A3B8] font-medium mt-1">This generated key will authenticate your API requests.</p>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-[#020617] border border-[#1E293B] rounded-xl p-2 pl-4 focus-within:border-[#10B981]/50 transition-colors mt-2">
                        <input 
                            type={ShowApiKey ? "text" : "password"}
                            readOnly
                            value={GeneratedKey}
                            className="w-full bg-transparent border-none outline-none text-sm font-mono text-[#34D399] font-bold"
                        />
                        <div className="flex items-center gap-1">
                            <button 
                                onClick={() => setAPIkey(!ShowApiKey)} 
                                className="p-2 hover:bg-[#1E293B] rounded-lg text-[#64748B] hover:text-[#F8FAFC] transition-colors"
                            >
                                {ShowApiKey ? <EyeClosed size={16} /> : <Eye size={16} />}
                            </button>
                            <button 
                                onClick={async () => {
                                    await navigator.clipboard.writeText(GeneratedKey)
                                    toast.success("API key copied to clipboard!")
                                }} 
                                className="p-2 hover:bg-[#1E293B] rounded-lg text-[#64748B] hover:text-[#F8FAFC] transition-colors bg-[#10B981]/10 hover:bg-[#10B981]/20 text-[#10B981]"
                            >
                                <Copy size={16} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Actions */}
            <div className="flex justify-end pt-4 border-t border-[#1E293B]">
                <button
                    disabled={Loading}
                    onClick={CreateProjectHandler}
                    className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#10B981] text-[#020617] text-sm font-extrabold rounded-xl hover:bg-[#34D399] transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] active:scale-[0.98]
                    ${Loading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                    {Loading ? <ClipLoader size={16} color="#020617" /> : "Deploy Workspace"}
                </button>
            </div>
        </div>
    )
}