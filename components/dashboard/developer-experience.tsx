"use client";

import { useState } from "react";
import { Code2, Copy, Check, Terminal, ExternalLink, ShieldCheck, Building2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DevProps {
    project: any;
}

export default function DashboardDevelopers({ project }: DevProps) {
    const [selectedLang, setSelectedLang] = useState<"curl" | "node" | "python">("curl");
    const [copied, setCopied] = useState(false);

    const apiKey = project?.api_sec_key || "yegna_live_sec_demo_key";

    const snippets: Record<string, string> = {
        curl: `curl -X POST "http://localhost:4000/transaction/create" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -d '{
    "transaction_id": "CBE984210984",
    "amount": 500.00,
    "method": "CBE",
    "from": "Abebe Kebede",
    "to": "${project?.receiver_name || "Merchant Store"}",
    "currency": "ETB"
  }'`,
        node: `const response = await fetch("http://localhost:4000/transaction/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer ${apiKey}"
  },
  body: JSON.stringify({
    transaction_id: "CBE984210984",
    amount: 500.00,
    method: "CBE",
    from: "Abebe Kebede",
    to: "${project?.receiver_name || "Merchant Store"}",
    currency: "ETB"
  })
});

const data = await response.json();
console.log("Verification Result:", data);`,
        python: `import requests

url = "http://localhost:4000/transaction/create"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer ${apiKey}"
}
payload = {
    "transaction_id": "CBE984210984",
    "amount": 500.00,
    "method": "CBE",
    "from": "Abebe Kebede",
    "to": "${project?.receiver_name || "Merchant Store"}",
    "currency": "ETB"
}

response = requests.post(url, json=payload, headers=headers)
print("Verification Result:", response.json())`
    };

    const copySnippet = () => {
        navigator.clipboard.writeText(snippets[selectedLang]);
        setCopied(true);
        toast.success("Code snippet copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    const supportedBanks = [
        { name: "Commercial Bank of Ethiopia (CBE)", code: "CBE", speed: "< 1.2s", status: "Operational" },
        { name: "Telebirr (Ethio Telecom)", code: "TELEBIRR", speed: "< 850ms", status: "Operational" },
        { name: "Awash Bank", code: "AWASH", speed: "< 1.4s", status: "Operational" },
        { name: "Bank of Abyssinia", code: "BOA", speed: "< 1.1s", status: "Operational" },
        { name: "Dashen Bank", code: "DASHEN", speed: "< 1.5s", status: "Operational" },
        { name: "Hibret Bank", code: "HIBRET", speed: "< 1.8s", status: "Operational" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white dark:bg-[#0c141f] border border-[#e2e8f0] dark:border-[#1e293b] rounded-xl shadow-2xs">
                <div>
                    <h2 className="text-lg font-bold text-[#0f172a] dark:text-[#f8fafc] flex items-center gap-2">
                        <Code2 size={20} className="text-[#059669] dark:text-[#34d399]" />
                        Developer API & Integration
                    </h2>
                    <p className="text-xs text-[#64748b] dark:text-[#94a3b8] mt-0.5">
                        Integrate programmatic payment verification in your backend in fewer than 10 lines of code
                    </p>
                </div>
                <a href="/documentation" target="_blank" rel="noreferrer">
                    <Button variant="outline" size="sm" className="gap-2 text-xs">
                        <span>Full Specification</span>
                        <ExternalLink size={13} />
                    </Button>
                </a>
            </div>

            {/* Code Snippet Box */}
            <Card className="border-[#e2e8f0] dark:border-[#1e293b] bg-white dark:bg-[#0c141f] shadow-xs overflow-hidden">
                <div className="px-5 py-3 bg-[#0f172a] dark:bg-[#060a10] flex items-center justify-between border-b border-[#1e293b]">
                    <div className="flex items-center gap-2">
                        <Terminal size={14} className="text-[#34d399]" />
                        <span className="text-xs font-mono font-bold text-white">Payment Verification Request</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {(["curl", "node", "python"] as const).map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setSelectedLang(lang)}
                                className={`px-2.5 py-1 text-[11px] font-mono rounded font-semibold transition-colors ${selectedLang === lang ? "bg-[#064e3b] text-[#34d399]" : "text-[#94a3b8] hover:text-white"
                                    }`}
                            >
                                {lang.toUpperCase()}
                            </button>
                        ))}
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={copySnippet}
                            className="h-7 px-2 text-xs text-[#94a3b8] hover:text-white hover:bg-white/10 ml-2"
                        >
                            {copied ? <Check size={13} className="text-[#34d399]" /> : <Copy size={13} />}
                        </Button>
                    </div>
                </div>
                <pre className="p-5 bg-[#060a10] text-[#f1f5f9] font-mono text-xs overflow-x-auto leading-relaxed selection:bg-[#059669]">
                    <code>{snippets[selectedLang]}</code>
                </pre>
            </Card>

            {/* Supported Ethiopian Banking Rails */}
            <Card className="border-[#e2e8f0] dark:border-[#1e293b] bg-white dark:bg-[#0c141f] shadow-xs">
                <CardHeader className="pb-3 border-b border-[#f1f5f9] dark:border-[#1e293b]">
                    <CardTitle className="text-sm font-bold text-[#0f172a] dark:text-[#f8fafc]">Connected Ethiopian Banking Rails</CardTitle>
                    <CardDescription className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                        Active automated parsers and statement decoders supporting instant verification
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {supportedBanks.map((b) => (
                            <div key={b.code} className="p-3 bg-[#f8fafc] dark:bg-[#131d2a] border border-[#e2e8f0] dark:border-[#1e293b] rounded-lg flex items-center justify-between">
                                <div>
                                    <span className="text-xs font-bold text-[#0f172a] dark:text-[#f8fafc] block">{b.name}</span>
                                    <span className="text-[10px] text-[#64748b] dark:text-[#94a3b8] font-mono">Response: {b.speed}</span>
                                </div>
                                <Badge variant="verified" className="text-[10px]">
                                    {b.status}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

