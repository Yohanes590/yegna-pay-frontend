"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { toast } from "sonner";
import {
    LayoutDashboard, CheckCircle2, ArrowLeftRight,
    LogOut, Plus, FolderKanban
} from "lucide-react";
import { useUserData } from "@/lib/hooks/user_data_fetch";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "@/components/theme-toggle";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";

export default function SideNavRender() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, loading, function: fetchUser } = useUserData();
    const [showSignOut, setShowSignOut] = useState(false);
    const [imgError, setImgError] = useState(false);

    useEffect(() => { fetchUser(); }, [fetchUser]);

    useEffect(() => {
        if (loading) return;
        const token = Cookies.get("access_token") || Cookies.get("better-auth.session_token");
        if (!token && !user) router.push("/sign-in");
    }, [user, loading, router]);

    const pathSegments = pathname.split("/").filter(Boolean);
    const isProjectDetail = pathSegments.length >= 2 && pathSegments[0] === "dashboard" && pathSegments[1] !== "create-project" && pathSegments[1] !== "notification";
    const projectId = isProjectDetail ? pathSegments[1] : (user?.projects?.[0]?.id || "");
    const currentProject = user?.projects?.find((p: any) => p.id === projectId) || user?.projects?.[0];

    const currentTab = searchParams.get("tab") || "overview";
    const avatarUrl = user?.avatar_url || (user as any)?.image || "";

    const navItems = useMemo(() => [
        { label: "Overview", icon: LayoutDashboard, tab: "overview" },
        { label: "Verifications", icon: CheckCircle2, tab: "verifications" },
        { label: "Transactions", icon: ArrowLeftRight, tab: "transactions" },
    ], []);

    const handleNavClick = (tab: string) => {
        if (projectId) {
            router.push(`/dashboard/${projectId}?tab=${tab}`);
        } else if (user?.projects?.length) {
            router.push(`/dashboard/${user.projects[0].id}?tab=${tab}`);
        } else {
            toast.error("Please create a workspace first.");
            router.push("/dashboard/create-project");
        }
    };

    const handleSignOutConfirm = async () => {
        Cookies.remove("access_token");
        try { await authClient.signOut(); } catch { }
        toast.success("Signed out successfully.");
        router.push("/sign-in");
    };

    return (
        <>
            <aside className="hidden md:flex w-[260px] h-screen fixed left-0 top-0 z-40 bg-white dark:bg-[#0b131e] border-r border-[#e2e8f0] dark:border-[#1e293b] flex-col shadow-xs transition-colors">
                {/* Brand Header */}
                <div className="p-4 border-b border-[#f1f5f9] dark:border-[#1e293b] flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#064e3b] dark:bg-[#059669] flex items-center justify-center text-white font-black text-sm shadow-xs">
                            Y
                        </div>
                        <div>
                            <span className="font-extrabold text-sm text-[#0f172a] dark:text-[#f8fafc] tracking-tight block">
                                Yegna<span className="text-[#059669] dark:text-[#34d399]">Pay</span>
                            </span>
                            <span className="text-[9px] text-[#64748b] dark:text-[#94a3b8] font-semibold tracking-wide uppercase block">
                                Banking Infrastructure
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Workspace Hub Links */}
                <div className="p-3 border-b border-[#f1f5f9] dark:border-[#1e293b] space-y-1">
                    <Link
                        href="/dashboard"
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${pathname === "/dashboard"
                            ? "bg-[#ecfdf5] dark:bg-[#064e3b]/30 text-[#064e3b] dark:text-[#34d399] font-bold"
                            : "text-[#475569] dark:text-[#94a3b8] hover:bg-[#f8fafc] dark:hover:bg-[#131d2a]"
                            }`}
                    >
                        <span className="flex items-center gap-2"><FolderKanban size={15} /> All Workspaces</span>
                        <span className="text-[10px] font-mono font-bold bg-[#f1f5f9] dark:bg-[#1e293b] px-1.5 py-0.5 rounded">{user?.projects?.length || 0}</span>
                    </Link>
                    <Link
                        href="/dashboard/create-project"
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#059669] dark:text-[#34d399] hover:bg-[#ecfdf5] dark:hover:bg-[#064e3b]/20 transition-colors"
                    >
                        <Plus size={14} /> <span>New Workspace</span>
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
                    <p className="px-3 pb-1.5 text-[10px] uppercase font-bold tracking-wider text-[#94a3b8] dark:text-[#64748b]">Console Controls</p>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = isProjectDetail && currentTab === item.tab;
                        return (
                            <button
                                key={item.tab}
                                type="button"
                                onClick={() => handleNavClick(item.tab)}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer text-left ${isActive
                                    ? "bg-[#ecfdf5] dark:bg-[#064e3b]/30 text-[#064e3b] dark:text-[#34d399] font-bold border border-[#059669]/20"
                                    : "text-[#475569] dark:text-[#94a3b8] hover:bg-[#f8fafc] dark:hover:bg-[#131d2a] hover:text-[#0f172a] dark:hover:text-[#f8fafc] border border-transparent"
                                    }`}
                            >
                                <Icon size={16} className={isActive ? "text-[#059669] dark:text-[#34d399]" : "text-[#64748b] dark:text-[#64748b]"} />
                                <span>{item.label}</span>
                                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#059669] dark:bg-[#34d399]" />}
                            </button>
                        );
                    })}
                </div>

                {/* Footer User Profile & Sign Out */}
                <div className="p-3 border-t border-[#f1f5f9] dark:border-[#1e293b] bg-[#fafafa] dark:bg-[#09101a]">
                    <div className="flex items-center justify-between p-2 rounded-lg">
                        <div className="flex items-center gap-2.5 min-w-0">
                            {avatarUrl && !imgError ? (
                                <img
                                    src={avatarUrl}
                                    alt={user?.full_name || "Profile"}
                                    onError={() => setImgError(true)}
                                    className="w-8 h-8 rounded-full object-cover border-2 border-[#059669] shrink-0"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-[#064e3b] text-white flex items-center justify-center text-xs font-bold uppercase shrink-0">
                                    {user?.full_name?.charAt(0) || user?.email?.charAt(0) || "U"}
                                </div>
                            )}
                            <div className="min-w-0">
                                <p className="text-xs font-bold text-[#0f172a] dark:text-[#f8fafc] truncate">{user?.full_name || "Merchant"}</p>
                                <p className="text-[10px] text-[#059669] dark:text-[#34d399] font-semibold truncate font-mono">
                                    {user?.request_available ?? 200} reqs left
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowSignOut(true)}
                            className="p-1.5 text-[#64748b] hover:text-[#e11d48] rounded hover:bg-[#fff1f2] dark:hover:bg-[#e11d48]/10 transition-colors cursor-pointer"
                            title="Sign out"
                        >
                            <LogOut size={15} />
                        </button>
                    </div>
                </div>
            </aside>

            <AlertDialog open={showSignOut} onOpenChange={setShowSignOut}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Sign out of Yegna Pay?</AlertDialogTitle>
                        <AlertDialogDescription>Your active session will be closed on this device.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSignOutConfirm}>Sign Out</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
