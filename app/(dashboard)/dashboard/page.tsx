"use client"
import { ChevronRight, PlusCircle, Folders, Trash2, Activity } from "lucide-react"
import Link from "next/link"
import { useUserData } from "@/lib/hooks/user_data_fetch"
import { useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"
import { UserDataFetch } from "@/app/backend-service/api-fetch/fetch-user-data"
import Confirm from "@/components/toast/confirm-toast"
import toast from "react-hot-toast"

export default function DashboardLanding() {
    const [loadingState, setLoadingState] = useState(false)
    const [idPasser, setIdPasser] = useState<string>()
    const [namePasser, setNameValue] = useState<string>()

    interface ProjectTypes {
        id: string,
        project_name: string,
        project_description: string,
    }

    const StoredData = useUserData()
    const { user, function: fetchData, loading } = StoredData
    const [projectArray, setProjectArray] = useState<ProjectTypes[]>([])

    useEffect(() => { fetchData() }, [fetchData])
    useEffect(() => {
        setLoadingState(loading)
        setProjectArray(user?.projects || [])
    }, [user, loading])

    const userData = async () => {
        const functionResponse = await UserDataFetch()
    }

    useEffect(() => {
        userData()
    }, [])



    const DeleteProject = async (transactionId: string, transaction_name: string) => {
        const ToastConfirmation = document.querySelector(".delete-toast") as HTMLElement;
        ToastConfirmation.classList.remove("hidden")
        ToastConfirmation.classList.add("flex")
        setIdPasser(transactionId)
        setNameValue(transaction_name)
    }

    const DeletingResponse = async (data: any) => {
        const ToastConfirmation = document.querySelector(".delete-toast") as HTMLElement;
        if (data.success) {
            toast.success(data.message)
            window.location.reload()
            ToastConfirmation.classList.remove("flex")
            ToastConfirmation.classList.add("hidden")
        } else {
            toast.error(data.message)
            ToastConfirmation.classList.remove("flex")
            ToastConfirmation.classList.add("hidden")
        }
    }

    return (
        <>
            <Confirm project_id={idPasser} project_name={namePasser} SendResponse={DeletingResponse} />
            <div className="min-h-[calc(100vh-70px)]">

                {/* Page Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-[#10B981]/10 border border-[#10B981]/20 rounded-xl flex items-center justify-center text-[#34D399]">
                            <Folders size={20} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-[#F8FAFC] tracking-tight">Your Projects</h1>
                            <p className="text-[#94A3B8] text-sm font-medium mt-0.5">Manage your payment integration projects</p>
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="mt-6 flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0F172A] border border-[#1E293B] rounded-lg">
                            <Activity size={14} className="text-[#10B981]" />
                            <span className="text-[11px] font-bold text-[#94A3B8]">
                                <span className="text-[#F8FAFC]">{projectArray.length}</span> Active {projectArray.length === 1 ? 'Project' : 'Projects'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                            <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest">All Systems Operational</span>
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="flex gap-6 flex-wrap">

                    {/* Create Project Card */}
                    <div
                        onClick={() => window.location.href = "/dashboard/create-project"}
                        className="group relative w-[360px] h-[220px] flex flex-col justify-center items-center rounded-2xl border-2 border-dashed border-[#1E293B] cursor-pointer transition-all duration-300 hover:border-[#10B981] hover:bg-[#10B981]/5 bg-[#0F172A]"
                    >
                        <div className="flex flex-col items-center gap-3 transition-transform duration-300 group-hover:scale-105">
                            <div className="w-14 h-14 bg-[#020617] border border-[#1E293B] group-hover:border-[#10B981]/50 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] rounded-2xl flex items-center justify-center transition-all">
                                <PlusCircle size={26} className="text-[#64748B] group-hover:text-[#34D399] transition-colors" />
                            </div>
                            <p className="text-sm font-bold text-[#94A3B8] group-hover:text-[#34D399] transition-colors">Create New Project</p>
                        </div>
                    </div>

                    {loadingState ? (
                        <div className="w-[360px] h-[220px] flex items-center justify-center bg-[#0F172A] rounded-2xl border border-[#1E293B]">
                            <ClipLoader size={32} color="#10B981" />
                        </div>
                    ) : (
                        projectArray.map((items, index) => (
                            <div key={index} className="group relative bg-[#0F172A] w-[360px] h-[220px] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-[#1E293B] cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-[#10B981]/40 hover:-translate-y-1">
                                <div className="p-6 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-3">
                                        <h1 className="font-bold text-lg text-[#F8FAFC] tracking-tight">
                                            {items.project_name}
                                        </h1>
                                        <button
                                            onClick={() => DeleteProject(items.id, items.project_name)}
                                            className="p-2 text-[#64748B] hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors duration-200"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    {/* Animated accent line */}
                                    <div className="w-8 h-0.5 bg-[#10B981]/30 rounded-full mb-3 group-hover:w-full transition-all duration-500 ease-in-out group-hover:bg-[#10B981]" />

                                    <p className="text-[#94A3B8] text-sm leading-relaxed flex-1 font-medium">
                                        {items.project_description.length > 80
                                            ? `${items.project_description.slice(0, 80)}...`
                                            : items.project_description}
                                    </p>

                                    <div className="mt-4">
                                        <Link
                                            href={`/dashboard/${items.id}`}
                                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#10B981] text-[#020617] text-sm font-extrabold rounded-xl hover:bg-[#34D399] transition-all shadow-[0_0_10px_rgba(16,185,129,0.2)] hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] active:scale-95"
                                        >
                                            Open Project <ChevronRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}
