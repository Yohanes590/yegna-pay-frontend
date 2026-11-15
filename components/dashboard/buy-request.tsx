'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { BuyRequestFunction } from '@/lib/api_end_poing';
import BankPaymentStep from '@/components/buy-request/bank-payment-step';
import { usePublicConfig } from '@/lib/hooks/use-public-config';

export default function BuyRequest() {
    const { requestCurrency, currency } = usePublicConfig();
    const [activeTab, setActiveTab] = useState(1);
    const [requestCount, setRequestCount] = useState(1);
    const [transactionId, setTransactionId] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const totalCost = requestCount * requestCurrency;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (transactionId.trim() === '') {
            toast.error('Please enter a valid Transaction ID');
            return;
        } else if (requestCount < 1) {
            toast.error('Please enter a valid number of requests (minimum 1)');
            return;
        }

        try {
            setIsLoading(true);
            const response = await BuyRequestFunction(requestCount, transactionId);

            if (response && response.success === false) {
                toast.error(response.message || 'Verification failed');
                return;
            }

            toast.success('Transaction processed successfully!');
            setIsSubmitted(true);
        } catch {
            toast.error('Something went wrong processing your request.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="request-buy-main-container h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Buy Transaction Request</h1>
                    <p className="text-sm text-amber-600 font-medium mt-1">
                        Currently available only via Commercial Bank Of Ethiopia (CBE)
                    </p>
                </div>

                <div className="flex border-b border-gray-200 mb-6">
                    <button
                        className={`flex-1 pb-2 text-center font-medium text-sm ${activeTab === 1 ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-400'}`}
                        onClick={() => !isSubmitted && setActiveTab(1)}
                        disabled={isSubmitted || isLoading}
                    >
                        Step 1: Payment Info
                    </button>
                    <button
                        className={`flex-1 pb-2 text-center font-medium text-sm ${activeTab === 2 ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-400'}`}
                        disabled={activeTab === 1 || isSubmitted || isLoading}
                    >
                        Step 2: Request & Verify
                    </button>
                </div>

                {activeTab === 1 && <BankPaymentStep onNext={() => setActiveTab(2)} />}

                {activeTab === 2 && !isSubmitted && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="reqCount" className="block text-sm font-semibold text-gray-700 mb-1">
                                How many requests do you want?
                            </label>
                            <input
                                id="reqCount"
                                type="number"
                                min="1"
                                value={requestCount}
                                disabled={isLoading}
                                onChange={(e) => setRequestCount(Math.max(1, parseInt(e.target.value) || 0))}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            <div className="mt-2 text-right">
                                <span className="text-xs text-gray-500">Total Price: </span>
                                <span className="text-sm font-bold text-gray-800">{totalCost.toFixed(2)} {currency}</span>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="txId" className="block text-sm font-semibold text-gray-700 mb-1">
                                Transaction ID
                            </label>
                            <input
                                id="txId"
                                type="text"
                                placeholder="Enter transaction reference ID"
                                value={transactionId}
                                disabled={isLoading}
                                onChange={(e) => setTransactionId(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setActiveTab(1)}
                                disabled={isLoading}
                                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {isLoading ? 'Verifying...' : 'Submit & Verify'}
                            </button>
                        </div>
                    </form>
                )}

                {isSubmitted && (
                    <div className="text-center py-6">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">✓</div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Request Submitted!</h2>
                        <p className="text-sm text-gray-600 mb-6">Your transaction has been submitted for validation.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
