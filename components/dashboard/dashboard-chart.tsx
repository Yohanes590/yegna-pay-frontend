"use client"
import { PieChart, LineChart, Line, XAxis, YAxis, Tooltip, Legend, Pie, ResponsiveContainer } from 'recharts';
import { Check, TriangleAlert } from 'lucide-react';
import { useUserData } from '@/lib/hooks/user_data_fetch';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function DashboardChartRender() {
    const [ChartData, setChartData] = useState<object[]>([])
    const [verifiedTransactions, setVerifiedTransactions] = useState<any>(0)
    const [unVerifiedTransaction, setUnVerifiedTransaction] = useState<any>(0)
    const data = ChartData

    const VerifiedData = [
        { name: 'Verified', value: verifiedTransactions },
        { name: 'Unverified', value: unVerifiedTransaction },
    ]

    const { user, function: fetchTransactionData } = useUserData()
    const pathName = usePathname()
    
    useEffect(() => {
        fetchTransactionData()
    }, [fetchTransactionData])

    useEffect(() => {
        const extractedID = pathName.split("/")[2];
        const TransactionData = user?.projects.find((projects: any) => projects?.id == extractedID);
        const transactions = TransactionData?.transactions || [];
        const DateFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });
        const chartDate = transactions.map((t: any) => ({
            name: DateFormatter.format(new Date(t.created_at)),
            sales: Number(t.transaction_amount || 0)
        }));

        setChartData(chartDate);

        const verifiedCount = transactions.filter((t: any) => t.transaction_status === "verified").length;
        const rejectedCount = transactions.filter((t: any) => t.transaction_status === "rejected").length;

        setVerifiedTransactions(verifiedCount);
        setUnVerifiedTransaction(rejectedCount);

    }, [pathName, user])

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6 cursor-default">
            
            <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl shadow-xl p-6">
                <div className="mb-6">
                    <h1 className="text-lg font-bold text-[#F8FAFC]">Monthly Revenue Data</h1>
                    <p className="text-xs text-[#94A3B8] font-medium mt-0.5">Aggregated incoming volumes</p>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#020617', border: '1px solid #1E293B', borderRadius: '12px' }}
                                itemStyle={{ color: '#10B981' }}
                            />
                            <Legend wrapperStyle={{ fontSize: '12px', color: '#94A3B8' }} />
                            <Line type="monotone" dataKey="sales" stroke='#10B981' strokeWidth={3} dot={{ r: 4, fill: '#0F172A', stroke: '#10B981', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#10B981' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl shadow-xl p-6 flex flex-col items-center xl:items-start text-center xl:text-left">
                <div className="mb-6 w-full">
                    <h1 className="text-lg font-bold text-[#F8FAFC]">Payment Verification</h1>
                    <p className="text-xs text-[#94A3B8] font-medium mt-0.5">Real-time anomaly metrics</p>
                </div>

                <div className="h-[240px] w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie 
                                data={VerifiedData}
                                fill='#10B981'
                                label={({ value }) => value > 0 ? value : ''}
                                stroke='#0F172A'
                                strokeWidth={4}
                            />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#020617', border: '1px solid #1E293B', borderRadius: '8px' }}
                                itemStyle={{ color: '#F8FAFC' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex gap-8 mt-auto w-full justify-center xl:justify-start pt-4 border-t border-[#1E293B]">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#34D399]">
                            <Check size={16} />
                        </div>
                        <div className="text-left">
                            <h3 className="text-[10px] uppercase tracking-widest font-bold text-[#64748B]">Verified</h3>
                            <span className='font-bold text-[#F8FAFC]'>{VerifiedData[0].value}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                            <TriangleAlert size={16} />
                        </div>
                        <div className="text-left">
                            <h3 className="text-[10px] uppercase tracking-widest font-bold text-[#64748B]">Unverified</h3>
                            <span className='font-bold text-[#F8FAFC]'>{VerifiedData[1].value}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
