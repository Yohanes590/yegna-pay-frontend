import { CreditCard, Activity, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useUserData } from "@/lib/hooks/user_data_fetch";
import { usePathname } from "next/navigation";
const BalanceTracker = () => {
  const { user, function: fetchUserInfo } = useUserData();
  const pathName = usePathname();
  const [requestData, setRequestData] = useState<number | any>(0);
  const [totalTransaction, setTotalTransaction] = useState<number | any>(3);
  const [totalBalance, setTotalBalance] = useState<number | any>(0);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  useEffect(() => {
    setRequestData(user?.request_available);
    const PathID = pathName.split("/")[2];
    const TransactionIndex = user?.projects.find(
      (project: any) => project.id == PathID,
    );
    const SumTransaction =
      TransactionIndex.transactions.length == 0
        ? 0
        : TransactionIndex.transactions.length;
    setTotalBalance(SumTransaction + requestData);
    setTotalTransaction(SumTransaction);
    // console.log(SumTransaction);
    // console.log(TransactionIndex.transactions.length);
  }, [user]);

  return (
    <div className="current-balance-section mt-5 max-w-[500px] mb-[50px] font-sans relative z-10 animate-in fade-in zoom-in-95 duration-300">
      {/* Heading Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-[#10B981] mb-1">
          <Activity
            size={18}
            strokeWidth={2.5}
            className="drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]"
          />
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#34D399]">
            Request Control
          </span>
        </div>
        <h2 className="text-2xl font-black text-[#F8FAFC] tracking-tight">
          Balance Tracker Panel
        </h2>
        <p className="text-sm text-[#94A3B8] mt-1">
          Real-time oversight of your API throughput and allocated credits.
        </p>
      </div>

      {/* Cyberpunk Emerald Balance Card */}
      <div className="relative w-full max-w-[500px] h-[250px] overflow-hidden rounded-2xl border border-[#1E293B] bg-[#0F172A] p-7 shadow-[0_12px_40px_rgba(2,6,23,0.6)] transition-all hover:border-[#10B981]/30 hover:shadow-[0_16px_50px_rgba(16,185,129,0.04)] group">
        {/* Ambient background accent subtle glow */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#10B981]/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-[#10B981]/10 transition-all duration-500" />

        {/* Left Security Branding Strip */}
        <div className="absolute left-0 top-0 h-full w-1.5 bg-[#10B981] shadow-[3px_0_10px_rgba(16,185,129,0.3)]" />

        <div className="flex flex-col justify-between h-full relative z-10">
          {/* Top Row: Balance Info & High-Tech Icon */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#64748B]">
                Available Credits
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <h1 className="text-3xl font-black tracking-tighter text-[#F8FAFC]">
                  {totalTransaction + " "}
                  <span className="text-lg font-bold text-[#94A3B8]">
                    Request
                  </span>
                </h1>
                <span className="text-xl font-bold text-[#334155]">/</span>
                <span className="text-xl font-bold text-[#64748B]">
                  {requestData}
                </span>
                <span className="text-xs font-bold text-[#34D399] bg-[#10B981]/10 px-2 py-0.5 rounded-md ml-1 border border-[#10B981]/20">
                  Remaining
                </span>
              </div>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#020617] text-[#34D399] border border-[#1E293B] shadow-inner group-hover:border-[#10B981]/40 transition-all duration-300">
              <CreditCard size={22} strokeWidth={2} />
            </div>
          </div>

          {/* Middle Section: Security Progress Visualization */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-end text-xs">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                  Usage Depth
                </span>
                <span className="text-[#94A3B8] font-semibold mt-0.5">
                  <strong className="text-[#F8FAFC]">{totalBalance}</strong>{" "}
                  Requests Used
                </span>
              </div>
            </div>

            {/* Dual container structure for crisp bounding bar */}
            <div className="h-2.5 w-full rounded-full bg-[#020617] p-[1px] border border-[#1E293B]">
              <div className="h-full w-full rounded-full overflow-hidden bg-[#020617]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#10B981] to-[#34D399] shadow-[0_0_12px_rgba(16,185,129,0.5)] transition-all duration-1000 ease-in-out"
                  style={{ width: `${(requestData / totalBalance) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Row: Plan Metadata & Operational Status */}
          <div className="flex items-center justify-between border-t border-[#1E293B] pt-4">
            <div className="flex gap-8">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase font-black text-[#64748B] tracking-wider">
                  Active Tier
                </span>
                <span className="text-xs font-bold text-[#F8FAFC] underline decoration-[#10B981]/30 underline-offset-4 tracking-wide">
                  Developer Pro
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-[#10B981]/5 px-3 py-1.5 border border-[#10B981]/20 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#34D399]">
                System Live
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceTracker;
