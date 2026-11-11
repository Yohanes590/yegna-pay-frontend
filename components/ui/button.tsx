"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-xs font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none active:scale-[0.98]",
    {
        variants: {
            variant: {
                default:
                    "bg-[#064e3b] text-white shadow-sm hover:bg-[#022c22] border border-[#065f46]",
                emerald:
                    "bg-[#059669] text-white shadow-sm hover:bg-[#047857] border border-[#10b981]/30",
                secondary:
                    "bg-[#f1f5f9] dark:bg-[#1e293b] text-[#0f172a] dark:text-[#f8fafc] hover:bg-[#e2e8f0] dark:hover:bg-[#334155] border border-[#cbd5e1] dark:border-[#334155]",
                outline:
                    "border border-[#cbd5e1] dark:border-[#1e293b] bg-white dark:bg-[#0c141f] text-[#1e293b] dark:text-[#f8fafc] hover:bg-[#f8fafc] dark:hover:bg-[#1e293b] hover:border-[#94a3b8]",
                destructive:
                    "bg-[#e11d48] text-white shadow-sm hover:bg-[#be123c] border border-[#f43f5e]",
                ghost:
                    "text-[#475569] dark:text-[#94a3b8] hover:bg-[#f1f5f9] dark:hover:bg-[#1e293b] hover:text-[#0f172a] dark:hover:text-[#f8fafc]",
                link:
                    "text-[#059669] underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-lg px-6 text-sm",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };

