"use client";

import { History, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate, formatTransactionId } from "@/lib/utils";

interface PurchaseHistoryProps {
    purchaseHistory: any[];
    pricePerReq: number;
}

export default function BillingPurchaseHistory({ purchaseHistory, pricePerReq }: PurchaseHistoryProps) {
    return (
        <div className="bg-white dark:bg-[#0c141f] rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] shadow-xs overflow-hidden">
            <div className="p-4 border-b border-[#f1f5f9] dark:border-[#1e293b] flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-2">
                    <History size={14} className="text-[#059669] dark:text-[#34d399]" />
                    Purchase History
                </h3>
                <Badge variant="outline" className="text-[10px]">{purchaseHistory.length} Transactions</Badge>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Credits</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Bank</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {purchaseHistory.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-20 text-center text-[#94a3b8] text-xs">
                                No purchase history records found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        purchaseHistory.map((item: any, i: number) => (
                            <TableRow key={item.id || i}>
                                <TableCell className="text-xs text-[#64748b] dark:text-[#94a3b8]">{formatDate(item.time_stamp)}</TableCell>
                                <TableCell className="font-mono text-xs font-bold text-[#0f172a] dark:text-[#f8fafc]">{formatTransactionId(item.id)}</TableCell>
                                <TableCell className="font-mono text-xs font-bold text-[#064e3b] dark:text-[#34d399]">+{item.paid_requests}</TableCell>
                                <TableCell className="text-xs font-mono">{Number(item.amount || item.paid_requests * pricePerReq).toFixed(2)} ETB</TableCell>
                                <TableCell className="text-xs text-[#475569] dark:text-[#94a3b8]">{item.method || "Awash"}</TableCell>
                                <TableCell className="text-right">
                                    <Badge variant="verified">
                                        <CheckCircle2 size={10} className="mr-1" />
                                        {item.status || "Verified"}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

