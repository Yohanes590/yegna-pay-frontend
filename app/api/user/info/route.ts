import { NextResponse } from "next/server";
import { buildBffBackendHeaders, readAuthTokenFromCookieHeader } from "@/lib/bff-auth-headers";
import { fetchBackendJson } from "@/lib/bff-upstream";

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => ({}));
        const bodyToken = typeof body?.token === "string" ? body.token : "";
        const cookieToken = readAuthTokenFromCookieHeader(req.headers.get("cookie"));
        const token = bodyToken.trim() || cookieToken;
        const headers = buildBffBackendHeaders(req, token);

        const result = await fetchBackendJson(
            "/auth/check",
            {
                method: "POST",
                headers,
                body: JSON.stringify({ ...body, token }),
            },
            "api/user/info"
        );

        const data = result.data;

        if (result.ok && data?.fetchEmail) {
            const response = NextResponse.json({
                user: data.fetchEmail,
                token: data.token,
                status: true,
            });
            if (typeof data.token === "string" && data.token) {
                response.cookies.set("access_token", data.token, {
                    path: "/",
                    maxAge: 7 * 24 * 60 * 60,
                    sameSite: "lax",
                    secure: process.env.NODE_ENV === "production",
                });
            }
            return response;
        }

        const message =
            (typeof data?.message === "string" && data.message) ||
            result.fetchError ||
            "Failed to retrieve user information";
        const hint = typeof data?.hint === "string" ? data.hint : undefined;
        const detail =
            (typeof data?.detail === "string" && data.detail) ||
            (typeof result.fetchError === "string" ? result.fetchError : undefined);

        const clientStatus =
            result.status >= 400 && result.status < 600 ? result.status : result.ok ? 400 : result.status;

        return NextResponse.json(
            { message, hint, detail, status: false },
            { status: clientStatus }
        );
    } catch (err: unknown) {
        const detail = err instanceof Error ? err.message : "unknown";
        console.error("[api/user/info] unhandled", detail);
        return NextResponse.json(
            {
                message: "BFF handler error",
                status: false,
                detail,
            },
            { status: 500 }
        );
    }
}