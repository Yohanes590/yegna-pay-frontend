"use client";

import { useMemo } from "react";
import { CheckCircle2, XCircle, Clock, Zap, ArrowUpRight, TrendingUp } from "lucide-react";
import DashboardChartRender from "@/components/dashboard/dashboard-chart";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePublicConfig } from "@/lib/hooks/use-public-config";

interface OverviewProps {
    project: any;
}

export default function DashboardOverview({ project }: OverviewProps) {
    const { requestCurrency, currency } = usePublicConfig();
    const transactions = useMemo(() => project?.transactions || [], [project]);

    const stats = useMemo(() => {
        const total = transactions.length;
        const verified = transactions.filter((t: any) => t.transaction_status === "verified").length;
        const rejected = transactions.filter((t: any) => t.transaction_status === "rejected").length;
        const pending = transactions.filter((t: any) => t.transaction_status === "pending").length;
        const successRate = total > 0 ? ((verified / total) * 100).toFixed(1) : "100.0";
        const totalFees = (total * requestCurrency).toFixed(2);
        const totalVolume = transactions
            .reduce((acc: number, t: any) => acc + Number(t.transaction_amount || 0), 0)
            .toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        return { total, verified, rejected, pending, successRate, totalFees, totalVolume };
    }, [transactions, requestCurrency]);

    return (
        <div className="space-y-6">
            {/* Top Metric Showcase: Asymmetric Hierarchy */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Primary Hero Metric: Success Rate & Verification Volume */}
                <Card className="lg:col-span-2 border-[#e2e8f0] dark:border-[#1e293b] bg-white dark:bg-[#0c141f] shadow-xs">
                    <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#f1f5f9] dark:border-[#1e293b]">
                            <div>
                                <span className="text-[11px] font-bold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider block">
                                    Primary Verification Performance
                                </span>
                                <div className="flex items-baseline gap-3 mt-1.5">
                                    <h2 className="text-3xl font-black text-[#0f172a] dark:text-[#f8fafc] font-mono tracking-tight">
                                        {stats.successRate}%
                                    </h2>
                                    <Badge variant="verified" className="text-xs">
                                        <TrendingUp size={12} className="mr-1" /> Healthy Rail
                                    </Badge>
                                </div>
                            </div>
                            <div className="text-left sm:text-right">
                                <span className="text-[11px] font-bold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider block">
                                    Processed Volume
                                </span>
                                <p className="text-xl font-black text-[#064e3b] dark:text-[#34d399] font-mono tracking-tight mt-1">
                                    {stats.totalVolume} <span className="text-xs font-semibold text-[#64748b] dark:text-[#94a3b8]">ETB</span>
                                </p>
                            </div>
                        </div>

                        {/* Progress Bar of Verification Health */}
                        <div className="pt-4">
                            <div className="flex items-center justify-between text-xs text-[#64748b] dark:text-[#94a3b8] mb-2 font-medium">
                                <span>Verification Resolution Rate</span>
                                <span className="font-mono text-[#0f172a] dark:text-[#f8fafc] font-bold">{stats.verified} / {stats.total} settled</span>
                            </div>
                            <div className="h-2 w-full bg-[#f1f5f9] dark:bg-[#1e293b] rounded-full overflow-hidden flex">
                                <div
                                    className="bg-[#059669] transition-all duration-500"
                                    style={{ width: `${Math.max(parseFloat(stats.successRate), 5)}%` }}
                                />
                                {stats.rejected > 0 && (
                                    <div
                                        className="bg-[#e11d48] transition-all duration-500"
                                        style={{ width: `${(stats.rejected / stats.total) * 100}%` }}
                                    />
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Verification Fees Summary */}
                <Card className="border-[#e2e8f0] dark:border-[#1e293b] bg-white dark:bg-[#0c141f] shadow-xs flex flex-col justify-between">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider">
                                Accrued Verification Fees
                            </span>
                            <Zap size={16} className="text-[#059669] dark:text-[#34d399]" />
                        </div>
                        <div className="mt-3">
                            <h3 className="text-3xl font-black text-[#0f172a] dark:text-[#f8fafc] font-mono tracking-tight">
                                {stats.totalFees} <span className="text-xs font-semibold text-[#64748b] dark:text-[#94a3b8]">{currency}</span>
                            </h3>
                            <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1 font-medium">
                                Fixed tariff of <span className="font-bold text-[#064e3b] dark:text-[#34d399]">{requestCurrency.toFixed(2)} {currency}</span> per verification
                            </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-[#f1f5f9] dark:border-[#1e293b] flex items-center justify-between text-xs">
                            <span className="text-[#64748b] dark:text-[#94a3b8]">Billable Requests</span>
                            <span className="font-mono font-bold text-[#0f172a] dark:text-[#f8fafc]">{stats.total} reqs</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Compact Metric Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <MetricCell label="Total Requests" value={stats.total} icon={ArrowUpRight} color="text-[#0f172a] dark:text-[#f8fafc]" />
                <MetricCell label="Successful" value={stats.verified} icon={CheckCircle2} color="text-[#059669] dark:text-[#34d399]" />
                <MetricCell label="Failed / Rejected" value={stats.rejected} icon={XCircle} color="text-[#e11d48]" />
                <MetricCell label="Pending Settlement" value={stats.pending} icon={Clock} color="text-[#d97706]" />
            </div>

            {/* Real Data Activity Visualizer */}
            <DashboardChartRender transactions={transactions} />

            {/* Recent Verification Activity Table */}
            <DashboardTable transactions={transactions} limit={5} />
        </div>
    );
}

function MetricCell({ label, value, icon: Icon, color }: { label: string; value: number; icon: any; color: string }) {
    return (
        <div className="p-4 rounded-xl bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b] shadow-2xs">
            <div className="flex items-center justify-between text-[#64748b] dark:text-[#94a3b8] mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
                <Icon size={14} className={color} />
            </div>
            <p className={`text-2xl font-black font-mono tracking-tight ${color}`}>{value}</p>
        </div>
    );
}
