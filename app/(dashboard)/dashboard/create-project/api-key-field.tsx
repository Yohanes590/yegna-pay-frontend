"use client";

import { Copy, Check, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function ApiKeyField({
    generatedKey,
    setGeneratedKey
}: {
    generatedKey: string;
    setGeneratedKey?: (k: string) => void;
}) {
    const [showApiKey, setShowApiKey] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(generatedKey);
        setCopied(true);
        toast.success("API key copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center justify-between px-3.5 py-2 bg-[#f8fafc] dark:bg-[#131d2a] border border-[#cbd5e1] dark:border-[#1e293b] rounded-lg font-mono text-xs text-[#0f172a] dark:text-[#f8fafc]">
                <span>{showApiKey ? generatedKey : `${generatedKey.slice(0, 10)}${"•".repeat(24)}${generatedKey.slice(-4)}`}</span>
                <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f8fafc] ml-2 shrink-0 p-1"
                    title={showApiKey ? "Hide key" : "Reveal key"}
                >
                    {showApiKey ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
            </div>
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="h-9 px-3 gap-1.5 text-xs shrink-0"
            >
                {copied ? <Check size={14} className="text-[#059669]" /> : <Copy size={14} />}
                <span>{copied ? "Copied" : "Copy"}</span>
            </Button>
        </div>
    );
}
