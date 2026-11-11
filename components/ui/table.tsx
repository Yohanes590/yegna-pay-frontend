import * as React from "react";
import { cn } from "@/lib/utils";

const Table = React.forwardRef<
    HTMLTableElement,
    React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
        <table
            ref={ref}
            className={cn("w-full caption-bottom text-xs text-left", className)}
            {...props}
        />
    </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <thead
        ref={ref}
        className={cn("[&_tr]:border-b [&_tr]:border-[#e2e8f0] dark:[&_tr]:border-[#1e293b] bg-[#f8fafc]/80 dark:bg-[#131d2a]/80", className)}
        {...props}
    />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={cn("[&_tr:last-child]:border-0 divide-y divide-[#f1f5f9] dark:divide-[#1e293b]", className)}
        {...props}
    />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <tfoot
        ref={ref}
        className={cn(
            "border-t border-[#e2e8f0] dark:border-[#1e293b] bg-[#f8fafc] dark:bg-[#131d2a] font-medium [&>tr]:last:border-b-0",
            className
        )}
        {...props}
    />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
    HTMLTableRowElement,
    React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={cn(
            "border-b border-[#f1f5f9] dark:border-[#1e293b] transition-colors hover:bg-[#f8fafc]/70 dark:hover:bg-[#131d2a]/50 data-[state=selected]:bg-[#f1f5f9] dark:data-[state=selected]:bg-[#1e293b]",
            className
        )}
        {...props}
    />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
    HTMLTableCellElement,
    React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={cn(
            "h-10 px-4 text-left align-middle font-semibold text-[#64748b] dark:text-[#94a3b8] text-[11px] uppercase tracking-wider [&:has([role=checkbox])]:pr-0",
            className
        )}
        {...props}
    />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
    HTMLTableCellElement,
    React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={cn(
            "p-4 align-middle [&:has([role=checkbox])]:pr-0 text-[#1e293b] dark:text-[#f8fafc] font-medium",
            className
        )}
        {...props}
    />
));
TableCell.displayName = "TableCell";

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
};

