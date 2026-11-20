/** Parse access_token from browser Cookie header on same-origin BFF requests. */
export function readAccessTokenFromCookie(cookieHeader: string | null): string {
    if (!cookieHeader) return "";
    const match = cookieHeader.match(/(?:^|;\s*)access_token=([^;]*)/);
    if (!match?.[1]) return "";
    try {
        return decodeURIComponent(match[1].trim());
    } catch {
        return match[1].trim();
    }
}

export function buildBffBackendHeaders(
    req: Request,
    bodyToken?: string
): Record<string, string> {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const cookie = req.headers.get("cookie");
    if (cookie) headers.cookie = cookie;

    const fromBody = bodyToken?.trim() || "";
    const fromCookie = readAccessTokenFromCookie(cookie);
    const fromAuth = req.headers.get("authorization")?.trim() || "";
    const token = fromBody || fromCookie || (fromAuth.startsWith("Bearer ") ? fromAuth.slice(7).trim() : fromAuth);

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    } else if (fromAuth) {
        headers.Authorization = fromAuth;
    }

    return headers;
}