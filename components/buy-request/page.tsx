'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { BuyRequestFunction } from '@/lib/api_end_poing'

export default function BuyRequest() {
    const [activeTab, setActiveTab] = useState(1)
    const [requestCount, setRequestCount] = useState(1)
    const [transactionId, setTransactionId] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const COST_PER_REQUEST = 0.5
    const totalCost = requestCount * COST_PER_REQUEST

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success(`Copied Account Number: ${text}`)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (transactionId.trim() === '') {
            toast.error('Please enter a valid Transaction ID')
            return
        } else if (requestCount < 1) {
            toast.error('Please enter a valid number of requests (minimum 1)')
            return
        }

        try {
            setIsLoading(true)
            const response = await BuyRequestFunction(requestCount, transactionId)

            if (response && response.success === false) {
                toast.error(response.message || 'Verification failed')
                return
            }

            toast.success('Transaction processed successfully!')
            setIsSubmitted(true)
        } catch (error: any) {
            toast.error('Something went wrong processing your request.')
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

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
                {activeTab === 1 && (
                    <div>
                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4 text-center">
                            <p className="text-sm text-blue-800 font-semibold">Cost per request:</p>
                            <p className="text-2xl font-black text-blue-600">0.5 ETB</p>
                        </div>

                        <p className="text-sm text-gray-600 mb-4">
                            Please transfer the funds to this account before moving to the next step:
                        </p>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg border border-gray-200">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium uppercase">Account Number</p>
                                    <p className="font-mono text-gray-800 font-bold">1000524838439</p>
                                </div>
                                <button
                                    onClick={() => copyToClipboard('1000524838439')}
                                    className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded hover:bg-blue-700 font-medium transition-colors"
                                >
                                    Copy
                                </button>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <p className="text-xs text-gray-400 font-medium uppercase">Bank</p>
                                <p className="text-gray-700 font-bold">CBE</p>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <p className="text-xs text-gray-400 font-medium uppercase">Account Holder</p>
                                <p className="text-gray-700 font-bold">NATAN HAILU BEYENE</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setActiveTab(2)}
                            className="w-full bg-gray-800 text-white py-3 rounded-lg font-bold text-center hover:bg-gray-900 transition-colors"
                        >
                            Next: Enter Details
                        </button>
                    </div>
                )}
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
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 disabled:bg-gray-100"
                                required
                            />
                            {/* Live Cost Summary Box */}
                            <div className="mt-2 bg-gray-50 p-2.5 rounded border border-gray-200 flex justify-between text-xs text-gray-600 font-medium">
                                <span>Total amount to pay:</span>
                                <span className="text-blue-600 font-bold">{totalCost.toFixed(2)} ETB</span>
                            </div>
                        </div>

                        {/* Input 2: Transaction ID */}
                        <div>
                            <label htmlFor="txId" className="block text-sm font-semibold text-gray-700 mb-1">
                                Transaction ID (Ref Number)
                            </label>
                            <input
                                id="txId"
                                type="text"
                                placeholder="Enter your CBE transaction ID"
                                value={transactionId}
                                disabled={isLoading}
                                onChange={(e) => setTransactionId(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 disabled:bg-gray-100"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                From your CBE Birr receipt or SMS message.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setActiveTab(1)}
                                disabled={isLoading}
                                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors disabled:bg-green-400"
                            >
                                {isLoading ? 'Verifying...' : 'Submit Request'}
                            </button>
                        </div>
                    </form>
                )}

                {/* ================= SUCCESS SECTION ================= */}
                {isSubmitted && (
                    <div className="text-center py-6 space-y-4">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
                            ✓
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">Transaction Complete!</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Your request has been recorded for review.
                            </p>
                        </div>

                        {/* Summary Details */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-left space-y-2 text-sm text-gray-700">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Requests Ordered:</span>
                                <span className="font-bold text-gray-800">{requestCount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Total Calculated:</span>
                                <span className="font-bold text-blue-600">{totalCost.toFixed(2)} ETB</span>
                            </div>
                            <div className="border-t border-gray-200 my-1 pt-1 flex justify-between">
                                <span className="text-gray-400">Transaction ID:</span>
                                <span className="font-mono font-bold text-gray-800 break-all">{transactionId}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setIsSubmitted(false)
                                setTransactionId('')
                                setRequestCount(1)
                                setActiveTab(1)
                            }}
                            className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Make Another Request
                        </button>
                    </div>
                )}

            </div>
        </div>
    )
}