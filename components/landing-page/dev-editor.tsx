"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { requestSnippets, responseSnippet, webhookSnippet } from "./dev-snippets";

export default function DevEditor() {
  const [copied, setCopied] = useState(false);
  const [activeLang, setActiveLang] = useState<"curl" | "node" | "python" | "go">("curl");
  const [activeView, setActiveView] = useState<"request" | "response" | "webhook">("request");

  const getCurrentSnippet = () => {
    if (activeView === "response") return responseSnippet;
    if (activeView === "webhook") return webhookSnippet;
    return requestSnippets[activeLang];
  };

  const copyCode = () => {
    navigator.clipboard.writeText(getCurrentSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0c1219] overflow-hidden shadow-sm dark:shadow-none">
      <div className="px-4 py-3 bg-slate-50 dark:bg-[#070b10] border-b border-slate-200 dark:border-white/[0.07] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 font-mono text-xs">
          {(["request", "response", "webhook"] as const).map((view) => (
            <button
              key={view}
              type="button"
              onClick={() => setActiveView(view)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeView === view
                  ? "bg-emerald-50 text-[#047857] border border-emerald-200 dark:bg-[#064e3b]/70 dark:text-[#34d399] dark:border-[#10b981]/30"
                  : "text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              {view === "request"
                ? "Request"
                : view === "response"
                  ? "Response (200 OK)"
                  : "Webhook Event"}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={copyCode}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-slate-100 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] border border-slate-200 dark:border-white/[0.1] text-xs font-mono text-slate-700 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check size={13} className="text-[#059669] dark:text-[#34d399]" />
              <span className="text-[#059669] dark:text-[#34d399]">Copied</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {activeView === "request" && (
        <div className="px-4 py-2 bg-slate-50/60 dark:bg-[#090e15] border-b border-slate-200 dark:border-white/[0.06] flex items-center gap-2 overflow-x-auto font-mono text-xs">
          <span className="text-slate-500 dark:text-slate-400 text-[11px] mr-1">SDK / CLI:</span>
          {(["curl", "node", "python", "go"] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setActiveLang(lang)}
              className={`px-2.5 py-1 rounded transition-colors text-[11px] font-medium ${
                activeLang === lang
                  ? "text-slate-950 bg-slate-200/80 dark:text-white dark:bg-white/[0.1]"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              {lang === "node" ? "Node.js" : lang === "curl" ? "cURL" : lang === "python" ? "Python" : "Go"}
            </button>
          ))}
        </div>
      )}

      <div className="p-5 sm:p-6 bg-slate-100/70 dark:bg-[#070b10] overflow-x-auto min-h-[340px] font-mono text-[13px] leading-relaxed">
        <pre className="text-slate-800 dark:text-[#e2e8f0] whitespace-pre">
          <code>{getCurrentSnippet()}</code>
        </pre>
      </div>

      <div className="px-5 py-3 bg-slate-50 dark:bg-[#0c1219] border-t border-slate-200 dark:border-white/[0.07] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
          <span>POST /api/transaction-create</span>
        </div>
        <span className="text-slate-700 dark:text-slate-300">JSON &amp; multipart/form-data</span>
      </div>
    </div>
  );
}
