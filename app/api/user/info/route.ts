import { NextResponse } from "next/server";
import { getBackendUrl } from "@/lib/backend-url";
import { buildBffBackendHeaders, readAuthTokenFromCookieHeader } from "@/lib/bff-auth-headers";

export async function POST(req: Request) {
    let backendUrl: string;
    try {
        backendUrl = getBackendUrl();
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Backend URL not configured";
        console.error("[api/user/info]", message);
        return NextResponse.json(
            {
                status: false,
                message: "Server misconfiguration: set NEXT_PUBLIC_BACKEND_URL on Vercel (Production).",
                detail: message,
            },
            { status: 500 }
        );
    }

    try {
        const body = await req.json().catch(() => ({}));
        const bodyToken = typeof body?.token === "string" ? body.token : "";
        const cookieToken = readAuthTokenFromCookieHeader(req.headers.get("cookie"));
        const token = bodyToken.trim() || cookieToken;
        const headers = buildBffBackendHeaders(req, token);

        const backendRes = await fetch(`${backendUrl}/auth/check`, {
            method: "POST",
            headers,
            body: JSON.stringify({ ...body, token }),
        });

        const rawText = await backendRes.text();
        let data: Record<string, unknown> = {};
        try {
            data = rawText ? JSON.parse(rawText) : {};
        } catch {
            console.error("[api/user/info] non-JSON backend response", backendRes.status, rawText.slice(0, 200));
            return NextResponse.json(
                {
                    status: false,
                    message: "Authentication server returned an invalid response.",
                },
                { status: 502 }
            );
        }

        if (backendRes.ok && data?.fetchEmail) {
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
            "Failed to retrieve user information";
        const hint = typeof data?.hint === "string" ? data.hint : undefined;

        return NextResponse.json(
            { message, hint, status: false },
            { status: backendRes.status >= 400 && backendRes.status < 600 ? backendRes.status : 401 }
        );
    } catch (err: unknown) {
        const detail = err instanceof Error ? err.message : "unknown";
        console.error("[api/user/info] upstream error", detail);
        return NextResponse.json(
            {
                message: "Unable to connect to authentication server",
                status: false,
                detail,
            },
            { status: 502 }
        );
    }
}