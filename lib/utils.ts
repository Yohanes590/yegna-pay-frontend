import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | string, currency: string = "ETB"): string {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    if (isNaN(num)) return `0.00 ${currency}`;
    return `${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
}

export function formatDate(dateString: string | Date | undefined): string {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}

export function formatTransactionId(id: string | null | undefined): string {
    if (!id || typeof id !== "string") return "—";
    const trimmed = id.trim();
    const queryParamMatch = trimmed.match(/[?&](?:id|trx|ref|transaction_id)=([^&#\s]+)/i);
    if (queryParamMatch && queryParamMatch[1]) {
        return decodeURIComponent(queryParamMatch[1]).trim();
    }
    const routeMatch = trimmed.match(/(?:\/transaction\/|\/slip\/|\/receipt\/)([^/?&#\s]+)/i);
    if (routeMatch && routeMatch[1]) {
        return decodeURIComponent(routeMatch[1]).trim();
    }
    return trimmed
        .replace(/^\?id=/i, "")
        .replace(/^\?trx=/i, "")
        .replace(/^#\/transaction\//i, "")
        .replace(/^#\//, "")
        .replace(/^\/+/, "")
        .split("?")[0]
        .split("#")[0]
        .trim();
}

export function getTransactionPlatform(transaction: any): "CBE" | "AWASH" | "BOA" | string {
    const rawPlatform = String(transaction?.platform || "").trim().toUpperCase();
    const rawMethod = String(transaction?.method || "").trim().toUpperCase();
    const rawLogBank = String(transaction?.Logs?.[0]?.transaction_bank || "").trim().toUpperCase();
    const rawTxId = String(transaction?.transaction_id || "").trim().toUpperCase();

    const combined = `${rawPlatform} ${rawMethod} ${rawLogBank}`.trim();

    if (combined.includes("AWASH") || combined.includes("AWAS") || rawTxId.includes("AWASHPAY")) {
        return "AWASH";
    }
    if (combined.includes("BOA") || combined.includes("ABYSSINIA") || rawTxId.includes("BANKOFABYSSINIA") || rawTxId.includes("?TRX=")) {
        return "BOA";
    }
    if (combined.includes("CBE") || rawMethod === "LINK" || rawTxId.includes("APPS.CBE.COM.ET") || rawTxId.includes("?ID=")) {
        return "CBE";
    }
    return rawPlatform || rawMethod || "CBE";
}

export function formatPlatformLabel(platform: string): string {
    const upper = String(platform || "").toUpperCase();
    if (upper === "AWASH") return "Awash";
    if (upper === "BOA") return "BOA";
    if (upper === "CBE") return "CBE";
    return platform || "CBE";
}

export function getReceiptUrl(transaction: { method?: string; transaction_id?: string; transaction_url?: string } | any): string {
    if (transaction?.transaction_url && (transaction.transaction_url.startsWith("http://") || transaction.transaction_url.startsWith("https://"))) {
        return transaction.transaction_url;
    }

    const rawId = transaction?.transaction_id || "";
    const cleanId = formatTransactionId(rawId);
    if (!cleanId || cleanId === "—") return "#";

    const bank = getTransactionPlatform(transaction);

    if (bank === "BOA") {
        return `https://cs.bankofabyssinia.com/slip/?trx=${cleanId}`;
    }
    if (bank === "AWASH") {
        return `https://awashpay.awashbank.com:8225/${cleanId}`;
    }
    return `https://apps.cbe.com.et/?id=${cleanId}`;
}



