"use client";

import { useState } from "react";
import { KeyRound, Copy, Check, Eye, EyeOff, RefreshCw, ShieldAlert, Globe } from "lucide-react";
import cryptoRandomString from "crypto-random-string";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";

interface ApiKeyProps {
    project: any;
}

export default function DashboardApiKeys({ project }: ApiKeyProps) {
    const [apiKey, setApiKey] = useState(project?.api_sec_key || "");
    const [isRevealed, setIsRevealed] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showConfirmRoll, setShowConfirmRoll] = useState(false);
    const [rolling, setRolling] = useState(false);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        toast.success("API key copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    const handleRollKey = async () => {
        const newKey = `yegna_live_${cryptoRandomString({ length: 32, type: "hex" })}`;
        setRolling(true);

        try {
            const token = Cookies.get("access_token");
            const updatedData = {
                project_name: project?.project_name,
                call_back_url: project?.call_back_url,
                project_description: project?.project_description,
                receiver_name: project?.receiver_name,
                before_expires: project?.before_expires,
                api_sec_key: newKey,
            };

            const res = await fetch("/api/user/edit-project", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, updatedData, id: project?.id }),
            });
            const data = await res.json();

            if (data?.success) {
                setApiKey(newKey);
                toast.success("API secret key rotated successfully. Remember to update your server environment variables.");
            } else {
                toast.error(data?.message || "Failed to update key.");
            }
        } catch {
            toast.error("Network error while rotating API key.");
        } finally {
            setRolling(false);
            setShowConfirmRoll(false);
        }
    };

    const maskedKey = apiKey ? `${apiKey.slice(0, 10)}${"•".repeat(24)}${apiKey.slice(-4)}` : "No key generated";

    return (
        <div className="space-y-6">
            <div className="p-5 bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b] rounded-xl shadow-2xs">
                <h2 className="text-lg font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-2">
                    <KeyRound size={20} className="text-[#059669] dark:text-[#34d399]" />
                    API Key Management
                </h2>
                <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-0.5">
                    Authenticate API calls from your application servers. Keep secret keys safe and never expose them in client-side code.
                </p>
            </div>

            {/* Live Environment Key Card */}
            <Card className="border-[#e2e8f0] dark:border-[#1e293b] bg-white dark:bg-[#0c141f] shadow-xs">
                <CardHeader className="pb-3 border-b border-[#f1f5f9] dark:border-[#1e293b]">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-sm font-bold text-[#0f172a] dark:text-[#f8fafc]">Live Secret Key</CardTitle>
                            <CardDescription className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                                Standard production key for authorizing payment verifications
                            </CardDescription>
                        </div>
                        <Badge variant="verified">Live • Active</Badge>
                    </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <div className="flex-1 flex items-center justify-between px-3.5 py-2 bg-[#f8fafc] dark:bg-[#131d2a] border border-[#cbd5e1] dark:border-[#1e293b] rounded-lg font-mono text-xs text-[#0f172a] dark:text-[#f8fafc] select-all overflow-x-auto">
                            <span>{isRevealed ? apiKey : maskedKey}</span>
                            <button
                                onClick={() => setIsRevealed(!isRevealed)}
                                className="text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc] ml-2 shrink-0 p-1"
                                title={isRevealed ? "Hide key" : "Reveal key"}
                            >
                                {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
                            </button>
                        </div>

                        <div className="flex gap-2 shrink-0">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyToClipboard(apiKey)}
                                className="gap-1.5 text-xs h-9"
                            >
                                {copied ? <Check size={14} className="text-[#059669]" /> : <Copy size={14} />}
                                <span>{copied ? "Copied" : "Copy"}</span>
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setShowConfirmRoll(true)}
                                className="gap-1.5 text-xs h-9 text-[#b91c1c] hover:bg-[#fff1f2] dark:hover:bg-[#b91c1c]/10 hover:text-[#991b1b]"
                            >
                                <RefreshCw size={14} />
                                <span>Roll Key</span>
                            </Button>
                        </div>
                    </div>

                    <div className="p-3 bg-[#f8fafc] dark:bg-[#131d2a] border border-[#e2e8f0] dark:border-[#1e293b] rounded-lg text-xs text-[#64748b] dark:text-[#94a3b8] flex items-start gap-2.5">
                        <Globe size={15} className="text-[#059669] dark:text-[#34d399] shrink-0 mt-0.5" />
                        <div>
                            <span className="font-bold text-[#0f172a] dark:text-[#f8fafc]">Configured Webhook Callback URL: </span>
                            <span className="font-mono text-[#064e3b] dark:text-[#34d399] break-all">{project?.call_back_url || "https://your-domain.com/api/webhook"}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Confirmation Dialog for Rolling Secret Key */}
            <AlertDialog open={showConfirmRoll} onOpenChange={setShowConfirmRoll}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Roll live API secret key?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Rolling this key will immediately invalidate your previous secret key. Any existing servers using the old key will fail to verify transactions until updated.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={rolling}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleRollKey} disabled={rolling}>
                            {rolling ? "Generating..." : "Revoke Old & Generate New"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

