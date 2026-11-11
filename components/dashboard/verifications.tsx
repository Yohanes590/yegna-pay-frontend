"use client";

import { useMemo, useState } from "react";
import { ShieldCheck, CheckCircle2, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTransactionPlatform } from "@/lib/utils";
import DashboardTable from "@/components/dashboard/dashboard-table";

interface VerificationsProps {
    project: any;
}

type BankSubTab = "ALL" | "CBE" | "AWASH" | "BOA";

export default function DashboardVerifications({ project }: VerificationsProps) {
    const [bankTab, setBankTab] = useState<BankSubTab>("ALL");
    const transactions = useMemo(() => project?.transactions || [], [project]);

    const bankCounts = useMemo(() => {
        const counts = { ALL: transactions.length, CBE: 0, AWASH: 0, BOA: 0 };
        for (const tx of transactions) {
            const platform = getTransactionPlatform(tx);
            if (platform === "CBE") counts.CBE += 1;
            else if (platform === "AWASH") counts.AWASH += 1;
            else if (platform === "BOA") counts.BOA += 1;
        }
        return counts;
    }, [transactions]);

    const filteredByBankTab = useMemo(() => {
        if (bankTab === "ALL") return transactions;
        return transactions.filter((t: any) => getTransactionPlatform(t) === bankTab);
    }, [transactions, bankTab]);

    const verifiedCount = filteredByBankTab.filter((t: any) => t.transaction_status === "verified").length;
    const rejectedCount = filteredByBankTab.filter((t: any) => t.transaction_status === "rejected" || t.transaction_status === "failed").length;

    return (
        <div className="space-y-6">
            {/* Header & Verification Engine Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b] rounded-xl shadow-2xs">
                <div>
                    <h2 className="text-lg font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-2">
                        <ShieldCheck size={20} className="text-[#059669] dark:text-[#34d399]" />
                        Verification Management
                    </h2>
                    <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-0.5">
                        Audit financial records, verify statement hashes, and inspect duplicate detection flags
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="verified">
                        <CheckCircle2 size={12} className="mr-1" /> Multi-Bank Consensus Active
                    </Badge>
                </div>
            </div>

            {/* Bank Platform Sub-Tabs (All / CBE / Awash / BOA) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <Tabs value={bankTab} onValueChange={(v) => setBankTab(v as BankSubTab)}>
                    <TabsList className="h-auto p-1 flex-wrap">
                        <TabsTrigger value="ALL" className="gap-1.5">
                            <Building2 size={13} />
                            <span>All Banks</span>
                            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-[#e2e8f0]/70 dark:bg-[#1e293b] text-[#334155] dark:text-[#cbd5e1]">
                                {bankCounts.ALL}
                            </span>
                        </TabsTrigger>
                        <TabsTrigger value="CBE" className="gap-1.5">
                            <span>CBE</span>
                            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-[#e2e8f0]/70 dark:bg-[#1e293b] text-[#334155] dark:text-[#cbd5e1]">
                                {bankCounts.CBE}
                            </span>
                        </TabsTrigger>
                        <TabsTrigger value="AWASH" className="gap-1.5">
                            <span>Awash</span>
                            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-[#e2e8f0]/70 dark:bg-[#1e293b] text-[#334155] dark:text-[#cbd5e1]">
                                {bankCounts.AWASH}
                            </span>
                        </TabsTrigger>
                        <TabsTrigger value="BOA" className="gap-1.5">
                            <span>BOA</span>
                            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-[#e2e8f0]/70 dark:bg-[#1e293b] text-[#334155] dark:text-[#cbd5e1]">
                                {bankCounts.BOA}
                            </span>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Verification Stats Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b] rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-[#64748b] dark:text-[#94a3b8] block">Total Audits</span>
                    <span className="text-2xl font-black font-mono text-[#0f172a] dark:text-[#f8fafc] mt-1 block">
                        {filteredByBankTab.length}
                    </span>
                    <span className="text-[11px] text-[#64748b] dark:text-[#94a3b8] font-medium mt-1 block">
                        {bankTab === "ALL" ? "Across all configured bank rails" : `Filtered by ${bankTab === "AWASH" ? "Awash Bank" : bankTab}`}
                    </span>
                </div>
                <div className="p-4 bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b] rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-[#059669] dark:text-[#34d399] block">Proof Succeeded</span>
                    <span className="text-2xl font-black font-mono text-[#059669] dark:text-[#34d399] mt-1 block">
                        {verifiedCount}
                    </span>
                    <span className="text-[11px] text-[#059669] dark:text-[#34d399] font-medium mt-1 block">
                        Amount & statement matches confirmed
                    </span>
                </div>
                <div className="p-4 bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b] rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-[#e11d48] block">Anomalies / Mismatches</span>
                    <span className="text-2xl font-black font-mono text-[#e11d48] mt-1 block">
                        {rejectedCount}
                    </span>
                    <span className="text-[11px] text-[#e11d48] font-medium mt-1 block">
                        Prevented replay or mismatched claims
                    </span>
                </div>
            </div>

            {/* Filterable Table with Inspection Dialogs */}
            <DashboardTable transactions={filteredByBankTab} showControls={true} />
        </div>
    );
}

