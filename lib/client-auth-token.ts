import Cookies from "js-cookie";
import { authClient } from "@/lib/auth-client";

/** JWT or Better Auth session token for BFF → API calls (cross-domain). */
export async function getClientAuthToken(): Promise<string | null> {
    const cookieToken = Cookies.get("access_token")?.trim();
    if (cookieToken) return cookieToken;

    try {
        const session = await authClient.getSession();
        const sessionToken = session?.data?.session?.token?.trim();
        if (sessionToken) return sessionToken;
    } catch {
        // ignore
    }

    return null;
}

/** Refresh app JWT via /api/user/info when session exists but access_token expired. */
export async function ensureFreshAuthToken(): Promise<string | null> {
    const existing = await getClientAuthToken();
    const infoRes = await fetch("/api/user/info", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: existing || "" }),
    }).catch(() => null);

    if (infoRes?.ok) {
        const data = await infoRes.json().catch(() => ({}));
        if (data?.token) {
            Cookies.set("access_token", data.token, { expires: 7 });
            return data.token as string;
        }
        if (data?.user) {
            return Cookies.get("access_token") || existing;
        }
    }

    return existing;
}