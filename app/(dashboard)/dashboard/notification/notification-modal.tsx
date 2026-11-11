"use client";

import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export interface NotificationItem {
    id: string;
    type: "security" | "success" | "info" | "system";
    title: string;
    description: string;
    time: string;
    isRead: boolean;
    longDetails?: string;
}

export default function NotificationModal({
    isOpen,
    onClose,
    notification,
}: {
    isOpen: boolean;
    onClose: () => void;
    notification: NotificationItem | null;
}) {
    if (!isOpen || !notification) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-md p-6 bg-[#0b131e] border border-[#1e293b] text-[#f8fafc]">
                <DialogHeader className="pb-3 border-b border-[#1e293b]">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#34d399]">
                            {notification.type} alert
                        </span>
                        <span className="text-xs text-[#94a3b8]">• {notification.time}</span>
                    </div>
                    <DialogTitle className="text-base font-bold text-[#f8fafc] mt-1">
                        {notification.title}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 pt-2">
                    <p className="text-xs text-[#cbd5e1] leading-relaxed">{notification.description}</p>
                    {notification.longDetails && (
                        <div className="bg-[#131d2a] border border-[#1e293b] rounded-xl p-3 font-mono text-[11px] text-[#cbd5e1] whitespace-pre-wrap leading-relaxed max-h-52 overflow-y-auto">
                            {notification.longDetails}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
