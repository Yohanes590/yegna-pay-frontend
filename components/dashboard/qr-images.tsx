"use client";

import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
    QrCode,
    CheckCircle2,
    XCircle,
    Search,
    RefreshCw,
    ZoomIn,
    ExternalLink,
    Copy,
    Check,
    Calendar,
    Clock,
    Building2,
    AlertTriangle,
    ChevronLeft,
    ChevronRight,
    ImageOff,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    formatCurrency,
    formatDate,
    formatPlatformLabel,
    formatTransactionId,
    getReceiptUrl,
} from "@/lib/utils";

type QrStatusTab = "VERIFIED" | "FAILED";

export interface QrReceiptImageItem {
    id: string;
    projectId: string;
    imageUrl: string;
    mimeType: string;
    status: QrStatusTab;
    extractedTransactionId: string | null;
    qrContent: string | null;
    transactionAmount: number | null;
    currency: string;
    bankName: string;
    receiptDate: string | null;
    failureReason: string | null;
    verifiedAt: string | null;
    createdAt: string;
}

interface PaginationState {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

interface CountsState {
    verified: number;
    failed: number;
    all: number;
}

interface QrImagesProps {
    project: any;
}

function formatReceiptDateDisplay(value: string | null | undefined): string {
    if (!value) return "N/A";
    const parsed = new Date(value);
    if (!isNaN(parsed.getTime())) {
        return formatDate(parsed);
    }
    return value;
}

function QrReceiptThumbnail({
    src,
    alt,
    className = "",
}: {
    src: string;
    alt: string;
    className?: string;
}) {
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        setFailed(false);
    }, [src]);

    if (!src || failed) {
        return (
            <div
                className={`flex flex-col items-center justify-center gap-1.5 text-[#94a3b8] dark:text-[#64748b] bg-[#f8fafc] dark:bg-[#08101a] ${className}`}
            >
                <ImageOff size={22} />
                <span className="text-[11px] font-medium">Preview unavailable</span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className={className}
        />
    );
}

