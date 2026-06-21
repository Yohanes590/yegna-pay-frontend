"use client"
import { Check, TriangleAlert, BadgeAlertIcon } from "lucide-react"
import { useUserData } from "@/lib/hooks/user_data_fetch";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
export default function TransactionPage() {

    const pathName = usePathname()
    const { user, function: fetchUserInformation } = useUserData()
    const [transactionData, setTransactionData] = useState<any>([])
    const [FilteredData, setFilterData] = useState<string>("")
    const [selectedFilter, setSelectFilter] = useState<any>("all")
    useEffect(() => {
        fetchUserInformation()
    }, [fetchUserInformation])

    useEffect(() => {
        const extractedID = pathName.split('/')[2]
        const FilteredProject = user?.projects.find((project: any) => project.id === extractedID)
        const TransactionData = FilteredProject.transactions
        const search = FilteredData.toLowerCase()
        const filterData = TransactionData.filter((transaction: any) => {
            const matchesSearch =
                transaction.transaction_id.toLowerCase().includes(search) ||
                transaction.from.toLowerCase().includes(search) ||
                transaction.currency.toLowerCase().includes(search) ||
                transaction.method.toLowerCase().includes(search) ||
                transaction.transaction_amount == search

            const matchesStatus =
                selectedFilter === "all" ||
                transaction.transaction_status.toLowerCase() === selectedFilter

            return matchesSearch && matchesStatus
        })
        setTransactionData(filterData)
    }, [user, FilteredData, selectedFilter])

    return (
        <div className="h-screen">
            <div className="transaction-header">
                <h1 className="text-2xl">Transactions</h1>
                <p>Review and manage recent inbound activity</p>
            </div>

            <div className="search-transaction mt-[20px] flex items-center gap-2">
                <div className="search-box-container bg-white w-[83%] h-[50px] flex  pl-[20px] shadow-md rounded-xl overflow-hidden items-center">
                    <input
                        value={FilteredData}
                        onChange={(e: any) => setFilterData(e.target.value)}
                        type="text" className="bg-white outline-none w-full " placeholder="Search Sender Name, Date , Transaction ID" />
                </div>
                <div className="filter-selection">
                    <select value={selectedFilter} onChange={(e: any) => setSelectFilter(e.target.value)} className="bg-white h-[50px] shadow-md rounded-lg w-[200px] outline-blue-500/50 pl-[20px]">
                        <option value="all">All</option>
                        <option value="verified">Verified</option>
                        <option value="rejected">Rejected</option>
                        {/* <option>Pending</option>
                        <option>Screen Shot</option> */}
                    </select>
                </div>
            </div>

            <div className="transaction-table mt-[20px]">
                <table className="w-[97%] text-left border-collapse bg-white rounded-xl shadow-sm">
                    <thead>
                        <tr className="border-b border-slate-200 text-slate-400 text-sm uppercase tracking-wider">
                            <th className="px-4 py-4 font-medium">Transaction ID</th>
                            <th className="px-4 py-4 font-medium">Sender Name</th>
                            <th className="px-4 py-4 font-medium">Amount</th>
                            <th className="px-4 py-4 font-medium">Method</th>
                            <th className="px-4 py-4 font-medium">Date & Time</th>
                            <th className="px-4 py-4 font-medium text-center">Trust Status</th>
                            <th className="px-4 py-4 font-medium text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {transactionData?.reverse().map((data: any, index: any) => {
                            const status = data.transaction_status.toLowerCase();
                            return (
                                <tr key={index} className="group hover:bg-slate-50/80 transition-colors">
                                    <td className="px-4 py-4 text-sm font-mono text-slate-600 uppercase">{data.transaction_id}</td>
                                    <td className="px-4 py-4 text-sm font-semibold text-slate-700 uppercase">{data.from}</td>
                                    <td className="px-4 py-4 text-sm text-slate-600 font-medium">{data.transaction_amount} {data.currency}</td>
                                    <td className="px-4 py-4 text-sm text-slate-500">{data.method}</td>
                                    <td className="px-4 py-4 text-sm text-slate-500">
                                        {new Date(data.created_at).toLocaleString()}
                                    </td>
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
    );
}