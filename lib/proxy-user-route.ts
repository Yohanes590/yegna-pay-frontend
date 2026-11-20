import { getBackendUrl } from "@/lib/backend-url";
import { buildBffBackendHeaders } from "@/lib/bff-auth-headers";

type JsonRecord = Record<string, unknown>;

export async function proxyUserPost(req: Request, backendPath: string) {
    const body = (await req.json().catch(() => ({}))) as JsonRecord;
    const bodyToken =
        (typeof body.token === "string" ? body.token : "") ||
        (typeof body.user_token === "string" ? body.user_token : "");
    const headers = buildBffBackendHeaders(req, bodyToken);

    const bearer = headers.Authorization?.replace(/^Bearer\s+/i, "").trim();
    if (bearer && !(typeof body.token === "string" && body.token.trim())) {
        body.token = bearer;
    }

    if (process.env.BFF_AUTH_DEBUG === "1") {
        const cookie = req.headers.get("cookie") || "";
        console.info("[bff proxy]", backendPath, {
            hasAuthorization: Boolean(headers.Authorization),
            cookieHasAccess: cookie.includes("access_token="),
            cookieHasBetterAuth: cookie.includes("better-auth.session_token"),
            cookieHasSecureBetterAuth: cookie.includes("__Secure-better-auth.session_token"),
            bodyHasToken: Boolean(body.token),
        });
    }

    const backendRes = await fetch(`${getBackendUrl()}${backendPath}`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    });
    const data = await backendRes.json().catch(() => ({}));
    return { data, status: backendRes.status };
}