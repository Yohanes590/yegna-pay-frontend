"use client";

import { useTheme } from "@/lib/theme-context";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
    const themeContext = useTheme();
    const currentTheme = themeContext?.theme || "system";

    return (
        <Sonner
            theme={currentTheme as ToasterProps["theme"]}
            className="toaster group"
            richColors
            closeButton
            toastOptions={{
                classNames: {
                    toast:
                        "group toast group-[.toaster]:bg-white dark:group-[.toaster]:bg-[#0f172a] group-[.toaster]:text-[#0f172a] dark:group-[.toaster]:text-[#f8fafc] group-[.toaster]:border-[#e2e8f0] dark:group-[.toaster]:border-[#1e293b] group-[.toaster]:shadow-lg font-sans text-xs",
                    description: "group-[.toast]:text-[#64748b] dark:group-[.toast]:text-[#94a3b8]",
                    actionButton:
                        "group-[.toast]:bg-[#0f172a] group-[.toast]:text-[#f8fafc] dark:group-[.toast]:bg-[#f8fafc] dark:group-[.toast]:text-[#0f172a]",
                    cancelButton:
                        "group-[.toast]:bg-[#f1f5f9] group-[.toast]:text-[#64748b] dark:group-[.toast]:bg-[#1e293b] dark:group-[.toast]:text-[#94a3b8]",
                },
            }}
            {...props}
        />
    );
};

export { Toaster, toast };

