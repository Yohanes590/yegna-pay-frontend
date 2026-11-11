import { cn } from "@/lib/utils";

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-[#f1f5f9] border border-[#e2e8f0]/60",
                className
            )}
            {...props}
        />
    );
}

export { Skeleton };

