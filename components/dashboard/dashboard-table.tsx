"use client";

import { useState, useMemo } from "react";
import { Check, Clock, AlertTriangle, Search, Filter, Eye, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate, formatPlatformLabel, formatTransactionId, getReceiptUrl, getTransactionPlatform } from "@/lib/utils";
import VerificationModal from "@/components/dashboard/verification-modal";

interface TableProps {
    transactions: any[];
    limit?: number;
    showControls?: boolean;
}

export default function DashboardTable({ transactions = [], limit, showControls = false }: TableProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [bankFilter, setBankFilter] = useState("all");
    const [page, setPage] = useState(1);
    const pageSize = limit || 8;

    const [selectedRecord, setSelectedRecord] = useState<any>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const filtered = useMemo(() => {
        return transactions.filter((t: any) => {
            const platformCode = getTransactionPlatform(t);
            const platformLabel = formatPlatformLabel(platformCode);
            const matchesQuery = !searchQuery ||
                (t.transaction_id || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                (t.from || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                (t.method || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                platformCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                platformLabel.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus = statusFilter === "all" || (t.transaction_status || "").toLowerCase() === statusFilter.toLowerCase();
            const matchesBank = bankFilter === "all" ||
                platformCode.toLowerCase() === bankFilter.toLowerCase() ||
                (t.method || "").toLowerCase().includes(bankFilter.toLowerCase());

            return matchesQuery && matchesStatus && matchesBank;
        });
    }, [transactions, searchQuery, statusFilter, bankFilter]);

    const totalPages = Math.ceil(filtered.length / pageSize) || 1;
    const safePage = Math.min(page, totalPages);
    const paginated = limit ? filtered.slice(0, limit) : filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

    const openInspection = (record: any) => {
        setSelectedRecord(record);
        setModalOpen(true);
    };

    return (
        <div className="bg-white dark:bg-[#0c141f] rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] shadow-xs overflow-hidden">
            {/* Header Controls */}
            {showControls && (
                <div className="p-4 border-b border-[#f1f5f9] dark:border-[#1e293b] flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                    <div className="relative flex-1 max-w-sm">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                        <Input
                            placeholder="Filter by ID, sender, or bank..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                            className="pl-9 h-8 text-xs bg-[#f8fafc] dark:bg-[#131d2a]"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <select
                            value={statusFilter}
                            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                            className="h-8 px-2.5 bg-[#f8fafc] dark:bg-[#131d2a] border border-[#cbd5e1] dark:border-[#1e293b] rounded-lg text-xs font-semibold text-[#475569] dark:text-[#94a3b8] outline-none"
                        >
                            <option value="all">All Statuses</option>
                            <option value="verified">Verified</option>
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        <select
                            value={bankFilter}
                            onChange={(e) => { setBankFilter(e.target.value); setPage(1); }}
                            className="h-8 px-2.5 bg-[#f8fafc] dark:bg-[#131d2a] border border-[#cbd5e1] dark:border-[#1e293b] rounded-lg text-xs font-semibold text-[#475569] dark:text-[#94a3b8] outline-none"
                        >
                            <option value="all">All Platforms</option>
                            <option value="cbe">CBE</option>
                            <option value="awash">Awash</option>
                            <option value="boa">BOA</option>
                            <option value="telebirr">Telebirr</option>
                        </select>
                    </div>
                </div>
            )}

            {/* Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Platform</TableHead>
                        <TableHead>Bank / Rail</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Sender</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Settled At</TableHead>
                        <TableHead>Receipt</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginated.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={9} className="h-32 text-center text-[#94a3b8] text-xs">
                                No verification transactions found matching filter.
                            </TableCell>
                        </TableRow>
                    ) : (
                        paginated.map((item: any, i: number) => {
                            const isVerified = item.transaction_status === "verified";
                            const isPending = item.transaction_status === "pending";
                            const receiptUrl = getReceiptUrl(item);
                            const platformCode = getTransactionPlatform(item);
                            const platformLabel = formatPlatformLabel(platformCode);
                            const railDisplay = !item.method || String(item.method).toLowerCase() === "link"
                                ? platformLabel
                                : item.method;
                            const platformBadgeStyle =
                                platformCode === "AWASH"
                                    ? "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800/60"
                                    : platformCode === "BOA"
                                    ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60"
                                    : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60";
                            return (
                                <TableRow key={item.id || item.transaction_id || i} className="hover:bg-[#f8fafc] dark:hover:bg-[#131d2a]/50">
                                    <TableCell className="font-mono text-xs font-bold text-[#0f172a] dark:text-[#f8fafc]">
                                        {formatTransactionId(item.transaction_id)}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold border ${platformBadgeStyle}`}>
                                            {platformLabel}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-xs font-semibold text-[#334155] dark:text-[#94a3b8]">
                                        {railDisplay}
                                    </TableCell>
                                    <TableCell className="font-mono text-xs font-bold text-[#064e3b] dark:text-[#34d399]">
                                        {Number(item.transaction_amount || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })} {item.currency || "ETB"}
                                    </TableCell>
                                    <TableCell className="text-xs text-[#475569] dark:text-[#94a3b8]">{item.from || "Customer"}</TableCell>
                                    <TableCell>
                                        <Badge variant={isVerified ? "verified" : isPending ? "pending" : "rejected"}>
                                            {isVerified ? <Check size={10} className="mr-1" /> : isPending ? <Clock size={10} className="mr-1" /> : <AlertTriangle size={10} className="mr-1" />}
                                            {item.transaction_status || "Pending"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-xs text-[#64748b] dark:text-[#94a3b8]">{formatDate(item.created_at)}</TableCell>
                                    <TableCell>
                                        <a
                                            href={receiptUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold text-[#059669] dark:text-[#34d399] bg-[#ecfdf5] dark:bg-[#064e3b]/30 hover:bg-[#d1fae5] dark:hover:bg-[#064e3b]/50 border border-[#a7f3d0] dark:border-[#065f46] transition-colors"
                                            title="View real bank receipt"
                                        >
                                            <ExternalLink size={12} />
                                            <span>Receipt</span>
                                        </a>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button size="sm" variant="ghost" onClick={() => openInspection(item)} className="h-7 px-2.5 text-xs text-[#059669] dark:text-[#34d399] hover:text-[#064e3b]">
                                            <Eye size={12} className="mr-1" /> Inspect
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>

            {/* Pagination Controls */}
            {!limit && totalPages > 1 && (
                <div className="p-3 border-t border-[#f1f5f9] dark:border-[#1e293b] flex items-center justify-between text-xs text-[#64748b] dark:text-[#94a3b8]">
                    <span>Page {safePage} of {totalPages} ({filtered.length} total)</span>
                    <div className="flex gap-1">
                        <Button size="sm" variant="outline" disabled={safePage <= 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="h-7 w-7 p-0">
                            <ChevronLeft size={14} />
                        </Button>
                        <Button size="sm" variant="outline" disabled={safePage >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="h-7 w-7 p-0">
                            <ChevronRight size={14} />
                        </Button>
                    </div>
                </div>
            )}

            <VerificationModal open={modalOpen} onOpenChange={setModalOpen} record={selectedRecord} />
        </div>
    );
}
