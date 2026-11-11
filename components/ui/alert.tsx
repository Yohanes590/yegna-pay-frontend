import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
    "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground text-xs",
    {
        variants: {
            variant: {
                default: "bg-white dark:bg-[#0c141f] text-[#0f172a] dark:text-[#f8fafc] border-[#e2e8f0] dark:border-[#1e293b]",
                destructive:
                    "border-red-500/50 text-red-600 dark:text-red-400 dark:border-red-500/30 [&>svg]:text-red-600 bg-red-50/50 dark:bg-red-950/20",
                success:
                    "border-emerald-500/50 text-emerald-700 dark:text-emerald-300 dark:border-emerald-500/30 [&>svg]:text-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

const Alert = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
    <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
    />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={cn("mb-1 font-semibold leading-none tracking-tight text-xs", className)}
        {...props}
    />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-[11px] [&_p]:leading-relaxed text-[#64748b] dark:text-[#94a3b8]", className)}
        {...props}
    />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };

