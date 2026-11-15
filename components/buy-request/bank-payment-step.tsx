"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { usePublicConfig } from "@/lib/hooks/use-public-config";
import { FetchBillingInfo } from "@/lib/api_end_poing";

export default function BankPaymentStep({ onNext }: { onNext: () => void }) {
    const { requestCurrency, currency } = usePublicConfig();
    const [billing, setBilling] = useState<{
        account_number?: string;
        account_user_name?: string;
        billing_method?: string;
    } | null>(null);

    useEffect(() => {
        FetchBillingInfo().then((res) => {
            if (res?.success && res.billing) {
                setBilling(res.billing);
            }
        }).catch(() => {});
    }, []);

    const accountNumber = billing?.account_number || "013201568261800";
    const accountName = billing?.account_user_name || "YOHANES MULUGETA KASSAW";
    const bankMethod = billing?.billing_method === "AWAS_BANK" || billing?.billing_method === "AWASH" ? "Awash Bank" : (billing?.billing_method || "Awash Bank");

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`Copied Account Number: ${text}`);
    };

    return (
        <div>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4 text-center">
                <p className="text-sm text-blue-800 font-semibold">Cost per request:</p>
                <p className="text-2xl font-black text-blue-600">{requestCurrency} {currency}</p>
            </div>

            <p className="text-sm text-gray-600 mb-4">
                Please transfer the funds to this account before moving to the next step:
            </p>

            <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg border border-gray-200">
                    <div>
                        <p className="text-xs text-gray-500 font-medium uppercase">Account Number</p>
                        <p className="font-mono text-gray-800 font-bold">{accountNumber}</p>
                    </div>
                    <button
                        onClick={() => copyToClipboard(accountNumber)}
                        className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded hover:bg-blue-700 font-medium transition-colors"
                    >
                        Copy
                    </button>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-400 font-medium uppercase">Bank</p>
                    <p className="text-gray-700 font-bold">{bankMethod}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-400 font-medium uppercase">Account Holder</p>
                    <p className="text-gray-700 font-bold">{accountName}</p>
                </div>
            </div>

            <button
                onClick={onNext}
                className="w-full bg-gray-800 text-white py-3 rounded-lg font-bold text-center hover:bg-gray-900 transition-colors"
            >
                Next: Enter Details
            </button>
        </div>
    );
}
