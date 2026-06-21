"use client "
import { PieChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie } from 'recharts';
import { Check, TriangleAlert } from 'lucide-react';
import { useUserData } from '@/lib/hooks/user_data_fetch';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
export default function DashboardChartRender() {

    const [ChartData, setChartData] = useState<object[]>([])
    const [verifiedTransactions, setVerifiedTransactions] = useState<any>()
    const [unVerifiedTransaction, setUnVerifiedTransaction] = useState<any>()
    const data = ChartData

    const VerifiedData = [
        { name: 'Verified', value: verifiedTransactions },
        { name: 'Unverified', value: unVerifiedTransaction },
    ]

    const { user, function: fetchTransactionData, } = useUserData()
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

    return (<>

        <div className="dashboard-render-container mt-[40px] cursor-default">

            <div className="actual-chart mt-[20px] flex gap-2 items-center">
                <div className="month-line-chart bg-white w-[750px] rounded-lg shadow-lg p-[20px]">
                    <div className="chart-title mb-[30px] ml-[25px] text-[20px]">
                        <h1>Monthly Revenue Data</h1>
                    </div>
                    <LineChart width={650} height={335} data={data} className='outline-none'>
                        <YAxis dataKey="sales" axisLine={false} tickLine={false} />
                        <XAxis dataKey="name" />
                        <Tooltip wrapperStyle={{ outline: "none" }} />
                        <Legend />
                        <Line type="monotone" dataKey="sales" stroke='#155DFC' />
                    </LineChart>
                </div>

                <div className="month-line-chart bg-white w-[750px] rounded-lg shadow-lg p-[20px]">
                    <div className="chart-title mb-[30px] ml-[25px] text-[20px]">
                        <h1>Payment Verification</h1>
                    </div>

                    <PieChart width={650} height={300}>

                        <Pie data={VerifiedData}
                            fill='#155DFC'
                            label={({ value }) => value}
                        />

                    </PieChart>
                    <div className="bottom-data flex gap-7 mt-[10px]">
                        <div className="text-with-icon flex items-center gap-2 text-green-500">
                            <Check className='w-5 h-5' />
                            <h3>Verified Payment</h3>
                            <span className='font-bold'>{VerifiedData[0].value}</span>
                        </div>
                        <div className="text-with-icon text-yellow-500 flex items-center gap-2">
                            <TriangleAlert className='w-5 h-5' />
                            <h3>Unverified Payment</h3>
                            <span className='font-bold'>{VerifiedData[1].value}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>)
}