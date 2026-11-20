"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, ArrowRight, Trash2, Building2, ShieldCheck, Activity } from "lucide-react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useUserData } from "@/lib/hooks/user_data_fetch";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import DashboardLoadError from "@/components/dashboard/dashboard-load-error";

export default function DashboardWorkspaces() {
    const { user, loading, message, function: fetchUser } = useUserData();
    const [projectToDelete, setProjectToDelete] = useState<{ id: string; name: string } | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const searchParams = new URLSearchParams(window.location.search);
            const urlToken = searchParams.get("token");
            if (urlToken) {
                Cookies.set("access_token", urlToken, { expires: 7 });
                window.history.replaceState({}, "", window.location.pathname);
            }
        }
        fetchUser();
    }, [fetchUser]);

    const projects = user?.projects || [];

    const confirmDelete = async () => {
        if (!projectToDelete) return;
        setDeleting(true);
        const token = Cookies.get("access_token");

        try {
            const res = await fetch("/api/user/delete-project", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: projectToDelete.id, token }),
            });
            const data = await res.json();
            if (data?.success) {
                toast.success("Workspace deleted successfully");
                setTimeout(() => window.location.reload(), 1000);
            } else {
                toast.error(data?.message || "Failed to delete workspace");
            }
        } catch {
            toast.error("Network error while deleting workspace");
        } finally {
            setDeleting(false);
            setProjectToDelete(null);
        }
    };

    const loadFailed = !loading && !user && message !== "success";

    return (
        <div className="space-y-8 pb-12">
            {loadFailed && (
                <DashboardLoadError message={message} onRetry={() => fetchUser()} />
            )}
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#e2e8f0] dark:border-[#1e293b]">
                <div>
                    <h1 className="text-2xl font-black text-[#0f172a] dark:text-[#f8fafc] tracking-tight">Workspaces & Projects</h1>
                    <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-0.5">
                        Manage your payment integration environments, API credentials, and callback rails
                    </p>
                </div>
                <Link href="/dashboard/create-project">
                    <Button className="h-9 px-4 gap-2 text-xs bg-[#064e3b] dark:bg-[#059669] hover:bg-[#022c22] text-white">
                        <Plus size={15} />
                        <span>Create Workspace</span>
                    </Button>
                </Link>
            </div>

            {/* Grid of Workspaces */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Create Workspace Quick Trigger */}
                <Link
                    href="/dashboard/create-project"
                    className="p-6 rounded-xl border-2 border-dashed border-[#cbd5e1] dark:border-[#1e293b] hover:border-[#059669] dark:hover:border-[#34d399] bg-white/50 dark:bg-[#0c141f]/50 hover:bg-[#ecfdf5]/40 dark:hover:bg-[#064e3b]/10 transition-all flex flex-col items-center justify-center text-center min-h-[200px] group"
                >
                    <div className="w-10 h-10 rounded-full bg-[#f1f5f9] dark:bg-[#131d2a] group-hover:bg-[#064e3b] dark:group-hover:bg-[#059669] group-hover:text-white flex items-center justify-center text-[#64748b] dark:text-[#94a3b8] mb-3 transition-colors">
                        <Plus size={20} />
                    </div>
                    <span className="text-sm font-bold text-[#0f172a] dark:text-[#f8fafc] group-hover:text-[#064e3b] dark:group-hover:text-[#34d399]">Add New Project</span>
                    <span className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-1">Configure new webhook URL and API credentials</span>
                </Link>

                {loading ? (
                    <>
                        <Skeleton className="h-[200px] rounded-xl" />
                        <Skeleton className="h-[200px] rounded-xl" />
                    </>
                ) : (
                    projects.map((proj: any) => {
                        const txCount = proj.transactions?.length || 0;
                        return (
                            <Card key={proj.id} className="border-[#e2e8f0] dark:border-[#1e293b] bg-white dark:bg-[#0c141f] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                                <CardContent className="p-5">
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div className="min-w-0">
                                            <Badge variant="verified" className="text-[10px] mb-2">Live Rail</Badge>
                                            <h3 className="text-base font-bold text-[#0f172a] dark:text-[#f8fafc] truncate">{proj.project_name}</h3>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setProjectToDelete({ id: proj.id, name: proj.project_name });
                                            }}
                                            className="p-1.5 text-[#94a3b8] hover:text-[#e11d48] rounded hover:bg-[#fff1f2] dark:hover:bg-[#e11d48]/10 transition-colors"
                                            title="Delete workspace"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>

                                    <p className="text-xs text-[#64748b] dark:text-[#94a3b8] line-clamp-2 leading-relaxed mb-4">
                                        {proj.project_description || "Enterprise payment verification workspace"}
                                    </p>

                                    <div className="pt-3 border-t border-[#f1f5f9] dark:border-[#1e293b] flex items-center justify-between text-xs">
                                        <span className="text-[#64748b] dark:text-[#94a3b8] font-mono">{txCount} transactions</span>
                                        <Link href={`/dashboard/${proj.id}`}>
                                            <Button size="sm" variant="ghost" className="h-8 gap-1.5 text-xs text-[#064e3b] dark:text-[#34d399] font-bold hover:bg-[#ecfdf5] dark:hover:bg-[#064e3b]/20">
                                                <span>Console</span>
                                                <ArrowRight size={13} />
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })
                )}
            </div>

            <AlertDialog open={Boolean(projectToDelete)} onOpenChange={(open) => !open && setProjectToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete &quot;{projectToDelete?.name}&quot;?</AlertDialogTitle>
                        <AlertDialogDescription>
                            All API secret keys and transaction verification records under this workspace will be permanently erased.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} disabled={deleting}>
                            {deleting ? "Deleting..." : "Permanently Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
