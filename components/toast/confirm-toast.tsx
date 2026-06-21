"use client"
import { ShieldAlert, AlertTriangle } from "lucide-react"
import Cookies from "js-cookie"
import { useState } from "react"
import { ClipLoader } from "react-spinners"

type TransactionID = {
    project_id: string | undefined,
    project_name: string | undefined,
    SendResponse: (data: any) => void
}

export default function Confirm({ project_id, project_name, SendResponse }: TransactionID) {
    const [buttonLoading, setButtonLoading] = useState<boolean>(false)

    const ActionFunction = async (actionType: string) => {
        const ToastConfirmation = document.querySelector(".delete-toast") as HTMLElement;
        const token = Cookies.get("access_token")
        
        if (actionType == "cancel") {
            ToastConfirmation.classList.remove("flex")
            ToastConfirmation.classList.add("hidden")
        } else {
            setButtonLoading(true)
            try {
                const RequestServer = await fetch(process.env.NEXT_PUBLIC_YEGNA_SERVER! + "/user/delete-project", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        project_id: project_id,
                        user_token: token
                    })
                })
                const serverResponse = await RequestServer.json()
                SendResponse(serverResponse)
            } catch (error) {
                console.error(error)
            } finally {
                setButtonLoading(false)
            }
        }
    }

    return (
        <div className="delete-toast hidden inset-0 z-[100] fixed items-center justify-center bg-[#020617]/80 backdrop-blur-md">
            <div className="bg-[#0F172A] w-[400px] rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] border border-[#1E293B] p-8 transform transition-all animate-in fade-in zoom-in-95 duration-300 relative overflow-hidden group">
                
                {/* Decorative Glow */}
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#10B981]/10 rounded-full blur-[60px] pointer-events-none" />

                <div className="flex flex-col items-center text-center relative z-10">
                    
                    {/* Icon */}
                    <div className="w-14 h-14 bg-[#020617] border border-[#1E293B] rounded-2xl flex items-center justify-center mb-5 shadow-inner">
                        <AlertTriangle className="text-[#10B981]" size={28} />
                    </div>

                    <h2 className="text-2xl font-black text-[#F8FAFC] tracking-tight mb-2">Confirm Action</h2>
                    <p className="text-[#94A3B8] font-medium leading-relaxed text-sm">
                        Are you sure you want to continue? This action will permanently affect the 
                        <span className="font-bold text-[#F8FAFC]"> {project_name} </span>
                        workspace environment.
                    </p>
                </div>

                <div className="flex gap-3 mt-8 relative z-10">
                    <button
                        onClick={() => ActionFunction("cancel")}
                        disabled={buttonLoading}
                        className="flex-1 px-4 py-3 bg-[#020617] hover:bg-[#1E293B] border border-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] font-bold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={buttonLoading}
                        onClick={() => ActionFunction("delete")}
                        className={`flex-1 px-4 py-3 flex justify-center items-center gap-2 font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]
                        ${buttonLoading 
                            ? "bg-[#10B981]/50 cursor-not-allowed text-[#020617]" 
                            : "bg-[#10B981] hover:bg-[#34D399] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] text-[#020617]"
                        }`}
                    >
                        {buttonLoading ? (
                            <>
                                Processing
                                <ClipLoader color="#020617" size={16} />
                            </>
                        ) : (
                            <>Confirm</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}