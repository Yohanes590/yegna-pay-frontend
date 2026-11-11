"use client";

import { useState } from "react";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Settings, Save, Loader2, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";

function toDateInputValue(raw?: string | null): string {
    if (!raw || /^\d+[mh]$/i.test(raw.trim())) return "";
    const match = raw.trim().match(/^(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : "";
}

export default function DashboardSettings({ project }: { project: any }) {
    const [projectName, setProjectName] = useState(project?.project_name || "");
    const [webhookUrl, setWebhookUrl] = useState(project?.call_back_url || "");
    const [projectDescription, setProjectDescription] = useState(project?.project_description || "");
    const [receiverName, setReceiverName] = useState(project?.receiver_name || "");
    const [acceptPaymentsAfter, setAcceptPaymentsAfter] = useState(() => toDateInputValue(project?.before_expires));

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const pathName = usePathname();
    const router = useRouter();

    const saveChanges = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = Cookies.get("access_token");
        const id = pathName.split("/")[2];

        if (!projectName || !projectDescription || !receiverName) {
            return toast.error("Please fill in project name, description, and receiver name.");
        }

        setSaveLoading(true);
        try {
            const updatedData = {
                project_name: projectName,
                call_back_url: webhookUrl,
                project_description: projectDescription,
                receiver_name: receiverName,
                before_expires: acceptPaymentsAfter,
                api_sec_key: project?.api_sec_key,
            };

            const res = await fetch("/api/user/edit-project", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, updatedData, id }),
            });
            const data = await res.json();
            if (data?.success) {
                toast.success("Project settings saved successfully.");
                setTimeout(() => window.location.reload(), 1500);
            } else {
                toast.error(data?.message || "Update failed.");
            }
        } catch {
            toast.error("Failed to update project settings.");
        } finally {
            setSaveLoading(false);
        }
    };

    const handleDeleteProject = async () => {
        const id = pathName.split("/")[2];
        const token = Cookies.get("access_token");

        setDeleteLoading(true);
        try {
            const res = await fetch("/api/user/delete-project", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, token }),
            });
            const data = await res.json();
            if (data?.success) {
                toast.success("Project deleted successfully");
                router.push("/dashboard");
            } else {
                toast.error(data?.message || "Failed to delete project");
            }
        } catch {
            toast.error("An error occurred while deleting project.");
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="p-5 bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b] rounded-xl shadow-2xs">
                <h2 className="text-lg font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-2">
                    <Settings size={20} className="text-[#059669] dark:text-[#34d399]" />
                    Project Configuration
                </h2>
                <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-0.5">
                    Manage webhook endpoints, merchant receiver details, and workspace parameters
                </p>
            </div>

            <Card className="border-[#e2e8f0] dark:border-[#1e293b] bg-white dark:bg-[#0c141f] shadow-xs">
                <CardHeader className="pb-3 border-b border-[#f1f5f9] dark:border-[#1e293b]">
                    <CardTitle className="text-sm font-bold text-[#0f172a] dark:text-[#f8fafc]">General Information</CardTitle>
                    <CardDescription className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                        Identifies this project in your receipts and webhook callbacks
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                    <form onSubmit={saveChanges} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[11px] font-bold text-[#475569] dark:text-[#94a3b8] uppercase block mb-1">Project Name</label>
                                <Input value={projectName} onChange={(e) => setProjectName(e.target.value)} className="h-9" />
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-[#475569] dark:text-[#94a3b8] uppercase block mb-1">Receiver Account Name</label>
                                <Input value={receiverName} onChange={(e) => setReceiverName(e.target.value)} className="h-9" />
                            </div>
                        </div>

                        <div>
                            <label className="text-[11px] font-bold text-[#475569] dark:text-[#94a3b8] uppercase block mb-1">Webhook Callback URL</label>
                            <Input value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} className="h-9 font-mono" />
                        </div>

                        <div>
                            <label className="text-[11px] font-bold text-[#475569] dark:text-[#94a3b8] uppercase block mb-1">
                                Transaction Eligibility Start Date
                            </label>
                            <Input
                                type="date"
                                value={acceptPaymentsAfter}
                                onChange={(e) => setAcceptPaymentsAfter(e.target.value)}
                                className="h-9"
                            />
                            <p className="text-[11px] text-[#64748b] dark:text-[#94a3b8] mt-1">
                                Rejects bank receipts dated before this project start date across all supported banks.
                            </p>
                        </div>

                        <div>
                            <label className="text-[11px] font-bold text-[#475569] dark:text-[#94a3b8] uppercase block mb-1">Project Description</label>
                            <Input value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} className="h-9" />
                        </div>

                        <div className="pt-2 flex justify-end">
                            <Button type="submit" disabled={saveLoading} className="h-9 px-5 gap-2 text-xs bg-[#064e3b] dark:bg-[#059669] hover:bg-[#022c22] text-white">
                                {saveLoading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                                <span>Save Changes</span>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-[#fecdd3] dark:border-[#9f1239]/40 bg-[#fff1f2]/30 dark:bg-[#9f1239]/10 shadow-xs">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold text-[#9f1239] dark:text-[#f43f5e]">Danger Zone</CardTitle>
                    <CardDescription className="text-xs text-[#be123c] dark:text-[#fda4af]">
                        Permanently delete this project and all associated transaction records
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-2 flex items-center justify-between">
                    <p className="text-xs text-[#9f1239] dark:text-[#fda4af]">This action is irreversible.</p>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="h-8 gap-1.5 text-xs">
                                <Trash2 size={13} /> Delete Project
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete this workspace?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    All API keys and verification records for &quot;{projectName}&quot; will be permanently deleted.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteProject} disabled={deleteLoading}>
                                    {deleteLoading ? "Deleting..." : "Permanently Delete"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
            </Card>
        </div>
    );
}
