"use client";

import { useState, useEffect } from "react";
import { Receipt, CheckCircle2, Building2, Copy, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BuyRequestFunction, FetchBillingInfo } from "@/lib/api_end_poing";
import BillingPurchaseHistory from "@/components/dashboard/billing-purchase-history";

interface BillingProps {
    project: any;
    user: any;
}

export default function DashboardBilling({ user }: BillingProps) {
    const [billingData, setBillingData] = useState<any>(null);
    const [requestCount, setRequestCount] = useState(100);
    const [txId, setTxId] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const loadBilling = async () => {
        const res = await FetchBillingInfo();
        if (res?.success && res.billing) {
            setBillingData(res.billing);
        }
    };

    useEffect(() => {
        loadBilling();
    }, []);

    const freeRemaining = billingData?.free_requests_remaining ?? user?.free_requests_remaining ?? 200;
    const paidBalance = billingData?.paid_requests_balance ?? user?.paid_requests_balance ?? 0;
    const totalUsed = billingData?.total_requests_used ?? ((user?.free_requests_used ?? 0) + (user?.paid_requests_used ?? 0));
    const pricePerReq = billingData?.cost_per_request ?? 0.5;
    const accountName = billingData?.account_user_name ?? "YOHANES MULUGETA KASSAW";
    const accountNumber = billingData?.account_number ?? "013201568261800";
    const purchaseHistory = billingData?.purchase_history ?? user?.revenues ?? [];
    const totalCost = (requestCount * pricePerReq).toFixed(2);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`Copied: ${text}`);
    };

    const handleBuyRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!txId.trim()) return toast.error("Please enter the payment transaction reference ID.");
        if (requestCount < 1) return toast.error("Minimum purchase is 1 request.");

        setSubmitting(true);
        try {
            const res = await BuyRequestFunction(requestCount, txId.trim(), "AWASH");
            if (res && res.success === false) {
                toast.error(res.message || "Payment verification failed.");
            } else {
                toast.success(`Verified payment! Added ${requestCount} credits.`);
                setTxId("");
                await loadBilling();
            }
        } catch {
            toast.error("Network error while connecting to billing service.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="p-5 bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b] rounded-xl shadow-2xs">
                <h2 className="text-lg font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-2">
                    <Receipt size={20} className="text-[#059669] dark:text-[#34d399]" />
                    Usage & Billing
                </h2>
                <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-0.5">
                    Every user receives 200 free verification requests, then pays {pricePerReq} ETB per additional request.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b] rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-[#64748b] dark:text-[#94a3b8] block">Free Requests</span>
                    <span className="text-2xl font-black font-mono text-[#064e3b] dark:text-[#34d399] mt-1 block">
                        {freeRemaining} <span className="text-xs font-normal text-[#64748b] dark:text-[#94a3b8]">/ 200</span>
                    </span>
                </div>
                <div className="p-4 bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b] rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-[#64748b] dark:text-[#94a3b8] block">Purchased Credits</span>
                    <span className="text-2xl font-black font-mono text-[#0f172a] dark:text-[#f8fafc] mt-1 block">
                        {paidBalance}
                    </span>
                </div>
                <div className="p-4 bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b] rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-[#64748b] dark:text-[#94a3b8] block">Total Requests Used</span>
                    <span className="text-2xl font-black font-mono text-[#0f172a] dark:text-[#f8fafc] mt-1 block">
                        {totalUsed}
                    </span>
                </div>
                <div className="p-4 bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b] rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-[#64748b] dark:text-[#94a3b8] block">Price Per Request</span>
                    <span className="text-2xl font-black font-mono text-[#059669] dark:text-[#34d399] mt-1 block">
                        {pricePerReq} <span className="text-xs font-bold text-[#64748b] dark:text-[#94a3b8]">ETB</span>
                    </span>
                </div>
            </div>

            <Card className="border-[#e2e8f0] dark:border-[#1e293b] bg-white dark:bg-[#0c141f]">
                <CardHeader className="pb-3 border-b border-[#f1f5f9] dark:border-[#1e293b]">
                    <CardTitle className="text-sm font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-2">
                        <CreditCard size={16} className="text-[#059669] dark:text-[#34d399]" />
                        Buy Additional Requests
                    </CardTitle>
                    <CardDescription className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                        Transfer funds to the Awash Bank account below, then enter your transaction reference to verify and credit your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                    <div className="p-4 bg-[#f8fafc] dark:bg-[#131d2a] border border-[#e2e8f0] dark:border-[#1e293b] rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                            <span className="text-[10px] uppercase font-bold text-[#64748b] dark:text-[#94a3b8] block">Payment Instructions</span>
                            <span className="font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-1.5 mt-1">
                                <Building2 size={13} className="text-[#059669] dark:text-[#34d399]" /> Bank: Awash Bank
                            </span>
                            <span className="text-[11px] text-[#475569] dark:text-[#94a3b8] block mt-1">Account Name: <strong>{accountName}</strong></span>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="font-mono font-bold text-[#064e3b] dark:text-[#34d399]">Account No: {accountNumber}</span>
                                <Button size="sm" variant="ghost" onClick={() => handleCopy(accountNumber)} className="h-6 px-1.5 text-[10px]">
                                    <Copy size={11} className="mr-1" /> Copy
                                </Button>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-[#0c141f] p-3 border border-[#cbd5e1] dark:border-[#1e293b] rounded-lg flex flex-col justify-between">
                            <div>
                                <span className="text-[10px] uppercase font-bold text-[#64748b] dark:text-[#94a3b8]">Payment Calculation</span>
                                <p className="text-xs text-[#334155] dark:text-[#94a3b8] mt-1">
                                    {requestCount} requests × {pricePerReq} ETB = <span className="font-mono font-bold text-[#064e3b] dark:text-[#34d399] text-base">{totalCost} ETB</span>
                                </p>
                            </div>
                            <span className="text-[10px] text-[#64748b] dark:text-[#94a3b8]">Credits are added automatically upon genuine bank verification</span>
                        </div>
                    </div>

                    <form onSubmit={handleBuyRequest} className="space-y-3 pt-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="text-[11px] font-bold text-[#475569] dark:text-[#94a3b8] uppercase block mb-1">
                                    Number of Requests
                                </label>
                                <Input
                                    type="number"
                                    min="1"
                                    value={requestCount}
                                    onChange={(e) => setRequestCount(Math.max(1, parseInt(e.target.value) || 0))}
                                    className="h-9 font-mono"
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-[#475569] dark:text-[#94a3b8] uppercase block mb-1">
                                    Transaction Reference ID
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Enter payment reference (e.g. Awash / CBE)"
                                    value={txId}
                                    onChange={(e) => setTxId(e.target.value)}
                                    className="h-9 font-mono uppercase"
                                />
                            </div>
                        </div>

                        <Button type="submit" disabled={submitting} className="w-full h-9 gap-2 text-xs bg-[#064e3b] hover:bg-[#022c22]">
                            <CheckCircle2 size={14} />
                            <span>{submitting ? "Verifying Payment..." : `Submit & Verify Payment (${totalCost} ETB)`}</span>
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <BillingPurchaseHistory purchaseHistory={purchaseHistory} pricePerReq={pricePerReq} />
        </div>
    );
}
