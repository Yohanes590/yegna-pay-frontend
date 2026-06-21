'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { BuyRequestFunction } from '@/lib/api_end_poing'

export default function BuyRequest() {
    const [activeTab, setActiveTab] = useState(1)
    const [requestCount, setRequestCount] = useState(1)
    const [transactionId, setTransactionId] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false) // Added loading state

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

            // Intercept backend validation or duplicate errors
            if (response && response.success === false) {
                toast.error(response.message || 'Verification failed')
                return // Stop execution, don't show success view
            }

            // If absolutely successful
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
        <div className="request-buy-main-container w-full min-h-[calc(100vh-10rem)] bg-[#020617] flex flex-col items-center justify-center p-6 relative z-10">
            {/* Subtle Background Glow behind the card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#10B981]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="bg-[#0A0F1D] border border-[#1E293B] p-8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] w-full max-w-md relative z-10 backdrop-blur-xl">

                {/* Header Section */}
                <div className="text-center mb-6">
                    <h1 className="text-xl font-bold text-white tracking-wide">Buy Transaction Request</h1>
                    <p className="text-xs text-amber-500/90 font-medium mt-1.5 bg-amber-500/10 border border-amber-500/20 py-1 px-3 rounded-full inline-block">
                        Currently available only via Commercial Bank Of Ethiopia (CBE)
                    </p>
                </div>

                {/* Tab Indicators */}
                <div className="flex border-b border-[#1E293B] mb-6">
                    <button
                        className={`flex-1 pb-3 text-center font-semibold text-xs tracking-wider uppercase transition-colors ${activeTab === 1 ? 'border-b-2 border-[#10B981] text-[#34D399]' : 'text-slate-500 hover:text-slate-400'}`}
                        onClick={() => !isSubmitted && setActiveTab(1)}
                        disabled={isSubmitted || isLoading}
                    >
                        Step 1: Payment Info
                    </button>
                    <button
                        className={`flex-1 pb-3 text-center font-semibold text-xs tracking-wider uppercase transition-colors ${activeTab === 2 ? 'border-b-2 border-[#10B981] text-[#34D399]' : 'text-slate-500'}`}
                        disabled={activeTab === 1 || isSubmitted || isLoading}
                    >
                        Step 2: Request & Verify
                    </button>
                </div>

                {/* ================= TAB 1: PAYMENT DETAILS ================= */}
                {activeTab === 1 && (
                    <div className="space-y-5">
                        <div className="bg-[#10B981]/5 border border-[#10B981]/20 p-4 rounded-xl text-center shadow-inner">
                            <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">Cost per request</p>
                            <p className="text-3xl font-black text-[#34D399] mt-0.5">0.5 <span className="text-sm font-bold text-slate-400">ETB</span></p>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed text-center px-2">
                            Please transfer the funds to this account before moving to the next step:
                        </p>

                        {/* Account Details Block */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between bg-[#111827] p-3.5 rounded-xl border border-[#1E293B] hover:border-slate-700 transition-colors">
                                <div>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Account Number</p>
                                    <p className="font-mono text-white font-bold text-sm tracking-wide mt-0.5">1000524838439</p>
                                </div>
                                <button
                                    onClick={() => copyToClipboard('1000524838439')}
                                    className="bg-[#1E293B] hover:bg-slate-800 text-[#34D399] hover:text-emerald-300 text-xs font-bold px-4 py-2 rounded-lg border border-[#334155]/40 transition-all shadow-sm active:scale-95"
                                >
                                    Copy
                                </button>
                            </div>

                            <div className="bg-[#111827]/60 p-3.5 rounded-xl border border-[#1E293B]/70 flex justify-between items-center">
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Bank</p>
                                <p className="text-slate-200 font-bold text-sm">CBE</p>
                            </div>

                            <div className="bg-[#111827]/60 p-3.5 rounded-xl border border-[#1E293B]/70 flex justify-between items-center">
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Account Holder</p>
                                <p className="text-slate-200 font-bold text-sm">NATAN HAILU BEYENE</p>
                            </div>
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={() => setActiveTab(2)}
                            className="w-full bg-[#10B981] text-slate-950 py-3 rounded-xl font-bold text-sm tracking-wide shadow-md shadow-[#10B981]/10 hover:bg-[#059669] transition-all duration-200 active:scale-[0.99] mt-2"
                        >
                            Next: Enter Details
                        </button>
                    </div>
                )}

                {/* ================= TAB 2: INPUTS & VERIFICATION ================= */}
                {activeTab === 2 && !isSubmitted && (
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Input 1: Request Count */}
                        <div className="space-y-1.5">
                            <label htmlFor="reqCount" className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                                How many requests do you want?
                            </label>
                            <input
                                id="reqCount"
                                type="number"
                                min="1"
                                value={requestCount}
                                disabled={isLoading}
                                onChange={(e) => setRequestCount(Math.max(1, parseInt(e.target.value) || 0))}
                                className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#10B981]/40 focus:border-[#10B981] text-sm font-medium transition-all disabled:opacity-50"
                                required
                            />
                            {/* Live Cost Summary Box */}
                            <div className="bg-[#111827]/40 p-3 rounded-xl border border-[#1E293B]/60 flex justify-between items-center text-xs text-slate-400 font-medium">
                                <span>Total amount to pay:</span>
                                <span className="text-[#34D399] font-bold text-sm">{totalCost.toFixed(2)} ETB</span>
                            </div>
                        </div>

                        {/* Input 2: Transaction ID */}
                        <div className="space-y-1.5">
                            <label htmlFor="txId" className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Transaction ID (Ref Number)
                            </label>
                            <input
                                id="txId"
                                type="text"
                                placeholder="e.g. FT23xxxxxxxx"
                                value={transactionId}
                                disabled={isLoading}
                                onChange={(e) => setTransactionId(e.target.value)}
                                className="w-full bg-[#111827] border border-[#1E293B] rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-[#10B981]/40 focus:border-[#10B981] text-sm font-mono tracking-wide transition-all disabled:opacity-50"
                                required
                            />
                            <p className="text-[11px] text-slate-500 leading-normal">
                                Found inside your CBE Birr confirmation receipt screenshot or incoming SMS.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setActiveTab(1)}
                                disabled={isLoading}
                                className="flex-1 bg-transparent hover:bg-slate-900 text-slate-400 py-3 rounded-xl font-bold text-xs uppercase tracking-wider border border-[#1E293B] transition-all disabled:opacity-30"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 bg-[#10B981] text-slate-950 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md shadow-[#10B981]/10 hover:bg-[#059669] transition-all disabled:bg-emerald-800 disabled:text-emerald-950"
                            >
                                {isLoading ? 'Verifying...' : 'Submit Request'}
                            </button>
                        </div>
                    </form>
                )}

                {/* ================= SUCCESS SECTION ================= */}
                {isSubmitted && (
                    <div className="text-center py-4 space-y-5">
                        <div className="w-14 h-14 bg-[#10B981]/10 border border-[#10B981]/30 text-[#34D399] rounded-full flex items-center justify-center mx-auto text-2xl shadow-lg shadow-[#10B981]/5">
                            ✓
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white tracking-wide">Transaction Complete!</h3>
                            <p className="text-xs text-slate-400 mt-1">
                                Your request has been recorded and queued for system verification.
                            </p>
                        </div>

                        {/* Summary Details */}
                        <div className="bg-[#111827] p-4 rounded-xl border border-[#1E293B] text-left space-y-3 text-xs text-slate-300">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 font-medium">Requests Ordered</span>
                                <span className="font-bold text-white bg-slate-800 px-2.5 py-0.5 rounded-md">{requestCount}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 font-medium">Total Calculated</span>
                                <span className="font-bold text-[#34D399] text-sm">{totalCost.toFixed(2)} ETB</span>
                            </div>
                            <div className="border-t border-[#1E293B] pt-2.5 flex flex-col gap-1">
                                <span className="text-slate-500 font-medium">Transaction ID</span>
                                <span className="font-mono font-bold text-slate-200 bg-[#0A0F1D] p-2 rounded-lg border border-[#1E293B]/50 break-all tracking-wide">
                                    {transactionId}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setIsSubmitted(false)
                                setTransactionId('')
                                setRequestCount(1)
                                setActiveTab(1)
                            }}
                            className="w-full bg-[#1E293B] hover:bg-slate-800 text-slate-200 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                        >
                            Make Another Request
                        </button>
                    </div>
                )}

            </div>
        </div>
    )
}