"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
    slug: string;
}

export default function CodeBlock({ slug }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopyCurl = () => {
        navigator.clipboard.writeText(
            `curl -X GET https://api.yegnapay.com/v1/blog/${slug} \\\n  -H "Authorization: Bearer yp_live_key"`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-8 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
            <div className="bg-slate-950/60 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                    <span className="text-xs font-mono text-slate-500 ml-2">Request Mock API</span>
                </div>
                <button
                    onClick={handleCopyCurl}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors hover:bg-slate-800 px-2.5 py-1 rounded-md"
                >
                    {copied ? (
                        <>
                            <Check size={12} className="text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy size={12} />
                            <span>Copy cURL</span>
                        </>
                    )}
                </button>
            </div>
            <div className="p-5 overflow-x-auto font-mono text-xs text-slate-300 leading-6 bg-[#090f1e]">
                <div><span className="text-emerald-400">curl</span> -X GET https://api.yegnapay.com/v1/blog/{slug} \</div>
                <div className="pl-4"><span className="text-slate-500">-H</span> <span className="text-amber-200">"Authorization: Bearer yp_live_key"</span> \</div>
                <div className="pl-4"><span className="text-slate-500">-H</span> <span className="text-amber-200">"Content-Type: application/json"</span></div>
            </div>
        </div>
    );
}