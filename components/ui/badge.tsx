import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border border-transparent bg-[#064e3b] text-white",
                verified:
                    "border border-[#059669]/20 bg-[#ecfdf5] dark:bg-[#064e3b]/30 text-[#065f46] dark:text-[#34d399]",
                pending:
                    "border border-[#d97706]/20 bg-[#fffbeb] dark:bg-amber-950/30 text-[#92400e] dark:text-amber-400",
                rejected:
                    "border border-[#e11d48]/20 bg-[#fff1f2] dark:bg-rose-950/30 text-[#9f1239] dark:text-rose-400",
                outline:
                    "border border-[#e2e8f0] dark:border-[#1e293b] bg-white dark:bg-[#0c141f] text-[#475569] dark:text-[#94a3b8]",
                subtle:
                    "border border-[#e2e8f0] dark:border-[#1e293b] bg-[#f8fafc] dark:bg-[#131d2a] text-[#334155] dark:text-[#cbd5e1]",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };

