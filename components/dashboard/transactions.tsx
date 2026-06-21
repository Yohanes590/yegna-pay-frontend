"use client"
import { Search } from "lucide-react"
import { useState } from "react"
import DashboardTable from "./dashboard-table"

export default function DashboardTransactions() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedFilter, setSelectedFilter] = useState("all")

    return (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex flex-col md:flex-row items-center gap-4 bg-[#0F172A] p-4 rounded-2xl border border-[#1E293B] shadow-xl">
                <div className="flex-1 flex items-center gap-3 w-full px-4 py-3 bg-[#020617] border border-[#1E293B] rounded-xl focus-within:border-[#10B981] focus-within:ring-1 focus-within:ring-[#10B981]/30 transition-all">
                    <Search size={16} className="text-[#64748B]" />
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search using Transaction ID, Date or Sender name..." 
                        className="bg-transparent border-none outline-none w-full text-sm font-medium text-[#F8FAFC] placeholder:text-[#475569]"
                    />
                </div>
                <div className="w-full md:w-48">
                    <select 
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        className="w-full px-4 py-3.5 bg-[#020617] border border-[#1E293B] rounded-xl outline-none focus:border-[#10B981] text-sm font-bold text-[#94A3B8] appearance-none focus:ring-1 focus:ring-[#10B981]/30 transition-all cursor-pointer"
                    >
                        <option value="all">All Statuses</option>
                        <option value="verified">Verified</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {/* Reusing the Table component */}
            <DashboardTable />
        </div>
    )
}
