import Link from "next/link";
import { ArrowRight, KeyRound, Webhook, CheckCircle2 } from "lucide-react";
import DevEditor from "./dev-editor";

const INTEGRATION_STEPS = [
  {
    icon: KeyRound,
    step: "01",
    title: "Create a project & issue an API key",
    description:
      "Register your merchant workspace, add your CBE, Awash, or BOA receiving details, and copy your project Bearer key.",
  },
  {
    icon: Webhook,
    step: "02",
    title: "Send a transaction link or QR receipt",
    description:
      "POST JSON with transaction_id for bank links, or multipart/form-data with receipt_image for uploaded receipt photos.",
  },
  {
    icon: CheckCircle2,
    step: "03",
    title: "Handle VERIFIED responses & webhooks",
    description:
      "Receive a synchronous JSON verdict or signed webhook event with transaction_status, verified amount, and YP_* error codes.",
  },
];

export default function DeveloperExperience() {
  return (
    <section
      id="developers"
      className="relative py-20 lg:py-28 bg-white dark:bg-[#090e15] border-t border-slate-200 dark:border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Clean Integration Steps */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#059669] dark:text-[#34d399]">
                Developer Experience
              </p>
              <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 dark:text-white leading-tight">
                Integrate verification in one endpoint.
              </h2>
              <p className="text-slate-600 dark:text-[#94a3b8] text-base leading-relaxed">
                Use any HTTP client in Node.js, Python, Go, or cURL. Standard JSON responses and deterministic error codes make checkout integration predictable.
              </p>
            </div>

            <div className="space-y-5">
              {INTEGRATION_STEPS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-[#0c1219] border border-slate-200 dark:border-white/[0.07] flex items-start gap-4"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white dark:bg-[#070b10] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center text-[#059669] dark:text-[#34d399] shrink-0">
                      <Icon size={16} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-slate-400 dark:text-[#64748b] tabular-nums">
                          {item.step}
                        </span>
                        <h3 className="font-sans text-sm font-semibold text-slate-950 dark:text-white">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-[#94a3b8] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/documentation"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#059669] hover:text-[#047857] dark:text-[#34d399] dark:hover:text-[#6ee7b7] transition-colors"
              >
                <span>Read complete API guide</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Right: Multi-language Code Inspector */}
          <DevEditor />
        </div>
      </div>
    </section>
  );
}
