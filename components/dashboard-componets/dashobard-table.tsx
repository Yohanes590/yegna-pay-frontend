"use client"

import { Check, TriangleAlert, BadgeAlertIcon } from "lucide-react"
import { useUserData } from "@/lib/hooks/user_data_fetch";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
export default function DashboardTable() {

    const pathName = usePathname()
    const [transactionData, setTransactionData] = useState<any>([])
    const { user, function: fetchUserInformation } = useUserData()

    useEffect(() => {
        fetchUserInformation()
    }, [fetchUserInformation])

    useEffect(() => {
        const extractedID = pathName.split('/')[2]
        const FilteredProject = user?.projects.find((project: any) => project.id === extractedID)
        const TransactionData = FilteredProject.transactions
        setTransactionData(TransactionData)
    }, [user])

    return (<>
        <div className="dashboard-table-container mt-12 p-6 bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="table-container-header mb-8">
                <h1 className="font-bold text-2xl text-slate-800 tracking-tight">Transactions</h1>
                <p className="text-slate-500 text-sm">Review and manage recent inbound activity</p>
            </div>

            <div className="actual-table overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200 text-slate-400 text-sm uppercase tracking-wider">
                            <th className="px-4 py-4 font-medium">Transaction ID</th>
                            <th className="px-4 py-4 font-medium">Sender Name</th>
                            <th className="px-4 py-4 font-medium">Amount</th>
                            <th className="px-4 py-4 font-medium">Method</th>
                            <th className="px-4 py-4 font-medium text-center">Trust Status</th>
                            <th className="px-4 py-4 font-medium text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {transactionData.slice(0, 5).reverse().map((data: any, index: any) => {
                            const status = data.transaction_status.toLowerCase();
                            return (
                                <tr key={index} className="group hover:bg-slate-50/80 transition-colors">
                                    <td className="px-4 py-4 text-sm font-mono text-slate-600 uppercase">{data.transaction_id}</td>
                                    <td className="px-4 py-4 text-sm font-semibold text-slate-700 uppercase">{data.from}</td>
                                    <td className="px-4 py-4 text-sm text-slate-600 font-medium uppercase">{data.transaction_amount} {data.currency}</td>
                                    <td className="px-4 py-4 text-sm text-slate-500">{data.method}</td>
                                    <td className="px-4 py-4">
                                        <div className={`flex items-center justify-center gap-2 px-3 py-1 rounded-full text-xs font-bold w-fit mx-auto ${status === "verified" ? "text-emerald-600 bg-emerald-50" :
                                            status === "pending" ? "text-amber-600 bg-amber-50" :
                                                status === "rejected" ? "text-rose-600 bg-rose-50" : "text-slate-500 bg-slate-50"
                                            }`}>
                                            {status === "verified" && <Check className="w-3.5 h-3.5" />}
                                            {status === "pending" && <BadgeAlertIcon className="w-3.5 h-3.5" />}
                                            {status === "rejected" && <TriangleAlert className="w-3.5 h-3.5" />}
                                            <span className="capitalize">{data.transaction_status}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors hover:underline">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </>)
}