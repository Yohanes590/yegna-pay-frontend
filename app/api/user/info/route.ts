import { NextResponse } from "next/server";
import { getBackendUrl } from "@/lib/backend-url";

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => ({}));
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
        const cookie = req.headers.get("cookie");
        if (cookie) headers["cookie"] = cookie;

        const backendRes = await fetch(`${getBackendUrl()}/auth/check`, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        });

        const data = await backendRes.json();
        if (backendRes.ok && data?.fetchEmail) {
            const response = NextResponse.json({
                user: data.fetchEmail,
                token: data.token,
                status: true,
            });
            if (data.token) {
                response.cookies.set("access_token", data.token, {
                    path: "/",
                    maxAge: 7 * 24 * 60 * 60,
                    sameSite: "lax",
                });
            }
            return response;
        }

        return NextResponse.json({
            message: data?.message || "Failed to retrieve user information",
            status: false,
        }, { status: backendRes.status || 400 });
    } catch {
        return NextResponse.json({
            message: "Unable to connect to authentication server",
            status: false,
        }, { status: 502 });
    }
}
