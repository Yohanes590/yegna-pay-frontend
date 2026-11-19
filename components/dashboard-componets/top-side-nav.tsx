"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Menu, Calendar, X, ExternalLink, User } from "lucide-react";
import { useUserData } from "@/lib/hooks/user_data_fetch";
import { useSession } from "@/lib/auth-client";
import { resolveProfileDisplay } from "@/lib/user-profile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";

export default function TopSideNav() {
    const { user } = useUserData();
    const { data: session } = useSession();
    const pathname = usePathname();
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [imgError, setImgError] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        let isMounted = true;
        fetch("/api/user/notifications")
            .then((res) => res.json())
            .then((data) => {
                if (isMounted && data?.success && typeof data.unreadCount === "number") {
                    setUnreadCount(data.unreadCount);
                }
            })
            .catch(() => {});
        return () => {
            isMounted = false;
        };
    }, [pathname]);

    const pathSegments = pathname.split("/").filter(Boolean);
    const projectId = pathSegments.length >= 2 && pathSegments[0] === "dashboard" ? pathSegments[1] : (user?.projects?.[0]?.id || "");
    const currentProject = user?.projects?.find((p: any) => p.id === projectId);
    const profile = resolveProfileDisplay(user, session?.user);
    const avatarUrl = profile.avatarUrl;

    useEffect(() => {
        setImgError(false);
    }, [avatarUrl]);

    const handleMobileNav = (tab: string) => {
        setMobileOpen(false);
        if (projectId) router.push(`/dashboard/${projectId}?tab=${tab}`);
        else router.push("/dashboard");
    };

    return (
        <>
            <header className="fixed top-0 left-0 md:left-[260px] right-0 h-[64px] bg-white dark:bg-[#0b131e] border-b border-[#e2e8f0] dark:border-[#1e293b] z-30 flex items-center justify-between px-4 sm:px-8 shadow-2xs transition-colors">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 text-[#475569] dark:text-[#94a3b8] hover:bg-[#f1f5f9] dark:hover:bg-[#1e293b] rounded-lg"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#0f172a] dark:text-[#f8fafc] hidden sm:inline">
                            {currentProject ? currentProject.project_name : "Workspaces"}
                        </span>
                        {currentProject && (
                            <Badge variant="verified" className="text-[10px] hidden sm:inline-flex">
                                Live Environment
                            </Badge>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-[#f8fafc] dark:bg-[#131d2a] border border-[#e2e8f0] dark:border-[#1e293b] rounded-md">
                        <span className="inline-flex rounded-full h-1.5 w-1.5 bg-[#10b981]" />
                        <span className="text-[11px] font-mono font-medium text-[#334155] dark:text-[#94a3b8]">CBE · Awash · BOA</span>
                    </div>

                    <ThemeToggle />

                    <Link
                        href="/dashboard/notification"
                        className={`p-2 rounded-lg relative transition-colors ${pathname === "/dashboard/notification"
                            ? "text-[#34d399] bg-[#131d2a] border border-[#1e293b]"
                            : "text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc] hover:bg-[#f1f5f9] dark:hover:bg-[#1e293b]"
                            }`}
                        title="Notifications"
                    >
                        <Bell size={16} />
                        {unreadCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#059669] rounded-full animate-pulse" />
                        )}
                    </Link>

                    {/* Profile Avatar Header Item */}
                    <div className="flex items-center gap-2.5 pl-2 border-l border-[#e2e8f0] dark:border-[#1e293b]">
                        {avatarUrl && !imgError ? (
                            <img
                                src={avatarUrl}
                                alt={profile.displayName}
                                onError={() => setImgError(true)}
                                className="w-8 h-8 rounded-full object-cover border-2 border-[#059669] shrink-0"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-[#064e3b] text-white flex items-center justify-center text-xs font-bold shrink-0">
                                {profile.rawHandle?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || <User size={13} />}
                            </div>
                        )}
                        <div className="hidden md:block leading-tight">
                            <span className="text-xs font-bold text-[#0f172a] dark:text-[#f8fafc] block truncate max-w-[140px]">
                                {profile.displayName}
                            </span>
                            <span className="text-[10px] text-[#64748b] dark:text-[#94a3b8] font-medium block truncate max-w-[140px]">
                                {profile.subtitle}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Drawer */}
            {mobileOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex">
                    <div className="w-[280px] bg-white dark:bg-[#0b131e] h-full p-5 shadow-2xl flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9] dark:border-[#1e293b]">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded bg-[#064e3b] text-white flex items-center justify-center font-bold text-xs">Y</div>
                                    <span className="font-bold text-sm text-[#0f172a] dark:text-[#f8fafc]">Yegna Pay</span>
                                </div>
                                <button onClick={() => setMobileOpen(false)} className="p-1 rounded text-[#64748b]">
                                    <X size={18} />
                                </button>
                            </div>
                            <nav className="space-y-1">
                                {[
                                    { label: "All Workspaces", tab: "" },
                                    { label: "Overview", tab: "overview" },
                                    { label: "Verifications", tab: "verifications" },
                                    { label: "Transactions", tab: "transactions" },
                                ].map((item) => (
                                    <button
                                        key={item.label}
                                        onClick={() => item.tab === "" ? (setMobileOpen(false), router.push("/dashboard")) : handleMobileNav(item.tab)}
                                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-[#334155] dark:text-[#94a3b8] hover:bg-[#ecfdf5] dark:hover:bg-[#064e3b]/20 hover:text-[#064e3b] dark:hover:text-[#34d399]"
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                        <div className="pt-4 border-t border-[#f1f5f9] dark:border-[#1e293b] flex items-center gap-3">
                            {avatarUrl && !imgError ? (
                                <img src={avatarUrl} alt="Avatar" className="w-9 h-9 rounded-full object-cover border-2 border-[#059669]" />
                            ) : (
                                <div className="w-9 h-9 rounded-full bg-[#064e3b] text-white flex items-center justify-center font-bold text-xs">
                                    {user?.full_name?.charAt(0) || "U"}
                                </div>
                            )}
                            <div className="min-w-0">
                                <p className="text-xs font-bold text-[#0f172a] dark:text-[#f8fafc] truncate">{profile.displayName}</p>
                                <p className="text-[10px] text-[#64748b] dark:text-[#94a3b8] truncate">{profile.subtitle}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1" onClick={() => setMobileOpen(false)} />
                </div>
            )}
        </>
    );
}
