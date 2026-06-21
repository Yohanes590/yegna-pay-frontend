"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Check, Trash2, ShieldAlert, CheckCircle2, Info, X } from 'lucide-react';

interface Notification {
    id: string;
    type: 'security' | 'success' | 'info' | 'system';
    title: string;
    description: string;
    time: string;
    isRead: boolean;
    longDetails?: string;
}

export default function NotificationReceiver() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

    const demoMessages: Notification[] = useMemo(() => [
        {
            id: '1',
            type: 'security',
            title: 'Vulnerability Detected',
            description: 'Critical SQL Injection vulnerability identified in repository "api-gateway". Action required.',
            time: '2 mins ago',
            isRead: false,
            longDetails: 'Path: /src/api/v1/auth/login.ts\nParameter: email\nSeverity: CRITICAL (9.8)\n\nAn unsanitized input variable was mapped directly to a raw PostgreSQL string query execution. Implement parameterized database queries or use an ORM to patch this vulnerability.'
        },
        {
            id: '2',
            type: 'success',
            title: 'Scan Completed Successfully',
            description: 'Massive analysis for "frontend-app" finished with 0 critical issues found.',
            time: '1 hour ago',
            isRead: false,
            longDetails: 'Total Repositories Scanned: 1\nFiles Scanned: 142\nTime Elapsed: 43s\n\nDependencies checked against up-to-date vulnerability graphs. No high or critical security alerts detected in your Tailwind, Next.js, or package structures.'
        },
        {
            id: '3',
            type: 'info',
            title: 'System Update',
            description: 'Black box scanning engine upgraded to v2.4. New payload configurations are now active.',
            time: '5 hours ago',
            isRead: true,
            longDetails: 'Engine Update Release Notes:\n• Configured 14 new passive payloads for cross-site scripting (XSS)\n• Optimized background processing tasks to run 20% faster on large analysis maps\n• Adjusted memory leaks detection hooks.'
        },
        {
            id: '4',
            type: 'security',
            title: 'Leaked Secret Blocked',
            description: 'An exposed GitHub Personal Access Token was detected and flagged in commit #8812f.',
            time: 'Yesterday',
            isRead: true,
            longDetails: 'Commit Hash: 8812f9b8c21a4f\nAuthor: jo-dev\nFile: .env.production\n\nAction taken: The secret scanner automatically flagged the commit push, preventing active production variables leaks. Please revoke the exposed GitHub Token immediately.'
        }
    ], []);

    useEffect(() => {
        const fetchNotifications = async () => {
            setIsLoading(true);
            try {
                await new Promise((resolve) => setTimeout(resolve, 600));
                setNotifications(demoMessages);
            } catch (error) {
                console.error('Failed to load alerts:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotifications();
    }, [demoMessages]);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const handleOpenDetail = (notification: Notification) => {
        setSelectedNotification(notification);
        if (!notification.isRead) {
            markAsRead(notification.id);
        }
    };

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const deleteNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const getTypeStyles = (type: Notification['type']) => {
        switch (type) {
            case 'security':
                return {
                    icon: <ShieldAlert className="w-4 h-4 text-emerald-400" />,
                    iconBg: 'bg-emerald-950/40 border-emerald-500/20'
                };
            case 'success':
                return {
                    icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
                    iconBg: 'bg-emerald-950/20 border-emerald-800/30'
                };
            default:
                return {
                    icon: <Info className="w-4 h-4 text-slate-400" />,
                    iconBg: 'bg-slate-900 border-slate-800'
                };
        }
    };


    return (
        <div className="w-full text-slate-200 antialiased bg-[#020617]">
            {/* Control Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                    Live Feed {unreadCount > 0 && `(${unreadCount} new)`}
                </span>

                {!isLoading && unreadCount > 0 && (
                    <button
                        onClick={markAllAsRead}
                        className="text-[11px] font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                    >
                        <Check className="w-3 h-3" /> Clear badges
                    </button>
                )}
            </div>

            {/* Main List */}
            <div className="divide-y divide-slate-800/40">
                {isLoading ? (
                    [1, 2, 3].map((n) => (
                        <div key={n} className="py-4 flex gap-3 animate-pulse">
                            <div className="w-7 h-7 bg-slate-900 rounded border border-slate-800/60 shrink-0" />
                            <div className="flex-1 space-y-2 py-0.5">
                                <div className="flex justify-between">
                                    <div className="h-3 bg-slate-900 rounded w-1/3" />
                                    <div className="h-2 bg-slate-900 rounded w-12" />
                                </div>
                                <div className="h-3 bg-slate-900 rounded w-3/4" />
                            </div>
                        </div>
                    ))
                ) : notifications.length === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-500">
                        No active alerts.
                    </div>
                ) : (
                    notifications.map((notification) => {
                        const style = getTypeStyles(notification.type);

                        return (
                            <div
                                key={notification.id}
                                className={`py-3.5 flex gap-3 transition-colors group relative ${notification.isRead ? 'opacity-50 hover:opacity-90' : ''
                                    }`}
                            >
                                {/* Notification Icon */}
                                <div className={`mt-0.5 p-1.5 rounded border shrink-0 ${style.iconBg}`}>
                                    {style.icon}
                                </div>

                                {/* Main block details */}
                                <div className="flex-1 min-w-0 pr-6">
                                    <div className="flex items-baseline justify-between gap-2">
                                        <button
                                            onClick={() => handleOpenDetail(notification)}
                                            className={`text-xs font-medium truncate text-left hover:text-emerald-400 transition-colors ${!notification.isRead ? 'text-slate-100 font-semibold' : 'text-slate-400'
                                                }`}
                                        >
                                            {notification.title}
                                        </button>
                                        <span className="text-[10px] text-slate-500 whitespace-nowrap">{notification.time}</span>
                                    </div>

                                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed break-words">
                                        {notification.description}
                                    </p>

                                    <div className="flex items-center gap-3 mt-2">
                                        <button
                                            onClick={() => handleOpenDetail(notification)}
                                            className="text-[10px] text-emerald-400 hover:underline font-medium"
                                        >
                                            View Logs
                                        </button>
                                        {!notification.isRead && (
                                            <button
                                                onClick={() => markAsRead(notification.id)}
                                                className="text-[10px] text-slate-500 hover:text-emerald-400 font-medium transition-colors"
                                            >
                                                Acknowledge
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Trash option */}
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-0 top-3.5">
                                    <button
                                        onClick={() => deleteNotification(notification.id)}
                                        className="p-1 text-slate-600 hover:text-rose-400 transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Pop-up Analysis Modal */}
            {selectedNotification && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
                    <div className="w-full max-w-lg bg-[#0b1329] border border-slate-800 rounded-xl shadow-2xl overflow-hidden text-slate-200">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-800/80 bg-[#020617]">
                            <div className="flex items-center gap-2">
                                <div className={`p-1.5 rounded border ${getTypeStyles(selectedNotification.type).iconBg}`}>
                                    {getTypeStyles(selectedNotification.type).icon}
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-100">{selectedNotification.title}</h3>
                                    <p className="text-[10px] text-slate-500">{selectedNotification.time}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedNotification(null)}
                                className="p-1 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-900 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-5 space-y-4 max-h-[400px] overflow-y-auto">
                            <div>
                                <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase block mb-1">Summary</span>
                                <p className="text-xs text-slate-300 bg-[#020617] p-3 rounded border border-slate-800/40 leading-relaxed">
                                    {selectedNotification.description}
                                </p>
                            </div>

                            {selectedNotification.longDetails && (
                                <div>
                                    <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase block mb-1">Analysis Logs</span>
                                    <pre className="text-[11px] font-mono text-emerald-400 bg-[#020617] p-3 rounded border border-emerald-950/60 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                                        {selectedNotification.longDetails}
                                    </pre>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-3 bg-[#020617] border-t border-slate-800/80 flex justify-end">
                            <button
                                onClick={() => setSelectedNotification(null)}
                                className="px-3 py-1.5 bg-emerald-950/40 text-emerald-400 hover:bg-emerald-900/40 border border-emerald-500/20 rounded text-xs font-medium transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}