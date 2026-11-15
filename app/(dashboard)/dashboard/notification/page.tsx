"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Check, Trash2, ShieldAlert, CheckCircle2, Info, Bell } from "lucide-react";
import NotificationModal, { NotificationItem } from "./notification-modal";
import { Button } from "@/components/ui/button";

export default function NotificationReceiver() {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);

    const loadNotifications = useCallback(async () => {
        try {
            const res = await fetch("/api/user/notifications");
            const data = await res.json();
            if (data?.success && Array.isArray(data.notifications)) {
                setNotifications(data.notifications);
            }
        } catch {
            // keep current list on network failure
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadNotifications();
    }, [loadNotifications]);

    const markAllRead = async () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        try {
            await fetch("/api/user/notifications", { method: "PATCH" });
        } catch {
            // ignore
        }
    };

    const clearAll = async () => {
        setNotifications([]);
        try {
            await fetch("/api/user/notifications", { method: "DELETE" });
        } catch {
            // ignore
        }
    };

    return (
        <div className="space-y-6 max-w-4xl pb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#0b131e] border border-[#1e293b] rounded-xl shadow-xs">
                <div>
                    <h1 className="text-xl font-bold text-[#f8fafc] flex items-center gap-2">
                        <Bell size={18} className="text-[#34d399]" /> System Notifications
                    </h1>
                    <p className="text-xs text-[#94a3b8] mt-0.5">Real-time alerts, bank rail updates, and security logs</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={markAllRead}
                        className="h-8 gap-1.5 text-xs bg-[#131d2a] hover:bg-[#1e293b] text-[#f8fafc] border border-[#1e293b]"
                    >
                        <Check size={14} /> Mark all read
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAll}
                        className="h-8 gap-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/30"
                    >
                        <Trash2 size={14} /> Clear
                    </Button>
                </div>
            </div>

            <div className="space-y-3">
                {isLoading ? (
                    <div className="p-12 text-center text-[#94a3b8] text-sm bg-[#0b131e] rounded-xl border border-[#1e293b]">
                        Loading system notifications...
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="p-12 text-center text-[#94a3b8] text-sm bg-[#0b131e] rounded-xl border border-[#1e293b]">
                        No active alerts or notifications.
                    </div>
                ) : (
                    notifications.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedNotification(item)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-4 ${item.isRead
                                ? "bg-[#0c141f] border-[#1e293b] hover:border-[#334155]"
                                : "bg-[#064e3b]/20 border-[#059669]/40 hover:border-[#10b981]/60 shadow-xs"
                                }`}
                        >
                            <div className={`p-2 rounded-lg border mt-0.5 shrink-0 ${item.isRead
                                ? "bg-[#131d2a] border-[#1e293b]"
                                : "bg-[#064e3b]/40 border-[#059669]/40"
                                }`}>
                                {item.type === "security" ? (
                                    <ShieldAlert size={16} className="text-[#fbbf24]" />
                                ) : item.type === "success" ? (
                                    <CheckCircle2 size={16} className="text-[#34d399]" />
                                ) : (
                                    <Info size={16} className="text-[#60a5fa]" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                    <h4 className={`text-xs font-bold truncate ${item.isRead ? "text-[#e2e8f0]" : "text-[#f8fafc]"}`}>
                                        {item.title}
                                    </h4>
                                    <span className={`text-[10px] font-mono shrink-0 ${item.isRead ? "text-[#64748b]" : "text-[#34d399]"}`}>
                                        {item.time}
                                    </span>
                                </div>
                                <p className={`text-xs mt-1 leading-relaxed ${item.isRead ? "text-[#94a3b8]" : "text-[#cbd5e1]"}`}>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <NotificationModal
                isOpen={Boolean(selectedNotification)}
                onClose={() => setSelectedNotification(null)}
                notification={selectedNotification}
            />
        </div>
    );
}
