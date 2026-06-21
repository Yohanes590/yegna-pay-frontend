"use client"
import { LayoutDashboard, LogOut, HomeIcon, PlusCircle, FolderOpen, FileCode2, Bell, BellDot } from "lucide-react"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserData } from "@/lib/hooks/user_data_fetch";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import LoadingScreen from "../loading";

export default function SideNavRender() {
    const pathName = usePathname();

    const pathSegments = pathName.split('/').filter(Boolean);
    const isProjectDetailPage = pathSegments.length >= 3;
    const projectId = pathSegments[1];
    const [LoaderScreen, setLoadingScreen] = useState<boolean>(true)
    const StoredData = useUserData()

    const { user, function: fetchUserData } = StoredData

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    useEffect(() => {
        if (!user || Object.keys(user).length === 0) {
            return;
        }

        const responseStatus = user?.status || user?.data?.status;

        // console.log("Current user object state:", user);

        const isSuccessfulFetch = responseStatus === 200 || (user && !responseStatus && (user.id || user._id || user.email));

        if (isSuccessfulFetch) {
            setLoadingScreen(false)
        } else {
            toast.error("This user account is banned! Please contact us.")
            setTimeout(() => { window.location.href = "/" }, 2500)
        }
    }, [user])

    const topLevelNav = [
        // { title: "Home", icon: <HomeIcon size={18} />, href: "/" },
        { title: "Dashboard", icon: <LayoutDashboard size={18} />, href: "/dashboard" },
        { title: "New Project", icon: <PlusCircle size={18} />, href: "/dashboard/create-project" },
        { title: "Notification", icon: <BellDot size={18} />, href: "/dashboard/notification" },
        { title: "API Docs", icon: <FileCode2 size={18} />, href: "/documentation" },
    ];

    const projectNav = [
        { title: "Back to Projects", icon: <HomeIcon size={18} />, href: "/dashboard" },
        { title: "Overview", icon: <FolderOpen size={18} />, href: `/dashboard/${projectId}` },
    ];

    const navItems = isProjectDetailPage ? projectNav : topLevelNav;

    const isActive = (href: string) => {
        if (href === "/dashboard" && pathName === "/dashboard") return true;
        if (href === "/dashboard" && isProjectDetailPage) return false;
        if (href !== "/dashboard" && href !== "/") return pathName.startsWith(href);
        return false;
    };

    if (LoaderScreen) {
        return (<LoadingScreen />)
    }

    return (
        <div className="w-[260px] h-screen fixed left-0 top-0 z-40 bg-[#0A0F1C] border-r border-[#1E293B] flex flex-col shadow-[4px_0_30px_rgba(0,0,0,0.5)]">

            {/* Logo */}
            <div className="px-6 pt-8 pb-6 border-b border-[#1E293B]">
                <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-9 h-9 bg-[#10B981] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_22px_rgba(16,185,129,0.55)] transition-all">
                        <span className="text-[#020617] font-black text-lg">Y</span>
                    </div>
                    <div>
                        <h1 className="text-base font-black text-[#F8FAFC] tracking-tight leading-none">
                            Yegna<span className="text-[#10B981]">Pay</span>
                        </h1>
                        <p className="text-[9px] font-bold text-[#475569] uppercase tracking-widest mt-1">Developer Console</p>
                    </div>
                </Link>
            </div>

            {/* Context Label */}
            <div className="px-6 pt-5 pb-1">
                <p className="text-[9px] font-bold text-[#475569] uppercase tracking-[0.2em]">
                    {isProjectDetailPage ? "Project" : "Workspace"}
                </p>
            </div>

            {/* Nav Items */}
            <div className="flex-1 px-3 pt-2 space-y-1 overflow-y-auto">
                {navItems.map((feature, index) => {
                    const active = isActive(feature.href);
                    return (
                        <Link
                            key={index}
                            href={feature.href}
                            className={`flex items-center gap-3.5 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group border ${active
                                ? "bg-[#10B981]/10 text-[#34D399] border-[#10B981]/25 shadow-[0_0_12px_rgba(16,185,129,0.1)]"
                                : "text-[#94A3B8] hover:bg-[#0F172A] hover:text-[#F8FAFC] border-transparent"
                                }`}
                        >
                            <div className={`transition-colors duration-200 shrink-0 ${active ? "text-[#34D399]" : "text-[#64748B] group-hover:text-[#10B981]"
                                }`}>
                                {feature.icon}
                            </div>
                            <span className="text-sm font-bold tracking-tight">{feature.title}</span>
                            {active && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,1)] shrink-0" />
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* Sign Out */}
            <div className="p-3 border-t border-[#1E293B]">
                <div
                    onClick={() => {
                        if (confirm("Are you sure you want to sign out?")) {
                            Cookies.remove("access_token")
                            setTimeout(() => { window.location.href = "/" }, 800)
                        } else {
                            toast.success("Sign out cancelled.")
                        }
                    }}
                    className="flex items-center gap-3.5 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 text-[#94A3B8] hover:bg-rose-500/10 hover:text-rose-400 border border-transparent hover:border-rose-500/20 group"
                >
                    <div className="group-hover:-translate-x-0.5 transition-transform duration-200 shrink-0">
                        <LogOut size={18} />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wider">Sign Out</span>
                </div>
            </div>
        </div>
    );
}