export default function DashboardQrImages({ project }: QrImagesProps) {
    const projectId = project?.id ? String(project.id) : "";

    const [activeTab, setActiveTab] = useState<QrStatusTab>("VERIFIED");
    const [searchInput, setSearchInput] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [page, setPage] = useState(1);

    const [items, setItems] = useState<QrReceiptImageItem[]>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 1,
    });
    const [counts, setCounts] = useState<CountsState>({
        verified: 0,
        failed: 0,
        all: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<QrReceiptImageItem | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [zoomed, setZoomed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchInput.trim());
            setPage(1);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchInput]);

    // Reset state cleanly if user switches workspace/project
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
            const params = new URLSearchParams({
                projectId,
                status: activeTab,
                page: String(page),
                limit: "12",
            });
            if (debouncedSearch) {
                params.set("search", debouncedSearch);
            }

            const token = Cookies.get("access_token");
            const headers: Record<string, string> = {};
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            const res = await fetch(`/api/qr-images?${params.toString()}`, {
                method: "GET",
                credentials: "include",
                headers,
                cache: "no-store",
            });

            const data = await res.json().catch(() => null);

            if (!res.ok || !data?.success) {
                throw new Error(data?.message || "Failed to load QR receipt images.");
            }

            // Defense-in-depth: strictly retain records matching current projectId
            const scopedItems = Array.isArray(data.items)
                ? data.items.filter(
                      (item: QrReceiptImageItem) => String(item.projectId) === projectId
                  )
                : [];

            setItems(scopedItems);
            setPagination(
                data.pagination || {
                    page,
                    limit: 12,
                    total: scopedItems.length,
                    totalPages: 1,
                }
            );
            if (data.counts) {
                setCounts(data.counts);
            }
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

    const handleTabChange = (nextTab: string) => {
        setActiveTab(nextTab === "FAILED" ? "FAILED" : "VERIFIED");
        setPage(1);
    };

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
            {/* Header Banner */}
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
                    <Badge variant="outline" className="font-mono">
                        {counts.all} Total Receipts
                    </Badge>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={fetchQrImages}
                        disabled={loading}
                        className="h-8 gap-1.5 text-xs"
                    >
                        <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Tabs & Search Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <Tabs value={activeTab} onValueChange={handleTabChange}>
                    <TabsList className="h-auto p-1 bg-[#f1f5f9] dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b]">
                        <TabsTrigger
                            value="VERIFIED"
                            className="gap-2 px-3.5 py-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white dark:data-[state=active]:bg-emerald-600"
                        >
                            <CheckCircle2 size={14} />
                            <span>Verified QR Codes</span>
                            <span
                                className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                                    activeTab === "VERIFIED"
                                        ? "bg-white/20 text-white"
                                        : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                                }`}
                            >
                                {counts.verified}
                            </span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="FAILED"
                            className="gap-2 px-3.5 py-2 data-[state=active]:bg-rose-600 data-[state=active]:text-white dark:data-[state=active]:bg-rose-600"
                        >
                            <XCircle size={14} />
                            <span>Failed QR Codes</span>
                            <span
                                className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                                    activeTab === "FAILED"
                                        ? "bg-white/20 text-white"
                                        : "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                                }`}
                            >
                                {counts.failed}
                            </span>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="relative w-full md:w-72">
                    <Search
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]"
                    />
                    <Input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search transaction ID or bank..."
                        className="pl-8 h-9 text-xs bg-white dark:bg-[#0c141f]"
                    />
                </div>
            </div>

            {/* Error State */}
            {error && (
                <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-2.5 text-rose-800 dark:text-rose-300">
                        <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-semibold">Could not load QR receipt images</p>
                            <p className="text-xs opacity-90 mt-0.5">{error}</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={fetchQrImages} className="shrink-0">
                        Try Again
                    </Button>
                </div>
            )}

            {/* Loading Grid Skeletons */}
            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b] rounded-xl overflow-hidden p-3 space-y-3"
                        >
                            <Skeleton className="h-44 w-full rounded-lg dark:bg-[#131d2a] dark:border-[#1e293b]" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-2/3 dark:bg-[#131d2a]" />
                                <Skeleton className="h-3 w-1/2 dark:bg-[#131d2a]" />
                                <Skeleton className="h-3 w-full dark:bg-[#131d2a]" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && items.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white dark:bg-[#0c141f] border border-dashed border-[#cbd5e1] dark:border-[#1e293b] rounded-xl">
                    <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${
                            activeTab === "VERIFIED"
                                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                                : "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400"
                        }`}
                    >
                        {activeTab === "VERIFIED" ? (
                            <CheckCircle2 size={24} />
                        ) : (
                            <XCircle size={24} />
                        )}
                    </div>
                    <h3 className="text-sm font-bold text-[#0f172a] dark:text-[#f8fafc]">
                        {debouncedSearch
                            ? "No matching QR receipt images found"
                            : activeTab === "VERIFIED"
                            ? "No verified QR codes yet"
                            : "No failed QR verification attempts"}
                    </h3>
                    <p className="text-xs text-[#64748b] dark:text-[#94a3b8] max-w-md mt-1">
                        {debouncedSearch
                            ? `No ${activeTab.toLowerCase()} QR receipts matched "${debouncedSearch}" in this project.`
                            : activeTab === "VERIFIED"
                            ? "Receipt images uploaded to verify transactions for this project that succeed will appear here with full extracted metadata."
                            : "Receipt images from failed QR decode or bank verification attempts for this project will appear here for auditing."}
                    </p>
                </div>
            )}

            {/* Responsive Cards Grid */}
            {!loading && !error && items.length > 0 && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {items.map((item) => {
                            const isVerified = item.status === "VERIFIED";
                            const displayTxId = item.extractedTransactionId
                                ? formatTransactionId(item.extractedTransactionId)
                                : null;

                            return (
                                <div
                                    key={item.id}
                                    className={`group bg-white dark:bg-[#0c141f] border rounded-xl overflow-hidden shadow-2xs transition-all hover:shadow-md flex flex-col ${
                                        isVerified
                                            ? "border-[#e2e8f0] dark:border-[#1e293b] hover:border-emerald-400/60"
                                            : "border-rose-200/80 dark:border-rose-950/60 hover:border-rose-400/60"
                                    }`}
                                >
                                    {/* Receipt Thumbnail */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setZoomed(false);
                                            setSelectedItem(item);
                                        }}
                                        className="relative aspect-[4/3] w-full bg-[#f8fafc] dark:bg-[#08101a] border-b border-[#e2e8f0] dark:border-[#1e293b] overflow-hidden cursor-pointer text-left"
                                    >
                                        <QrReceiptThumbnail
                                            src={item.imageUrl}
                                            alt={`QR receipt ${displayTxId || item.id}`}
                                            className="w-full h-full object-contain p-2 transition-transform duration-200 group-hover:scale-[1.03]"
                                        />
                                        <div className="absolute top-2.5 left-2.5">
                                            <Badge variant={isVerified ? "verified" : "rejected"}>
                                                {isVerified ? (
                                                    <>
                                                        <CheckCircle2 size={11} /> Verified
                                                    </>
                                                ) : (
                                                    <>
                                                        <XCircle size={11} /> Failed
                                                    </>
                                                )}
                                            </Badge>
                                        </div>
                                        <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0f172a]/80 text-white rounded-md px-2 py-1 text-[10px] font-medium flex items-center gap-1">
                                            <ZoomIn size={11} /> Preview
                                        </div>
                                    </button>

                                    {/* Metadata Body */}
                                    <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3 text-xs">
                                        <div className="space-y-2.5">
                                            {/* Bank + Amount Row */}
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#f1f5f9] dark:bg-[#131d2a] text-[#334155] dark:text-[#cbd5e1] font-semibold text-[11px]">
                                                    <Building2 size={11} />
                                                    {formatPlatformLabel(item.bankName)}
                                                </span>
                                                <span className="font-mono font-bold text-sm text-[#0f172a] dark:text-[#f8fafc]">
                                                    {item.transactionAmount != null
                                                        ? formatCurrency(
                                                              item.transactionAmount,
                                                              item.currency || "ETB"
                                                          )
                                                        : "—"}
                                                </span>
                                            </div>

                                            {/* Extracted Transaction ID */}
                                            <div className="flex items-center justify-between gap-2 bg-[#f8fafc] dark:bg-[#08101a] px-2.5 py-1.5 rounded-lg border border-[#e2e8f0] dark:border-[#1e293b]">
                                                <div className="min-w-0">
                                                    <span className="text-[10px] uppercase tracking-wider text-[#64748b] dark:text-[#94a3b8] block">
                                                        Transaction ID
                                                    </span>
                                                    <span
                                                        className="font-mono font-semibold text-[11px] text-[#0f172a] dark:text-[#f8fafc] truncate block"
                                                        title={
                                                            item.extractedTransactionId ||
                                                            "Not detected"
                                                        }
                                                    >
                                                        {displayTxId || "Not detected"}
                                                    </span>
                                                </div>
                                                {item.extractedTransactionId && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleCopyText(
                                                                displayTxId ||
                                                                    item.extractedTransactionId ||
                                                                    "",
                                                                item.id
                                                            )
                                                        }
                                                        className="p-1 rounded hover:bg-[#e2e8f0] dark:hover:bg-[#1e293b] text-[#64748b] shrink-0"
                                                        title="Copy transaction ID"
                                                    >
                                                        {copiedId === item.id ? (
                                                            <Check
                                                                size={12}
                                                                className="text-emerald-600"
                                                            />
                                                        ) : (
                                                            <Copy size={12} />
                                                        )}
                                                    </button>
                                                )}
                                            </div>

                                            {/* Tab-Specific Fields */}
                                            {isVerified ? (
                                                <div className="space-y-1 text-[11px] text-[#475569] dark:text-[#94a3b8]">
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span className="inline-flex items-center gap-1">
                                                            <Calendar size={11} /> Receipt Date
                                                        </span>
                                                        <span className="font-medium text-[#0f172a] dark:text-[#e2e8f0]">
                                                            {formatReceiptDateDisplay(item.receiptDate)}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span className="inline-flex items-center gap-1">
                                                            <Clock size={11} /> Verified At
                                                        </span>
                                                        <span className="font-medium text-[#0f172a] dark:text-[#e2e8f0]">
                                                            {formatDate(item.verifiedAt || item.createdAt)}
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-1.5">
                                                    <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/40 text-rose-800 dark:text-rose-300 text-[11px] leading-snug line-clamp-2">
                                                        <span className="font-semibold">Reason: </span>
                                                        {item.failureReason ||
                                                            "Transaction verification failed"}
                                                    </div>
                                                    <div className="flex items-center justify-between gap-2 text-[11px] text-[#475569] dark:text-[#94a3b8]">
                                                        <span className="inline-flex items-center gap-1">
                                                            <Clock size={11} /> Uploaded
                                                        </span>
                                                        <span className="font-medium text-[#0f172a] dark:text-[#e2e8f0]">
                                                            {formatDate(item.createdAt)}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setZoomed(false);
                                                setSelectedItem(item);
                                            }}
                                            className="w-full h-8 text-[11px] font-semibold"
                                        >
                                            View Receipt & Metadata
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination Footer */}
                    {pagination.totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#e2e8f0] dark:border-[#1e293b]">
                            <p className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                                Showing page{" "}
                                <span className="font-semibold text-[#0f172a] dark:text-[#f8fafc]">
                                    {pagination.page}
                                </span>{" "}
                                of{" "}
                                <span className="font-semibold text-[#0f172a] dark:text-[#f8fafc]">
                                    {pagination.totalPages}
                                </span>{" "}
                                ({pagination.total} receipts)
                            </p>
                            <div className="flex items-center gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    disabled={page <= 1 || loading}
                                    onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                                    className="h-8 gap-1 text-xs"
                                >
                                    <ChevronLeft size={14} /> Previous
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    disabled={page >= pagination.totalPages || loading}
                                    onClick={() =>
                                        setPage((prev) => Math.min(pagination.totalPages, prev + 1))
                                    }
                                    className="h-8 gap-1 text-xs"
                                >
                                    Next <ChevronRight size={14} />
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Receipt Image & Metadata Modal */}
            <Dialog
                open={Boolean(selectedItem)}
                onOpenChange={(open) => {
                    if (!open) {
                        setSelectedItem(null);
                        setZoomed(false);
                    }
                }}
            >
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    {selectedItem && (
                        <>
                            <DialogHeader>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <DialogTitle>QR Receipt Inspection</DialogTitle>
                                    <Badge
                                        variant={
                                            selectedItem.status === "VERIFIED"
                                                ? "verified"
                                                : "rejected"
                                        }
                                    >
                                        {selectedItem.status === "VERIFIED" ? (
                                            <>
                                                <CheckCircle2 size={11} /> Verified QR Code
                                            </>
                                        ) : (
                                            <>
                                                <XCircle size={11} /> Failed Verification
                                            </>
                                        )}
                                    </Badge>
                                </div>
                                <DialogDescription>
                                    Uploaded receipt image and parsed verification record for{" "}
                                    {project?.project_name || project?.name || "selected project"}.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                                {/* Full Receipt Image Viewer */}
                                <div className="space-y-2">
                                    <div
                                        onClick={() => setZoomed((z) => !z)}
                                        className={`relative rounded-xl border border-[#e2e8f0] dark:border-[#1e293b] bg-[#f8fafc] dark:bg-[#08101a] overflow-auto cursor-zoom-in flex items-center justify-center ${
                                            zoomed ? "h-[420px]" : "h-80"
                                        }`}
                                        title={zoomed ? "Click to fit" : "Click to zoom"}
                                    >
                                        <QrReceiptThumbnail
                                            src={selectedItem.imageUrl}
                                            alt={`Receipt ${selectedItem.extractedTransactionId || selectedItem.id}`}
                                            className={
                                                zoomed
                                                    ? "max-w-none w-[140%] h-auto object-contain p-2"
                                                    : "w-full h-full object-contain p-3"
                                            }
                                        />
                                    </div>
                                    <div className="flex items-center justify-between text-[11px] text-[#64748b] dark:text-[#94a3b8]">
                                        <span>Click image to toggle zoom</span>
                                        <a
                                            href={selectedItem.imageUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 font-medium text-[#059669] hover:underline"
                                        >
                                            Open original <ExternalLink size={11} />
                                        </a>
                                    </div>
                                </div>

                                {/* Detailed Metadata */}
                                <div className="space-y-3 text-xs">
                                    <div className="p-3 rounded-xl bg-[#f8fafc] dark:bg-[#08101a] border border-[#e2e8f0] dark:border-[#1e293b] space-y-2.5">
                                        <div>
                                            <span className="text-[10px] uppercase tracking-wider text-[#64748b] block">
                                                Extracted Transaction ID
                                            </span>
                                            <div className="flex items-center justify-between gap-2 mt-0.5">
                                                <span className="font-mono font-bold text-sm text-[#0f172a] dark:text-[#f8fafc] break-all">
                                                    {selectedItem.extractedTransactionId
                                                        ? formatTransactionId(
                                                              selectedItem.extractedTransactionId
                                                          )
                                                        : "Not detected"}
                                                </span>
                                                {selectedItem.extractedTransactionId && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-7 px-2"
                                                        onClick={() =>
                                                            handleCopyText(
                                                                formatTransactionId(
                                                                    selectedItem.extractedTransactionId
                                                                ),
                                                                `modal-${selectedItem.id}`
                                                            )
                                                        }
                                                    >
                                                        {copiedId === `modal-${selectedItem.id}` ? (
                                                            <Check
                                                                size={13}
                                                                className="text-emerald-600"
                                                            />
                                                        ) : (
                                                            <Copy size={13} />
                                                        )}
                                                    </Button>
                                                )}
                                            </div>
                                        </div>

                                        {selectedItem.qrContent && (
                                            <div>
                                                <span className="text-[10px] uppercase tracking-wider text-[#64748b] block">
                                                    Decoded QR Payload
                                                </span>
                                                <p className="font-mono text-[11px] text-[#334155] dark:text-[#cbd5e1] break-all mt-0.5">
                                                    {selectedItem.qrContent}
                                                </p>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-2 gap-3 pt-1 border-t border-[#e2e8f0] dark:border-[#1e293b]">
                                            <div>
                                                <span className="text-[10px] uppercase tracking-wider text-[#64748b] block">
                                                    Amount
                                                </span>
                                                <span className="font-mono font-bold text-[#0f172a] dark:text-[#f8fafc] mt-0.5 block">
                                                    {selectedItem.transactionAmount != null
                                                        ? formatCurrency(
                                                              selectedItem.transactionAmount,
                                                              selectedItem.currency || "ETB"
                                                          )
                                                        : "—"}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-[10px] uppercase tracking-wider text-[#64748b] block">
                                                    Bank
                                                </span>
                                                <span className="font-semibold text-[#0f172a] dark:text-[#f8fafc] mt-0.5 block">
                                                    {formatPlatformLabel(selectedItem.bankName)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 pt-1 border-t border-[#e2e8f0] dark:border-[#1e293b]">
                                            <div>
                                                <span className="text-[10px] uppercase tracking-wider text-[#64748b] block">
                                                    Receipt Date
                                                </span>
                                                <span className="font-medium text-[#0f172a] dark:text-[#f8fafc] mt-0.5 block">
                                                    {formatReceiptDateDisplay(
                                                        selectedItem.receiptDate
                                                    )}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-[10px] uppercase tracking-wider text-[#64748b] block">
                                                    {selectedItem.status === "VERIFIED"
                                                        ? "Verified At"
                                                        : "Uploaded At"}
                                                </span>
                                                <span className="font-medium text-[#0f172a] dark:text-[#f8fafc] mt-0.5 block">
                                                    {formatDate(
                                                        selectedItem.status === "VERIFIED"
                                                            ? selectedItem.verifiedAt ||
                                                                  selectedItem.createdAt
                                                            : selectedItem.createdAt
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {selectedItem.status === "FAILED" && (
                                        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-300">
                                            <span className="text-[10px] uppercase font-bold tracking-wider block mb-0.5">
                                                Failure Reason
                                            </span>
                                            <p className="text-xs leading-relaxed">
                                                {selectedItem.failureReason ||
                                                    "Verification attempt failed."}
                                            </p>
                                        </div>
                                    )}

                                    {selectedItem.extractedTransactionId && (
                                        <a
                                            href={getReceiptUrl({
                                                platform: selectedItem.bankName,
                                                transaction_id:
                                                    selectedItem.extractedTransactionId,
                                                transaction_url:
                                                    selectedItem.qrContent?.startsWith("http")
                                                        ? selectedItem.qrContent
                                                        : undefined,
                                            })}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex w-full items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[#e2e8f0] dark:border-[#1e293b] bg-white dark:bg-[#0c141f] hover:bg-[#f8fafc] dark:hover:bg-[#131d2a] font-semibold text-[#0f172a] dark:text-[#f8fafc] transition-colors"
                                        >
                                            Open Bank Receipt Link <ExternalLink size={13} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

