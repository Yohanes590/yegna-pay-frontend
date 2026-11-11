"use client";

import { useState, useMemo } from "react";
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from "recharts";
import { Calendar, BarChart3, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ChartProps {
    transactions: any[];
}

export default function DashboardChartRender({ transactions }: ChartProps) {
    const [metricType, setMetricType] = useState<"volume" | "count">("volume");

    const chartData = useMemo(() => {
        if (!transactions || transactions.length === 0) return [];

        const grouped: Record<string, { date: string; volume: number; verified: number; failed: number }> = {};

        transactions.forEach((t: any) => {
            const dateObj = new Date(t.created_at || Date.now());
            const key = isNaN(dateObj.getTime())
                ? "Recent"
                : new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(dateObj);

            if (!grouped[key]) {
                grouped[key] = { date: key, volume: 0, verified: 0, failed: 0 };
            }

            const amount = Number(t.transaction_amount || 0);
            grouped[key].volume += amount;
            if (t.transaction_status === "verified") grouped[key].verified += 1;
            else if (t.transaction_status === "rejected") grouped[key].failed += 1;
        });

        return Object.values(grouped);
    }, [transactions]);

    return (
        <Card className="border-[#e2e8f0] dark:border-[#1e293b] bg-white dark:bg-[#0c141f] shadow-xs">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-4">
                <div>
                    <CardTitle className="text-base font-bold text-[#0f172a] dark:text-[#f8fafc]">
                        Verification Activity & Volume
                    </CardTitle>
                    <CardDescription className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                        Real-time settlement throughput across Ethiopian banking rails
                    </CardDescription>
                </div>
                <div className="flex items-center gap-1.5 p-1 bg-[#f1f5f9] dark:bg-[#131d2a] rounded-lg border border-[#e2e8f0] dark:border-[#1e293b] self-start sm:self-auto">
                    <Button
                        size="sm"
                        variant={metricType === "volume" ? "default" : "ghost"}
                        onClick={() => setMetricType("volume")}
                        className={`h-7 px-3 text-xs ${metricType === "volume" ? "bg-[#064e3b] text-white" : "text-[#64748b] dark:text-[#94a3b8]"}`}
                    >
                        Volume (ETB)
                    </Button>
                    <Button
                        size="sm"
                        variant={metricType === "count" ? "default" : "ghost"}
                        onClick={() => setMetricType("count")}
                        className={`h-7 px-3 text-xs ${metricType === "count" ? "bg-[#064e3b] text-white" : "text-[#64748b] dark:text-[#94a3b8]"}`}
                    >
                        Requests
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                {chartData.length === 0 ? (
                    <div className="h-[280px] flex flex-col items-center justify-center text-center p-6 bg-[#f8fafc] dark:bg-[#0c141f] rounded-xl border border-dashed border-[#cbd5e1] dark:border-[#1e293b]">
                        <div className="w-10 h-10 rounded-full bg-[#f1f5f9] dark:bg-[#131d2a] flex items-center justify-center text-[#94a3b8] mb-3">
                            <BarChart3 size={20} />
                        </div>
                        <h4 className="text-sm font-bold text-[#0f172a] dark:text-[#f8fafc]">No Verification Activity Recorded</h4>
                        <p className="text-xs text-[#64748b] dark:text-[#94a3b8] max-w-sm mt-1">
                            Once your application sends verification requests through the Yegna Pay API, activity analytics will automatically plot here.
                        </p>
                    </div>
                ) : (
                    <div className="h-[280px] w-full pt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#059669" stopOpacity={0.25} />
                                        <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#0f172a',
                                        borderRadius: '8px',
                                        border: '1px solid #1e293b',
                                        color: '#ffffff',
                                        fontSize: '12px'
                                    }}
                                    itemStyle={{ color: '#34d399' }}
                                />
                                {metricType === "volume" ? (
                                    <Area
                                        type="monotone"
                                        dataKey="volume"
                                        name="Settled Volume (ETB)"
                                        stroke="#059669"
                                        strokeWidth={2.5}
                                        fill="url(#emeraldGradient)"
                                    />
                                ) : (
                                    <>
                                        <Area
                                            type="monotone"
                                            dataKey="verified"
                                            name="Verified Requests"
                                            stroke="#059669"
                                            strokeWidth={2}
                                            fill="url(#emeraldGradient)"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="failed"
                                            name="Rejected Requests"
                                            stroke="#e11d48"
                                            strokeWidth={2}
                                            fill="none"
                                        />
                                    </>
                                )}
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
