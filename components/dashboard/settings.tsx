"use client";
import { Copy, Eye, EyeOff, Save, Trash2, KeyRound } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import BalanceTracker from "../dashboard-componets/balance-show";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react";
import cryptoRandomString from "crypto-random-string";
export default function DashboardSettings({ project }: { project: any }) {
  const [showKey, setShowKey] = useState(false);
  const [projectName, setProjectName] = useState(project?.project_name || "");
  const [webhookUrl, setWebhookUrl] = useState(project?.call_back_url || "");
  const [APIkey, setAPIKey] = useState(project?.api_sec_key || "");
  const [projectDescription, setProjectDescription] = useState(
    project?.project_description || "",
  );
  const [receiverName, setReceiverName] = useState(
    project?.receiver_name || "",
  );
  const [acceptPaymentsAfter, setAcceptPaymentsAfter] = useState(
    project?.before_expires || "",
  );

  const [DeleteLoadingState, setDeleteState] = useState<boolean>(false);
  const [SaveLoadingState, setSaveLoadingState] = useState<boolean>(false);
  const router = useRouter();
  const pathName = usePathname();



  const NewAPIKey = () => {
    const GeneratedAPIkey = cryptoRandomString({ length: 32, type: "hex" });
    setAPIKey(GeneratedAPIkey);
  };

  const saveChanges = async () => {
    const updatedData = {
      project_name: projectName,
      call_back_url: webhookUrl,
      project_description: projectDescription,
      receiver_name: receiverName,
      before_expires: acceptPaymentsAfter,
      api_sec_key: APIkey,
    };

    const token = Cookies.get("access_token");
    const id = pathName.split("/")[2];
    if (projectName == "" || webhookUrl == "" || projectDescription == "" || receiverName == "" || acceptPaymentsAfter == "" || APIkey == "") {
      toast.error("Please field following information")
    } else {
      setSaveLoadingState(true);
      const saveAPIRequest = await fetch(
        `/api/user/edit-project`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, updatedData, id }),
        },
      );
      const SaveApiResponse = await saveAPIRequest.json();
      if (SaveApiResponse.success) {
        setSaveLoadingState(false);
        toast.success("Project updated successfully");
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      } else {
        toast.error(SaveApiResponse.message);
      }
    };
  }
  const DeleteProject = async () => {
    if (confirm("Are you sure to delete this project?")) {
      const id = pathName.split("/")[2];
      const token = Cookies.get("access_token");
      setDeleteState(true);
      const DeleteRequest = await fetch(
        `/api/user/delete-project`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, token }),
        },
      );
      const deletingResponse = await DeleteRequest.json();
      if (deletingResponse.success) {
        setDeleteState(false);
        toast.success("Project deleted successfully");
        window.location.href = "/dashboard";
      } else {
        toast.error(deletingResponse.message);
      }
    } else {
      toast.success("Process canceled success");
    }
  };

  return (
    <>
      <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 shadow-xl">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-[#F8FAFC]">
                  General Configuration
                </h2>
                <p className="text-xs text-[#94A3B8] font-medium mt-1">
                  Update your basic project information
                </p>
              </div>

              <div className="space-y-5">
                {/* Project Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#64748B] ml-1">
                    Project Name
                  </label>
                  <input
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full bg-[#020617] border border-[#1E293B] text-[#F8FAFC] text-sm font-bold px-4 py-3 rounded-xl focus:ring-1 focus:ring-[#10B981]/50 focus:border-[#10B981] outline-none transition-all"
                  />
                </div>

                {/* Project Description */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#64748B] ml-1">
                    Project Description
                  </label>
                  <textarea
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    rows={4}
                    className="w-full bg-[#020617] border border-[#1E293B] text-[#F8FAFC] text-sm font-medium px-4 py-3 rounded-xl focus:ring-1 focus:ring-[#10B981]/50 focus:border-[#10B981] outline-none transition-all resize-none leading-relaxed"
                  />
                </div>

                {/* Receiver Name & Payments Buffer Group */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#64748B] ml-1">
                      Receiver Name
                    </label>
                    <input
                      value={receiverName}
                      onChange={(e) => setReceiverName(e.target.value)}
                      className="w-full bg-[#020617] border border-[#1E293B] text-[#F8FAFC] text-sm font-bold px-4 py-3 rounded-xl focus:ring-1 focus:ring-[#10B981]/50 focus:border-[#10B981] outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#64748B] ml-1">
                      We Accept Payments After
                    </label>
                    <div
                      className="relative cursor-pointer"
                      onClick={(e) => {
                        // Forces the native date picker calendar dropdown to open when clicking anywhere in the container
                        const input = e.currentTarget.querySelector("input");
                        if (
                          input &&
                          "showPicker" in HTMLInputElement.prototype
                        ) {
                          try {
                            input.showPicker();
                          } catch (err) { }
                        }
                      }}
                    >
                      <input
                        type="date"
                        value={acceptPaymentsAfter}
                        onChange={(e) => setAcceptPaymentsAfter(e.target.value)}
                        className="w-full bg-[#020617] border border-[#1E293B] text-[#F8FAFC] text-sm font-medium px-4 py-3 rounded-xl focus:ring-1 focus:ring-[#10B981]/50 focus:border-[#10B981] outline-none transition-all scheme-dark [color-scheme:dark] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Webhook URL */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#64748B] ml-1">
                    Webhook URL
                  </label>
                  <input
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="w-full bg-[#020617] border border-[#1E293B] text-[#F8FAFC] text-sm font-mono px-4 py-3 rounded-xl focus:ring-1 focus:ring-[#10B981]/50 focus:border-[#10B981] outline-none transition-all"
                  />
                  <p className="text-[11px] text-[#64748B] ml-1">
                    We will POST transaction data to this URL instantly upon
                    verification.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#1E293B] flex justify-end">
                <button
                  onClick={saveChanges}
                  disabled={SaveLoadingState}
                  className={`flex items-center gap-2 px-5 py-2.5 text-sm font-extrabold rounded-xl transition-all shadow-[0_0_10px_rgba(16,185,129,0.2)] active:scale-95
                                            ${SaveLoadingState
                      ? "bg-[#10B981]/70 text-[#020617]/70 cursor-not-allowed pointer-events-none"
                      : "bg-[#10B981] text-[#020617] hover:bg-[#34D399]"
                    }`}
                >
                  {SaveLoadingState ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6 shadow-xl">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-rose-400">Danger Zone</h2>
                <p className="text-xs text-rose-500/70 font-medium mt-1">
                  Irreversible destructive actions
                </p>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#020617] rounded-xl border border-rose-500/10">
                <div>
                  <h3 className="text-sm font-bold text-[#F8FAFC]">
                    Delete Project
                  </h3>
                  <p className="text-[11px] text-[#64748B] mt-1">
                    Permanently remove this project and all its transaction
                    history.
                  </p>
                </div>
                <button
                  onClick={DeleteProject}
                  disabled={DeleteLoadingState}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-colors border
                        ${DeleteLoadingState
                      ? "bg-rose-500/5 text-rose-400/60 border-rose-500/10 cursor-not-allowed pointer-events-none"
                      : "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500 hover:text-white"
                    }`}
                >
                  {DeleteLoadingState ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* API Keys Sidebar */}
          <div className="space-y-6">
            <BalanceTracker />

            <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 shadow-xl">
              <div className="mb-6">
                <div className="w-10 h-10 bg-[#10B981]/10 rounded-xl flex items-center justify-center text-[#34D399] border border-[#10B981]/20 mb-4">
                  <KeyRound size={20} />
                </div>
                <h2 className="text-lg font-bold text-[#F8FAFC]">
                  API Secrets
                </h2>
                <p className="text-xs text-[#94A3B8] font-medium mt-1">
                  Use these to authenticate your backend requests.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#64748B]">
                    Project Key (Private)
                  </label>
                  <div className="flex items-center gap-2 bg-[#020617] border border-[#1E293B] rounded-xl p-1.5 focus-within:border-[#10B981]/50 transition-colors">
                    <input
                      type={showKey ? "text" : "password"}
                      readOnly
                      value={APIkey || "sk_live_1234567890abcdef"}
                      className="w-full bg-transparent border-none outline-none text-xs font-mono text-[#34D399] px-3 font-bold"
                    />
                    <button
                      onClick={() => setShowKey(!showKey)}
                      className="p-2 hover:bg-[#1E293B] rounded-lg text-[#64748B] hover:text-[#F8FAFC] transition-colors"
                    >
                      {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <button
                      onClick={async () => {
                        await navigator.clipboard.writeText(
                          APIkey || "sk_live_1234567890abcdef",
                        );
                        toast.success("Copied to clipboard");
                      }}
                      className="p-2 hover:bg-[#1E293B] rounded-lg text-[#64748B] hover:text-[#F8FAFC] transition-colors"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                  <div className="generated-api-button mt-[20px] mb-[20px]">
                    <button
                      className="flex items-center gap-2 px-5 py-2.5 text-sm font-extrabold rounded-xl transition-all shadow-[0_0_10px_rgba(16,185,129,0.2)] active:scale-95 bg-[#10B981] text-[#020617] hover:bg-[#34D399]"
                      onClick={NewAPIKey}
                    >
                      Generate New API Key
                    </button>
                  </div>
                  <p className="text-[10px] text-amber-500/70 font-medium mt-2 leading-relaxed">
                    WARNING: Do not expose this key in client-side code like
                    React or browser JS.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
