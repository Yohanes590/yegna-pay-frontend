import SideNavRender from "@/components/dashboard-componets/side-nav-bar";
import TopSideNav from "@/components/dashboard-componets/top-side-nav";
import Unresponsive from "@/components/un-responsive";
export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen bg-[#020617]">
            <Unresponsive />
            <SideNavRender />
            <TopSideNav />
            <div className="pl-[260px] pt-[70px] min-h-screen bg-[#020617]">
                <div className="p-8 max-w-7xl">
                    {children}
                </div>
            </div>
        </main>
    );
}
