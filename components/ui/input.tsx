import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-9 w-full rounded-lg border border-[#cbd5e1] dark:border-[#1e293b] bg-white dark:bg-[#131d2a] px-3 py-1 text-xs text-[#0f172a] dark:text-[#f8fafc] shadow-xs transition-colors file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-[#94a3b8] dark:placeholder:text-[#64748b] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#059669] focus-visible:border-[#059669] disabled:cursor-not-allowed disabled:opacity-50 font-medium",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };

