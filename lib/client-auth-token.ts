import Cookies from "js-cookie";
import { authClient } from "@/lib/auth-client";

async function exchangeForAppJwt(token: string): Promise<string | null> {
    const res = await fetch("/api/user/info", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
    }).catch(() => null);

    if (!res?.ok) return null;
    const data = await res.json().catch(() => ({}));
    return typeof data?.token === "string" && data.token ? data.token : null;
}

/**
 * Token for dashboard mutations (create/edit/delete project).
 * Cross-site: UI is www.yegnapay.com, auth API is on another host — use Better Auth
 * session token from the browser when the yegnapay.com cookie is stale or wrong.
 */
export async function getMutationAuthToken(): Promise<string | null> {
    try {
        const session = await authClient.getSession();
        const sessionToken = session?.data?.session?.token?.trim();
        if (sessionToken) {
            void exchangeForAppJwt(sessionToken).then((jwt) => {
                if (jwt) Cookies.set("access_token", jwt, { expires: 7 });
            });
            return sessionToken;
        }
    } catch {
        // continue
    }

    const cookieToken = Cookies.get("access_token")?.trim();
    if (cookieToken) return cookieToken;

    if (typeof window !== "undefined") {
        const urlToken = new URLSearchParams(window.location.search).get("token")?.trim();
        if (urlToken) return urlToken;
    }

    return null;
}

/** @deprecated Use getMutationAuthToken — does not clear cookies or force sign-out. */
export async function ensureFreshAuthToken(): Promise<string | null> {
    const token = await getMutationAuthToken();
    if (!token) return null;

    const jwt = await exchangeForAppJwt(token);
    if (jwt) {
        Cookies.set("access_token", jwt, { expires: 7 });
        return jwt;
    }

    return token;
}