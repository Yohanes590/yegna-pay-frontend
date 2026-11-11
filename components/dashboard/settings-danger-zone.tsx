"use client";

import { Trash2, Loader2 } from "lucide-react";

export default function SettingsDangerZone({
    onDelete,
    isLoading,
}: {
    onDelete: () => void;
    isLoading: boolean;
}) {
    return (
        <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6 shadow-xl">
            <div className="mb-6">
                <h2 className="text-lg font-bold text-rose-400">Danger Zone</h2>
                <p className="text-xs text-rose-500/70 font-medium mt-1">Irreversible destructive actions</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#020617] rounded-xl border border-rose-500/10">
                <div>
                    <h3 className="text-sm font-bold text-[#F8FAFC]">Delete Project</h3>
                    <p className="text-[11px] text-[#64748B] mt-1">
                        Permanently remove this project and all its transaction history.
                    </p>
                </div>
                <button
                    onClick={onDelete}
                    disabled={isLoading}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-colors border ${
                        isLoading
                            ? "bg-rose-500/5 text-rose-400/60 border-rose-500/10 cursor-not-allowed pointer-events-none"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500 hover:text-white"
                    }`}
                >
                    {isLoading ? (
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
    );
}

