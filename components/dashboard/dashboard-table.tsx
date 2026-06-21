"use client"
import { Check, TriangleAlert, BadgeAlertIcon } from "lucide-react"
import { useUserData } from "@/lib/hooks/user_data_fetch";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function DashboardTable({ limit }: { limit?: number }) {
    const pathName = usePathname()
    const [transactionData, setTransactionData] = useState<any>([])
    const { user, function: fetchUserInformation } = useUserData()

    useEffect(() => {
        fetchUserInformation()
    }, [fetchUserInformation])

    useEffect(() => {
        const extractedID = pathName.split('/')[2]
        const FilteredProject = user?.projects.find((project: any) => project.id === extractedID)
        const TransactionData = FilteredProject?.transactions || []
        setTransactionData(TransactionData)
    }, [user, pathName])

    const displayedData = limit ? transactionData.slice(0, limit) : transactionData;

    return (
        <div className="mt-6 bg-[#0F172A] rounded-2xl shadow-xl border border-[#1E293B] overflow-hidden">
            <div className="p-6 border-b border-[#1E293B] flex justify-between items-end">
                <div>
                    <h1 className="font-bold text-lg text-[#F8FAFC] tracking-tight">Recent Transactions</h1>
                    <p className="text-[#94A3B8] text-xs font-medium mt-0.5">Review continuous inbound activity</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[#1E293B] bg-[#020617]/50 text-[#64748B] text-[10px] uppercase tracking-wider font-bold">
                            <th className="px-6 py-4">Transaction ID</th>
                            <th className="px-6 py-4">Sender Name</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Method</th>
                            <th className="px-6 py-4 text-center">Status</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]">
                        {displayedData.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-[#64748B] text-sm">
                                    No transactions found.
                                </td>
                            </tr>
                        ) : (
                            displayedData.reverse().map((data: any, index: any) => {
                                const status = data.transaction_status?.toLowerCase();
                                return (
                                    <tr key={index} className="group hover:bg-[#1E293B]/30 transition-colors">
                                        <td className="px-6 py-4 text-sm font-mono text-[#475569] uppercase group-hover:text-[#94A3B8] transition-colors">{data.transaction_id}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-[#F8FAFC] uppercase">{data.from}</td>
                                        <td className="px-6 py-4 text-sm text-[#34D399] font-bold uppercase">{data.transaction_amount} {data.currency}</td>
                                        <td className="px-6 py-4 text-sm text-[#94A3B8]">{data.method}</td>
                                        <td className="px-6 py-4">
                                            <div className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider w-fit mx-auto border ${
                                                status === "verified" ? "text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20" :
                                                status === "pending" ? "text-amber-500 bg-amber-500/10 border-amber-500/20" :
                                                status === "rejected" ? "text-rose-400 bg-rose-500/10 border-rose-500/20" : 
                                                "text-[#94A3B8] bg-[#1E293B] border-[#334155]"
                                            }`}>
                                                {status === "verified" && <Check className="w-3.5 h-3.5" />}
                                                {status === "pending" && <BadgeAlertIcon className="w-3.5 h-3.5" />}
                                                {status === "rejected" && <TriangleAlert className="w-3.5 h-3.5" />}
                                                <span>{data.transaction_status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-[#34D399] hover:text-[#10B981] text-xs font-bold transition-colors">
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
