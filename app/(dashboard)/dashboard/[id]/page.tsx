"use client";

import { useEffect, useState, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    LayoutDashboard, CheckCircle2, ArrowLeftRight, QrCode,
    KeyRound, Code2, Receipt, Settings, FolderOpen, AlertCircle
} from "lucide-react";
import { useUserData } from "@/lib/hooks/user_data_fetch";
import DashboardOverview from "@/components/dashboard/overview";
import DashboardVerifications from "@/components/dashboard/verifications";
import DashboardTransactions from "@/components/dashboard/transactions";
import DashboardQrImages from "@/components/dashboard/qr-images";
import DashboardApiKeys from "@/components/dashboard/api-keys";
import DashboardDevelopers from "@/components/dashboard/developer-experience";
import DashboardBilling from "@/components/dashboard/usage-billing";
import DashboardSettings from "@/components/dashboard/settings";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectDashboardPage() {
    const { user, function: fetchUser, loading } = useUserData();
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const activeTab = searchParams.get("tab") || "overview";

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const projectId = useMemo(() => {
        const parts = pathname.split("/").filter(Boolean);
        return parts.length >= 2 ? parts[1] : "";
    }, [pathname]);

    const currentProject = useMemo(() => {
        return user?.projects?.find((p: any) => p.id === projectId) || user?.projects?.[0];
    }, [user, projectId]);

    const handleTabChange = (tab: string) => {
        router.push(`/dashboard/${projectId}?tab=${tab}`);
    };

    if (loading && !currentProject) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-14 w-full" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Skeleton className="h-28 w-full" />
                    <Skeleton className="h-28 w-full" />
                    <Skeleton className="h-28 w-full" />
                </div>
                <Skeleton className="h-72 w-full" />
            </div>
        );
    }

    if (!loading && !currentProject) {
        return (
            <div className="p-8 bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b] rounded-2xl text-center max-w-lg mx-auto mt-12">
                <div className="w-12 h-12 rounded-full bg-[#f1f5f9] dark:bg-[#131d2a] flex items-center justify-center mx-auto text-[#64748b] dark:text-[#94a3b8] mb-4">
                    <FolderOpen size={24} />
                </div>
                <h3 className="text-base font-bold text-[#0f172a] dark:text-[#f8fafc]">Workspace Not Found</h3>
                <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1.5 mb-6">
                    This project may have been deleted or you do not have permission to access it.
                </p>
                <a href="/dashboard" className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold bg-[#064e3b] dark:bg-[#059669] text-white rounded-lg">
                    Return to Workspaces
                </a>
            </div>
        );
    }

    const tabList = [
        { id: "overview", label: "Overview", icon: LayoutDashboard },
        { id: "verifications", label: "Verifications", icon: CheckCircle2 },
        { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
        { id: "qr-images", label: "QR Images", icon: QrCode },
        { id: "apikeys", label: "API Keys", icon: KeyRound },
        { id: "developers", label: "Developer API", icon: Code2 },
        { id: "billing", label: "Usage & Billing", icon: Receipt },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className="space-y-6 pb-12">
            {/* Top Workspace Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <div>
                    <h1 className="text-2xl font-black text-[#0f172a] dark:text-[#f8fafc] tracking-tight">
                        {currentProject?.project_name || "Workspace"}
                    </h1>
                    <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-0.5">
                        {currentProject?.project_description || "Enterprise payment verification console"}
                    </p>
                </div>
            </div>

            {/* Inner Tabs Bar */}
            <div className="overflow-x-auto no-scrollbar">
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="bg-[#f1f5f9] p-1 border border-[#e2e8f0] flex w-max sm:w-auto">
                        {tabList.map((t) => {
                            const Icon = t.icon;
                            return (
                                <TabsTrigger key={t.id} value={t.id} className="gap-2 text-xs font-semibold">
                                    <Icon size={14} />
                                    <span>{t.label}</span>
                                </TabsTrigger>
                            );
                        })}
                    </TabsList>
                </Tabs>
            </div>

            {/* Tab Views */}
            <div className="pt-2">
                {activeTab === "overview" && <DashboardOverview project={currentProject} />}
                {activeTab === "verifications" && <DashboardVerifications project={currentProject} />}
                {activeTab === "transactions" && <DashboardTransactions project={currentProject} />}
                {activeTab === "qr-images" && <DashboardQrImages project={currentProject} />}
                {activeTab === "apikeys" && <DashboardApiKeys project={currentProject} />}
                {activeTab === "developers" && <DashboardDevelopers project={currentProject} />}
                {activeTab === "billing" && <DashboardBilling project={currentProject} user={user} />}
                {activeTab === "settings" && <DashboardSettings project={currentProject} />}
            </div>
        </div>
    );
}
