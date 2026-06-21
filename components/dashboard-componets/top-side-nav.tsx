"use client"
import { User2Icon, Bell, ChevronRight } from "lucide-react"
import { useUserData } from "@/lib/hooks/user_data_fetch"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function TopSideNav() {
    const { user, function: fetchUserData } = useUserData()
    const [userName, setUserName] = useState<string>("")
    const [userProfilePicture, setUserProfilePicture] = useState<string>("")
    const pathName = usePathname()

    useEffect(() => {
        fetchUserData()
    }, [fetchUserData])

    useEffect(() => {
        setUserName(user?.full_name || "")
        setUserProfilePicture(user?.avatar_url || "")
    }, [user])

    // Build breadcrumb from pathname
    const pathParts = pathName.split('/').filter(Boolean)
    const breadcrumbs = pathParts.map((part, i) => ({
        label: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
        href: '/' + pathParts.slice(0, i + 1).join('/')
    }))

    return (
        <div className="fixed top-0 left-[260px] right-0 h-[70px] bg-[#0A0F1C] border-b border-[#1E293B] z-30 flex items-center justify-between px-8 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">

            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-sm">
                {breadcrumbs.map((crumb, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                        {i > 0 && <ChevronRight size={14} className="text-[#475569]" />}
                        <Link
                            href={crumb.href}
                            className={`font-semibold transition-colors ${i === breadcrumbs.length - 1
                                    ? "text-[#F8FAFC] cursor-default pointer-events-none"
                                    : "text-[#64748B] hover:text-[#94A3B8]"
                                }`}
                        >
                            {crumb.label}
                        </Link>
                    </div>
                ))}
            </div>

            {/* Right: User */}
            <div className="flex items-center gap-3">
                {/* <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#0F172A] border border-[#1E293B] text-[#64748B] hover:text-[#10B981] hover:border-[#10B981]/40 transition-all">
                    <Bell size={15} />
                </button> */}

                <div className="flex items-center gap-3 pl-3 border-l border-[#1E293B]">
                    {userProfilePicture ? (
                        <img
                            src={userProfilePicture}
                            alt="Profile"
                            className="w-9 h-9 rounded-xl object-cover border-2 border-[#10B981]/30"
                        />
                    ) : (
                        <div className="w-9 h-9 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center">
                            <User2Icon size={15} className="text-[#34D399]" />
                        </div>
                    )}
                    {userName && (
                        <div className="hidden sm:block">
                            <p className="text-sm font-bold text-[#F8FAFC] leading-none">{userName}</p>
                            <p className="text-[9px] text-[#64748B] font-bold uppercase tracking-wider mt-0.5">Developer</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}