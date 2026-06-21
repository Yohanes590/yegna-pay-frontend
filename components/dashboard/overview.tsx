"use client"
import { CreditCard, Calendar, FolderKanban, Activity } from "lucide-react";
import DashboardChartRender from "@/components/dashboard/dashboard-chart";
import DashboardTable from "@/components/dashboard/dashboard-table";

interface OverviewProps {
    totalTransaction: number;
    verifiedTransaction: number;
    totalProjects: number;
}

export default function DashboardOverview({ totalTransaction, verifiedTransaction, totalProjects }: OverviewProps) {
    const cardFeatures = [
        {
            CardTitle: "Total Project Interactions",
            amount: totalTransaction,
            icon: CreditCard,
        },
        {
            CardTitle: "Verified Transactions",
            amount: verifiedTransaction,
            icon: CheckCircle,
        },
        {
            CardTitle: "Active Workspaces",
            amount: totalProjects,
            icon: FolderKanban,
        },
    ];

    return (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cardFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <div
                            key={index}
                            className="flex items-center justify-between p-6 bg-[#0F172A] border border-[#1E293B] rounded-2xl shadow-xl hover:border-[#10B981]/50 transition-all duration-300 group"
                        >
                            <div>
                                <h2 className="text-[#94A3B8] font-bold text-[11px] uppercase tracking-widest">{feature.CardTitle}</h2>
                                <p className="mt-2 text-3xl font-black text-[#F8FAFC] group-hover:text-[#10B981] transition-colors">{feature.amount}</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-[#020617] border border-[#1E293B] flex items-center justify-center text-[#64748B] group-hover:text-[#34D399] group-hover:border-[#10B981]/30 transition-all shadow-inner">
                                <Icon size={22} />
                            </div>
                        </div>
                    );
                })}
            </div>
            <DashboardChartRender />
            <DashboardTable limit={5} />
        </div>
    );
}

// Temporary inline component for missing checkcircle icon, 
// usually pulled from lucide-react but defined here to avoid import issues
function CheckCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}
