"use client"
import LoadingScreen from "@/components/loading";
import NoProjects from "@/components/dashboard-componets/no-projects";
import { useUserData } from "@/lib/hooks/user_data_fetch";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Copy, Eye, CopyCheck, FolderOpen, Activity, Terminal, Settings } from "lucide-react";

// Modular Components
import DashboardOverview from "@/components/dashboard/overview";
import DashboardTransactions from "@/components/dashboard/transactions";
import DashboardBuyRequest from "@/components/dashboard/buy-request";
import DashboardSettings from "@/components/dashboard/settings";

export default function DashboardPage() {
    const { user, function: fetchUser, loading } = useUserData()
    const pathname = usePathname()

    // Tab State (could be synced to search params later if preferred, but local state is fine per prompt)
    const [activeTab, setActiveTab] = useState<"overview" | "transactions" | "buy-request" | "settings">("overview")

    // Project Data
    const [currentProject, setCurrentProject] = useState<any>(null)
    const [stats, setStats] = useState({ totalTransaction: 0, verifiedTransaction: 0, totalProjects: 0 })

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    useEffect(() => {
        if (!loading && user) {
            const projectId = pathname.split("/")[2]
            const project = user?.projects?.find((p: any) => p.id === projectId)
            setCurrentProject(project)

            if (project) {
                const transactions = project.transactions || []
                const verified = transactions.filter((t: any) => t.transaction_status === "verified").length
                setStats({
                    totalTransaction: transactions.length,
                    verifiedTransaction: verified,
                    totalProjects: user.projects.length
                })
            }
        }
    }, [user, loading, pathname])


    if (loading && !currentProject) return <div className="h-full flex items-center justify-center min-h-[500px]"><div className="w-8 h-8 border-4 border-[#10B981] border-t-transparent rounded-full animate-spin"></div></div>;
    if (!loading && !currentProject && user?.projects) return <NoProjects />;

    const tabs = [
        { id: "overview", label: "Overview", icon: FolderOpen },
        { id: "transactions", label: "Transactions", icon: Activity },
        { id: "buy-request", label: "Buy Request", icon: Terminal },
        { id: "settings", label: "Settings", icon: Settings },
    ] as const;

    return (
        <div className="min-h-screen">

            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-[#F8FAFC] tracking-tight">{currentProject?.project_name || "Project"}</h1>
                        <div className="flex items-center gap-2 mt-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                            <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest">{currentProject?.id}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Inner Navigation Tabs */}
            <div className="flex gap-2 border-b border-[#1E293B] mb-8 overflow-x-auto no-scrollbar">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-5 py-3 border-b-2 text-sm font-bold transition-all whitespace-nowrap ${isActive
                                ? "border-[#10B981] text-[#10B981] bg-[#10B981]/5"
                                : "border-transparent text-[#64748B] hover:text-[#94A3B8] hover:bg-[#1E293B]/30 hover:border-[#1E293B]"
                                }`}
                        >
                            <Icon size={16} />
                            {tab.label}
                        </button>
                    )
                })}
            </div>

            {/* Dynamic Section Mapping */}
            <div className="pb-16 relative">
                {activeTab === "overview" && (
                    <DashboardOverview
                        totalTransaction={stats.totalTransaction}
                        verifiedTransaction={stats.verifiedTransaction}
                        totalProjects={stats.totalProjects}
                    />
                )}

                {activeTab === "transactions" && (
                    <DashboardTransactions />
                )}

                {activeTab === "buy-request" && (
                    <DashboardBuyRequest />
                )}

                {activeTab === "settings" && (
                    <DashboardSettings project={currentProject} />
                )}
            </div>

        </div>
    );
}