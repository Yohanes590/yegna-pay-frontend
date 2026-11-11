import { Suspense } from "react";
import SideNavRender from "@/components/dashboard-componets/side-nav-bar";
import TopSideNav from "@/components/dashboard-componets/top-side-nav";
import Unresponsive from "@/components/un-responsive";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#070d14] text-[#0f172a] dark:text-[#f8fafc] transition-colors">
            <Unresponsive />
            <Suspense fallback={null}>
                <SideNavRender />
            </Suspense>
            <TopSideNav />
            <main className="md:pl-[260px] pt-[64px] min-h-screen bg-[#f8fafc] dark:bg-[#070d14] transition-colors">
                <div className="p-4 sm:p-8 max-w-7xl mx-auto">
                    <Suspense fallback={null}>
                        {children}
                    </Suspense>
                </div>
            </main>
        </div>
    );
}
