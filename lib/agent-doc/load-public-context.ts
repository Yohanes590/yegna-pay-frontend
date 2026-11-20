import { getBackendUrl, getPublicBackendUrl } from "@/lib/backend-url";

export type PublicAgentContext = {
    baseUrl: string;
    transactionEndpoint: string;
    dashboardUrl: string;
    banks: { name: string; platform: string; link_readable?: string }[];
    costPerRequest?: number;
    currency?: string;
    freeRequests?: number;
};

const DEFAULT_BANKS = [
    { name: "Commercial Bank of Ethiopia", platform: "CBE", link_readable: "pdf" },
    { name: "Awash Bank", platform: "AWASH", link_readable: "web" },
    { name: "Bank of Abyssinia", platform: "BOA", link_readable: "web" },
];

export async function loadPublicAgentContext(): Promise<PublicAgentContext> {
    const baseUrl = getPublicBackendUrl();
    const transactionEndpoint = `${baseUrl}/api/transaction-create`;
    const dashboardUrl =
        (process.env.NEXT_PUBLIC_APP_URL || "https://www.yegnapay.com").replace(/\/+$/, "");

    let banks = DEFAULT_BANKS;
    let costPerRequest: number | undefined;
    let currency: string | undefined;
    let freeRequests: number | undefined;

    try {
        const res = await fetch(`${getBackendUrl()}/api/config/public`, { cache: "no-store" });
        const data = await res.json().catch(() => ({}));
        if (Array.isArray(data?.banks) && data.banks.length) {
            banks = data.banks;
        }
        costPerRequest = data?.cost_per_request;
        currency = data?.currency;
        freeRequests = data?.free_requests;
    } catch {
        // use defaults
    }

    return {
        baseUrl,
        transactionEndpoint,
        dashboardUrl,
        banks,
        costPerRequest,
        currency,
        freeRequests,
    };
}