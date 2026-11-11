"use client";

import { useMemo } from "react";
import { ArrowLeftRight, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatTransactionId } from "@/lib/utils";
import DashboardTable from "@/components/dashboard/dashboard-table";

interface TransactionsProps {
    project: any;
}

export default function DashboardTransactions({ project }: TransactionsProps) {
    const transactions = useMemo(() => project?.transactions || [], [project]);

    const handleExportCSV = () => {
        if (!transactions.length) return;
        const headers = ["Transaction ID", "Bank", "Amount", "Currency", "Status", "Sender", "Date"];
        const rows = transactions.map((t: any) => [
            formatTransactionId(t.transaction_id),
            t.method,
            t.transaction_amount,
            t.currency || "ETB",
            t.transaction_status,
            `"${t.from || ""}"`,
            t.created_at,
        ]);
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e: any[]) => e.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `yegna_pay_transactions_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b] rounded-xl shadow-2xs">
                <div>
                    <h2 className="text-lg font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-2">
                        <ArrowLeftRight size={20} className="text-[#059669] dark:text-[#34d399]" />
                        Transaction Ledger
                    </h2>
                    <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-0.5">
                        Complete verifiable log of incoming payment transactions across connected banking rails
                    </p>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportCSV}
                    disabled={transactions.length === 0}
                    className="gap-2 text-xs"
                >
                    <Download size={14} />
                    <span>Export CSV</span>
                </Button>
            </div>

            <DashboardTable transactions={transactions} showControls={true} />
        </div>
    );
}
