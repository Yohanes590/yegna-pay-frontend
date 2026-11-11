import { NextResponse } from "next/server";
import { getBackendUrl } from "@/lib/backend-url";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        const cookie = req.headers.get("cookie");
        if (cookie) headers["cookie"] = cookie;

        const backendRes = await fetch(`${getBackendUrl()}/user/delete-project`, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        });
        const data = await backendRes.json();
        return NextResponse.json(data, { status: backendRes.status });
    } catch {
        return NextResponse.json({ success: false, message: "Backend connection error" }, { status: 502 });
    }
}
