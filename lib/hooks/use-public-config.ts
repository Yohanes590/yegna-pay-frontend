"use client";

import { useState, useEffect } from "react";

export interface PublicConfig {
    requestCurrency: number;
    currency: string;
    freeRequests: number;
    loading: boolean;
}

let cachedConfig: { requestCurrency: number; currency: string; freeRequests: number } = {
    requestCurrency: 0.5,
    currency: "ETB",
    freeRequests: 200,
};

let hasFetched = false;

export function usePublicConfig(): PublicConfig {
    const [config, setConfig] = useState(cachedConfig);
    const [loading, setLoading] = useState(!hasFetched);

    useEffect(() => {
        let isMounted = true;
        fetch("/api/config/public")
            .then((res) => res.json())
            .then((data) => {
                if (data && data.success && isMounted) {
                    const cost = Number(data.request_currency ?? data.cost_per_request ?? 0.5);
                    const curr = data.currency || "ETB";
                    const free = Number(data.free_requests ?? 200);
                    cachedConfig = { requestCurrency: cost, currency: curr, freeRequests: free };
                    hasFetched = true;
                    setConfig(cachedConfig);
                }
            })
            .catch(() => {})
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return { ...config, loading };
}
