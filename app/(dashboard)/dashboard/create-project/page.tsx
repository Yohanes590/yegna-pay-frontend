"use client";

import { useState, useEffect } from "react";
import { Settings2, Plus, ArrowLeft, Loader2, KeyRound } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import cryptoRandomString from "crypto-random-string";
import { getMutationAuthToken } from "@/lib/client-auth-token";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ApiKeyField from "./api-key-field";
import VerificationModeToggle from "@/components/dashboard/verification-mode-toggle";

function getLocalDateString(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

export default function ProjectCreationRender() {
    const [generatedKey, setGeneratedKey] = useState<string>("");
    const [projectName, setProjectName] = useState<string>("");
    const [webcall_back, setCallBackURL] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [projectDiscription, setDisc] = useState<string>("");
    const [expiresDate, setExpiresDate] = useState<string>(() => getLocalDateString());
    const [paymentReceiverName, setPaymentReceiverName] = useState<string>("");
    const [detailVerification, setDetailVerification] = useState<boolean>(true);

    useEffect(() => {
        const genAPIKey = `yegna_live_${cryptoRandomString({ length: 32, type: "hex" })}`;
        setGeneratedKey(genAPIKey);
    }, []);

    const createProjectHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!projectName || !generatedKey || !projectDiscription) {
            toast.error("Please fill in project name and description.");
            return;
        }
        if (detailVerification && (!paymentReceiverName || !expiresDate)) {
            toast.error("Detailed verification requires payment receiver name and eligibility start date.");
            return;
        }

        setLoading(true);
        const authToken = await getMutationAuthToken();
        const hasSession = Boolean((await authClient.getSession().catch(() => null))?.data?.user);
        if (!authToken && !hasSession) {
            toast.error("Please sign in to create a workspace.");
            setLoading(false);
            window.location.href = "/sign-in";
            return;
        }
        if (!authToken) {
            toast.error("Could not load your session. Refresh the page or sign in again.");
            setLoading(false);
            return;
        }

        try {
            const requestServer = await fetch("/api/user/create-project", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    token: authToken,
                    project_name: projectName,
                    apiKey: generatedKey,
                    call_back: webcall_back,
                    discription: projectDiscription,
                    date_expire: expiresDate,
                    transaction_start_date: expiresDate,
                    receiver_name: paymentReceiverName,
                    detail_verification: detailVerification,
                })
            });
            const serverResponse = await requestServer.json();
            if (serverResponse.success === true) {
                toast.success(serverResponse.message || "Project created successfully!");
                setTimeout(() => window.location.href = "/dashboard", 1000);
            } else {
                toast.error(serverResponse.message || "Failed to create project.");
            }
        } catch {
            toast.error("Network constraint: failed to communicate with server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl space-y-6 pb-12">
            <div className="flex items-center gap-3">
                <Link href="/dashboard" className="p-2 text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc] hover:bg-[#f1f5f9] dark:hover:bg-[#131d2a] rounded-lg">
                    <ArrowLeft size={16} />
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-[#0f172a] dark:text-[#f8fafc] tracking-tight">Create New Workspace</h1>
                    <p className="text-xs text-[#64748b] dark:text-[#94a3b8]">Configure your payment integration environment and credentials</p>
                </div>
            </div>

            <Card className="border-[#e2e8f0] dark:border-[#1e293b] bg-white dark:bg-[#0c141f] shadow-xs">
                <CardHeader className="pb-3 border-b border-[#f1f5f9] dark:border-[#1e293b]">
                    <CardTitle className="text-sm font-bold text-[#0f172a] dark:text-[#f8fafc]">Project Details</CardTitle>
                    <CardDescription className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                        These parameters define your merchant endpoint and verification rules
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                    <form onSubmit={createProjectHandler} className="space-y-4">
                        <VerificationModeToggle
                            enabled={detailVerification}
                            onChange={setDetailVerification}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[11px] font-bold text-[#475569] dark:text-[#94a3b8] uppercase block mb-1">Project Name</label>
                                <Input
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    placeholder="e.g. Telebirr Ecommerce Store"
                                    className="h-9"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-[11px] font-bold text-[#475569] dark:text-[#94a3b8] uppercase block mb-1">
                                    Payment Receiver Name
                                    {!detailVerification && (
                                        <span className="text-[#94a3b8] font-normal normal-case"> (optional in payment-only mode)</span>
                                    )}
                                </label>
                                <Input
                                    value={paymentReceiverName}
                                    onChange={(e) => setPaymentReceiverName(e.target.value)}
                                    placeholder="e.g. Yegna Merchant LLC"
                                    className="h-9"
                                    required={detailVerification}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[11px] font-bold text-[#475569] dark:text-[#94a3b8] uppercase block mb-1">
                                Webhook Callback URL <span className="text-[#94a3b8] font-normal lowercase">(Optional)</span>
                            </label>
                            <Input
                                value={webcall_back}
                                onChange={(e) => setCallBackURL(e.target.value)}
                                placeholder="https://api.yourdomain.com/webhooks/yegna"
                                className="h-9 font-mono"
                            />
                        </div>

                        <div>
                            <label className="text-[11px] font-bold text-[#475569] dark:text-[#94a3b8] uppercase block mb-1">
                                Transaction Eligibility Start Date
                            </label>
                            <Input
                                type="date"
                                value={expiresDate}
                                onChange={(e) => setExpiresDate(e.target.value)}
                                className="h-9"
                                required={detailVerification}
                                disabled={!detailVerification}
                            />
                            <p className="text-[11px] text-[#64748b] dark:text-[#94a3b8] mt-1">
                                {detailVerification
                                    ? "Only bank transactions dated on or after this date will be eligible for verification."
                                    : "Not used while payment-only verification is enabled."}
                            </p>
                        </div>

                        <div>
                            <label className="text-[11px] font-bold text-[#475569] dark:text-[#94a3b8] uppercase block mb-1">Project Description</label>
                            <Input
                                value={projectDiscription}
                                onChange={(e) => setDisc(e.target.value)}
                                placeholder="Brief summary of payment collection flow"
                                className="h-9"
                                required
                            />
                        </div>

                        <div className="pt-2">
                            <label className="text-[11px] font-bold text-[#475569] dark:text-[#94a3b8] uppercase block mb-1">Generated Live Secret Key</label>
                            <ApiKeyField generatedKey={generatedKey} setGeneratedKey={setGeneratedKey} />
                        </div>

                        <div className="pt-4 border-t border-[#f1f5f9] dark:border-[#1e293b] flex justify-end">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="h-10 px-8 gap-2 text-sm font-bold bg-[#059669] hover:bg-[#047857] text-white shadow-sm"
                            >
                                {loading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} strokeWidth={2.5} />}
                                <span>Save new workspace</span>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
