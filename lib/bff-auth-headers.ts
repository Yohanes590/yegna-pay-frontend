/**
 * Auth cookie names (Better Auth on API host; `access_token` on www.yegnapay.com).
 *
 * On GitHub OAuth, session cookies are set on the **API origin** (e.g. apiyegna.yonas.cloud):
 *   - `better-auth.session_token` (HTTP / dev)
 *   - `__Secure-better-auth.session_token` (HTTPS production)
 *
 * The dashboard (yegnapay.com) usually only has `access_token` (app JWT or session token
 * copied from the OAuth redirect `?token=`). Vercel BFF must read every same-origin cookie
 * and the `Authorization` header / JSON body `token` from the browser.
 */
export const BETTER_AUTH_SESSION_COOKIE_NAMES = [
    "access_token",
    "better-auth.session_token",
    "__Secure-better-auth.session_token",
] as const;

function readNamedCookie(cookieHeader: string, cookieName: string): string {
    const escaped = cookieName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${escaped}=([^;]*)`));
    if (!match?.[1]) return "";
    try {
        return decodeURIComponent(match[1].trim());
    } catch {
        return match[1].trim();
    }
}

/** First usable auth token from the incoming Cookie header (dashboard + Better Auth names). */
export function readAuthTokenFromCookieHeader(cookieHeader: string | null): string {
    if (!cookieHeader) return "";
    for (const name of BETTER_AUTH_SESSION_COOKIE_NAMES) {
        const value = readNamedCookie(cookieHeader, name);
        if (value) return value;
    }
    return "";
}

/** @deprecated Use readAuthTokenFromCookieHeader */
export function readAccessTokenFromCookie(cookieHeader: string | null): string {
    return readAuthTokenFromCookieHeader(cookieHeader);
}

export function buildBffBackendHeaders(
    req: Request,
    bodyToken?: string
): Record<string, string> {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const cookie = req.headers.get("cookie");
    if (cookie) headers.cookie = cookie;

    const fromBody = bodyToken?.trim() || "";
    const fromCookie = readAuthTokenFromCookieHeader(cookie);
    const fromAuth = req.headers.get("authorization")?.trim() || "";
    const bearerFromHeader = fromAuth.startsWith("Bearer ")
        ? fromAuth.slice(7).trim()
        : fromAuth.startsWith("bearer ")
        ? fromAuth.slice(7).trim()
        : fromAuth;
    const token = fromBody || bearerFromHeader || fromCookie;

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return headers;
}

export function tokenForBffDebug(req: Request, bodyToken?: string): {
    hasAuthorization: boolean;
    cookieNamesPresent: string[];
    tokenSource: string;
} {
    const cookie = req.headers.get("cookie") || "";
    const cookieNamesPresent = BETTER_AUTH_SESSION_COOKIE_NAMES.filter((name) =>
        cookie.includes(`${name}=`)
    );
    const fromBody = Boolean(bodyToken?.trim());
    const fromAuth = Boolean(req.headers.get("authorization")?.trim());
    const fromCookie = Boolean(readAuthTokenFromCookieHeader(cookie));
    const tokenSource = fromBody
        ? "body"
        : fromAuth
        ? "authorization"
        : fromCookie
        ? "cookie"
        : "none";
    return {
        hasAuthorization: fromBody || fromAuth || fromCookie,
        cookieNamesPresent,
        tokenSource,
    };
}