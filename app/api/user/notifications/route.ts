import { NextResponse } from "next/server";
import { getBackendUrl } from "@/lib/backend-url";
import { buildBffBackendHeaders } from "@/lib/bff-auth-headers";

async function proxyToBackend(req: Request, method: string) {
    let backendUrl: string;
    try {
        backendUrl = getBackendUrl();
    } catch {
        return NextResponse.json({ success: false, notifications: [], unreadCount: 0 }, { status: 500 });
    }

    try {
        const headers = buildBffBackendHeaders(req);
        const init: RequestInit = { method, headers, cache: "no-store" };
        if (method !== "GET" && method !== "DELETE") {
            init.body = await req.text().catch(() => undefined);
        }

        const backendRes = await fetch(`${backendUrl}/api/user/notifications`, init);
        const data = await backendRes.json().catch(() => ({}));
        return NextResponse.json(data, { status: backendRes.status });
    } catch {
        return NextResponse.json({ success: false, notifications: [], unreadCount: 0 }, { status: 502 });
    }
}

export async function GET(req: Request) {
    return proxyToBackend(req, "GET");
}

export async function PATCH(req: Request) {
    return proxyToBackend(req, "PATCH");
}

export async function DELETE(req: Request) {
    return proxyToBackend(req, "DELETE");
}