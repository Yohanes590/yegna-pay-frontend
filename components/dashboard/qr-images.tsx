"use client";

import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { QrCode, CheckCircle2, XCircle, Search, RefreshCw, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QrImageCard from "./qr-images/qr-image-card";
import QrPreviewModal from "./qr-images/qr-preview-modal";
import type { CountsState, PaginationState, QrReceiptImageItem, QrStatusTab } from "./qr-images/types";

export type { QrReceiptImageItem };

export default function DashboardQrImages({ project }: { project: any }) {
    const projectId = project?.id ? String(project.id) : "";
    const [activeTab, setActiveTab] = useState<QrStatusTab>("VERIFIED");
    const [searchInput, setSearchInput] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [page, setPage] = useState(1);
    const [items, setItems] = useState<QrReceiptImageItem[]>([]);
    const [pagination, setPagination] = useState<PaginationState>({ page: 1, limit: 12, total: 0, totalPages: 1 });
    const [counts, setCounts] = useState<CountsState>({ verified: 0, failed: 0, all: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<QrReceiptImageItem | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchInput.trim());
            setPage(1);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchInput]);

    useEffect(() => {
        setPage(1);
        setSelectedItem(null);
        setError(null);
    }, [projectId]);

    const fetchQrImages = useCallback(async () => {
        if (!projectId) {
            setItems([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams({ projectId, status: activeTab, page: String(page), limit: "12" });
            if (debouncedSearch) params.set("search", debouncedSearch);
            const token = Cookies.get("access_token");
            const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
            const res = await fetch(`/api/qr-images?${params.toString()}`, { method: "GET", credentials: "include", headers, cache: "no-store" });
            const data = await res.json().catch(() => null);
            if (!res.ok || !data?.success) throw new Error(data?.message || "Failed to load QR receipt images.");
            const scopedItems = Array.isArray(data.items)
                ? data.items.filter((item: QrReceiptImageItem) => String(item.projectId) === projectId)
                : [];
            setItems(scopedItems);
            setPagination(data.pagination || { page, limit: 12, total: scopedItems.length, totalPages: 1 });
            if (data.counts) setCounts(data.counts);
        } catch (err: any) {
            setError(err?.message || "Unable to fetch uploaded QR receipt images.");
            setItems([]);
        } finally {
            setLoading(false);
        }
    }, [projectId, activeTab, page, debouncedSearch]);

    useEffect(() => {
        fetchQrImages();
    }, [fetchQrImages]);

    const handleCopyText = async (value: string, id: string) => {
        if (!value) return;
        try {
            await navigator.clipboard.writeText(value);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 1500);
        } catch {
            // Clipboard permission denied — ignore silently
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b] rounded-xl shadow-2xs">
                <div>
                    <h2 className="text-lg font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-2">
                        <QrCode size={20} className="text-[#059669] dark:text-[#34d399]" />
                        QR Receipt Images
                    </h2>
                    <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-0.5">
                        Inspect receipt QR images uploaded to{" "}
                        <span className="font-semibold text-[#0f172a] dark:text-[#e2e8f0]">
                            {project?.project_name || project?.name || "this project"}
                        </span>{" "}
                        during transaction verification
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono">{counts.all} Total Receipts</Badge>
                    <Button variant="outline" size="sm" onClick={fetchQrImages} disabled={loading} className="h-8 gap-1.5 text-xs">
                        <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh
                    </Button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v === "FAILED" ? "FAILED" : "VERIFIED"); setPage(1); }}>
                    <TabsList className="h-auto p-1 bg-[#f1f5f9] dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b]">
                        <TabsTrigger value="VERIFIED" className="gap-2 px-3.5 py-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                            <CheckCircle2 size={14} /> <span>Verified QR Codes</span>
                            <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-mono ${activeTab === "VERIFIED" ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"}`}>
                                {counts.verified}
                            </span>
                        </TabsTrigger>
                        <TabsTrigger value="FAILED" className="gap-2 px-3.5 py-2 data-[state=active]:bg-rose-600 data-[state=active]:text-white">
                            <XCircle size={14} /> <span>Failed QR Codes</span>
                            <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-mono ${activeTab === "FAILED" ? "bg-white/20 text-white" : "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"}`}>
                                {counts.failed}
                            </span>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className="relative w-full md:w-72">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                    <Input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search transaction ID or bank..." className="pl-8 h-9 text-xs bg-white dark:bg-[#0c141f]" />
                </div>
            </div>

            {error && (
                <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-2.5 text-rose-800 dark:text-rose-300">
                        <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-semibold">Could not load QR receipt images</p>
                            <p className="text-xs opacity-90 mt-0.5">{error}</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={fetchQrImages} className="shrink-0">Try Again</Button>
                </div>
            )}

            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <div key={idx} className="bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b] rounded-xl overflow-hidden p-3 space-y-3">
                            <Skeleton className="h-44 w-full rounded-lg dark:bg-[#131d2a]" />
                            <Skeleton className="h-4 w-2/3 dark:bg-[#131d2a]" />
                            <Skeleton className="h-3 w-1/2 dark:bg-[#131d2a]" />
                        </div>
                    ))}
                </div>
            )}

            {!loading && !error && items.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white dark:bg-[#0c141f] border border-dashed border-[#cbd5e1] dark:border-[#1e293b] rounded-xl">
                    <h3 className="text-sm font-bold text-[#0f172a] dark:text-[#f8fafc]">
                        {debouncedSearch ? "No matching QR receipt images found" : activeTab === "VERIFIED" ? "No verified QR codes yet" : "No failed QR verification attempts"}
                    </h3>
                    <p className="text-xs text-[#64748b] dark:text-[#94a3b8] max-w-md mt-1">
                        {debouncedSearch
                            ? `No ${activeTab.toLowerCase()} QR receipts matched "${debouncedSearch}" in this project.`
                            : "Uploaded receipt images for this project will appear here with extracted verification metadata."}
                    </p>
                </div>
            )}

            {!loading && !error && items.length > 0 && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {items.map((item) => (
                            <QrImageCard key={item.id} item={item} copiedId={copiedId} onCopy={handleCopyText} onPreview={setSelectedItem} />
                        ))}
                    </div>
                    {pagination.totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#e2e8f0] dark:border-[#1e293b]">
                            <p className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                                Showing page <span className="font-semibold text-[#0f172a] dark:text-[#f8fafc]">{pagination.page}</span> of{" "}
                                <span className="font-semibold text-[#0f172a] dark:text-[#f8fafc]">{pagination.totalPages}</span> ({pagination.total} receipts)
                            </p>
                            <div className="flex items-center gap-2">
                                <Button type="button" variant="outline" size="sm" disabled={page <= 1 || loading} onClick={() => setPage((p) => Math.max(1, p - 1))} className="h-8 gap-1 text-xs">
                                    <ChevronLeft size={14} /> Previous
                                </Button>
                                <Button type="button" variant="outline" size="sm" disabled={page >= pagination.totalPages || loading} onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))} className="h-8 gap-1 text-xs">
                                    Next <ChevronRight size={14} />
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}

            <QrPreviewModal
                item={selectedItem}
                projectName={project?.project_name || project?.name || "selected project"}
                copiedId={copiedId}
                onCopy={handleCopyText}
                onClose={() => setSelectedItem(null)}
            />
        </div>
    );
}
