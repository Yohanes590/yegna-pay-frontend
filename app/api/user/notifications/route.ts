import { NextResponse } from "next/server";
import { getBackendUrl } from "@/lib/backend-url";

export async function GET(req: Request) {
    try {
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        const cookie = req.headers.get("cookie");
        if (cookie) headers["cookie"] = cookie;
        const auth = req.headers.get("authorization");
        if (auth) headers["authorization"] = auth;

        const backendRes = await fetch(`${getBackendUrl()}/api/user/notifications`, {
            method: "GET",
            headers,
            cache: "no-store",
        });
        const data = await backendRes.json();
        return NextResponse.json(data, { status: backendRes.status });
    } catch {
        return NextResponse.json({ success: false, notifications: [], unreadCount: 0 }, { status: 502 });
    }
}

export async function PATCH(req: Request) {
    try {
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        const cookie = req.headers.get("cookie");
        if (cookie) headers["cookie"] = cookie;
        const auth = req.headers.get("authorization");
        if (auth) headers["authorization"] = auth;

        const backendRes = await fetch(`${getBackendUrl()}/api/user/notifications`, {
            method: "PATCH",
            headers,
        });
        const data = await backendRes.json();
        return NextResponse.json(data, { status: backendRes.status });
    } catch {
        return NextResponse.json({ success: false, message: "Backend connection error" }, { status: 502 });
    }
}

export async function DELETE(req: Request) {
    try {
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        const cookie = req.headers.get("cookie");
        if (cookie) headers["cookie"] = cookie;
        const auth = req.headers.get("authorization");
        if (auth) headers["authorization"] = auth;

        const backendRes = await fetch(`${getBackendUrl()}/api/user/notifications`, {
            method: "DELETE",
            headers,
        });
        const data = await backendRes.json();
        return NextResponse.json(data, { status: backendRes.status });
    } catch {
        return NextResponse.json({ success: false, message: "Backend connection error" }, { status: 502 });
    }
}
