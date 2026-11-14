import Link from "next/link";
import { ArrowUpRight, DatabaseZap, FileCheck2, Lock, ScanLine, Terminal } from "lucide-react";

const SECURITY_CONTROLS = [
  {
    icon: Lock,
    title: "Database Uniqueness Lock (409 YP_03DeFg)",
    detail:
      "Every verified bank reference is stored with a strict uniqueness constraint. Re-submitting an existing receipt link or QR code immediately returns HTTP 409 with error code YP_03DeFg.",
  },
  {
    icon: FileCheck2,
    title: "Exact Amount & Receiver Matching",
    detail:
      "Parsed bank ledger amounts and recipient account details are checked against your expected price_amount and receiver full_name before marking a payment VERIFIED.",
  },
  {
    icon: ScanLine,
    title: "QR-Safe Image Compression",
    detail:
      "Uploaded receipts via multipart/form-data are decoded server-side for QR content first, then compressed with sharp and archived to Cloudinary without corrupting scannable codes.",
  },
  {
    icon: DatabaseZap,
    title: "Structured Error Registry (YP_*)",
    detail:
      "Client validation, duplicate replays, bank fetch failures, and server faults return deterministic YP_* error codes—never raw database traces.",
  },
];

const ERROR_CODE_SAMPLE = [
  { code: "YP_01Missing", status: "400", meaning: "Missing required payload or multipart field" },
  { code: "YP_02Amount", status: "400", meaning: "Submitted amount does not match bank ledger" },
  { code: "YP_03DeFg", status: "409", meaning: "Duplicate transaction — already verified" },
  { code: "YP_04BankErr", status: "502", meaning: "Upstream bank verification portal unreachable" },
];

export default function SecurityAndDocs() {
  return (
    <section
      id="security"
      className="relative py-20 lg:py-28 bg-slate-50 dark:bg-[#070b10] border-t border-slate-200 dark:border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Security & Transaction Reliability */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#059669] dark:text-[#34d399]">
                Security &amp; Reliability
              </p>
              <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white leading-tight">
                Built to reject forged and replayed receipts.
              </h2>
              <p className="text-slate-600 dark:text-[#94a3b8] text-base leading-relaxed">
                Screenshot spoofing and double-spending happen when reconciliation is manual. Yegna Pay enforces deterministic checks against live bank portals and your project ledger.
              </p>
            </div>

            <div className="divide-y divide-slate-200 dark:divide-white/[0.06] border-y border-slate-200 dark:border-white/[0.06]">
              {SECURITY_CONTROLS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="py-4 flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-white dark:bg-[#0c1219] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center text-[#059669] dark:text-[#34d399] shrink-0 mt-0.5">
                      <Icon size={16} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-sans text-sm font-semibold text-slate-950 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-[#94a3b8] leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: API Documentation & Error Code Preview */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0c1219] overflow-hidden shadow-sm dark:shadow-none">
              <div className="px-6 py-5 border-b border-slate-200 dark:border-white/[0.07] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <Terminal size={16} className="text-[#059669] dark:text-[#34d399]" />
                  <span className="font-sans text-sm font-semibold text-slate-950 dark:text-white">
                    API Reference &amp; Error Registry
                  </span>
                </div>
                <Link
                  href="/documentation"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[#059669] hover:text-[#047857] dark:text-[#34d399] dark:hover:text-[#6ee7b7] transition-colors"
                >
                  <span>Full Documentation</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              <div className="p-6 space-y-6">
                {/* Endpoint summary */}
                <div className="rounded-xl bg-slate-50 dark:bg-[#070b10] border border-slate-200 dark:border-white/[0.07] p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-[#047857] dark:bg-[#059669]/20 dark:text-[#34d399] font-semibold">
                        POST
                      </span>
                      <span className="text-slate-950 dark:text-white">/api/transaction-create</span>
                    </div>
                    <span className="text-slate-500 dark:text-[#64748b] hidden sm:inline">Bearer API Key</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-[#94a3b8] leading-relaxed">
                    Accepts <code className="font-mono text-slate-900 dark:text-[#e2e8f0]">application/json</code> (Method B: transaction link) or <code className="font-mono text-slate-900 dark:text-[#e2e8f0]">multipart/form-data</code> (Method A: <code className="font-mono text-slate-900 dark:text-[#e2e8f0]">receipt_image</code> file).
                  </p>
                </div>

                {/* Error Code Table */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-[#64748b]">
                      Standardized Error Codes
                    </span>
                    <Link
                      href="/documentation#error-codes"
                      className="font-mono text-[11px] text-slate-600 hover:text-slate-950 dark:text-[#94a3b8] dark:hover:text-white transition-colors"
                    >
                      View all codes →
                    </Link>
                  </div>

                  <div className="rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-[#070b10] divide-y divide-slate-200 dark:divide-white/[0.06]">
                    {ERROR_CODE_SAMPLE.map((row) => (
                      <div
                        key={row.code}
                        className="px-4 py-3 flex items-center justify-between gap-4 text-xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="font-mono font-semibold text-[#059669] dark:text-[#34d399] shrink-0">
                            {row.code}
                          </span>
                          <span className="text-slate-700 dark:text-[#cbd5e1] truncate">{row.meaning}</span>
                        </div>
                        <span className="font-mono text-slate-500 dark:text-[#64748b] tabular-nums shrink-0">
                          HTTP {row.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/documentation"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#059669] hover:bg-[#047857] dark:hover:bg-[#10b981] text-white text-xs font-semibold transition-colors"
                  >
                    <span>Explore API Docs</span>
                    <ArrowUpRight size={14} />
                  </Link>
                  <Link
                    href="/connected-banks"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/[0.08] text-slate-800 dark:text-[#e2e8f0] text-xs font-semibold transition-colors"
                  >
                    <span>Supported Bank Specs</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
