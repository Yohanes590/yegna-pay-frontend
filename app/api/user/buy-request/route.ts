import { NextResponse } from "next/server";
import { buildBffBackendHeaders } from "@/lib/bff-auth-headers";
import { fetchBackendJson } from "@/lib/bff-upstream";

async function proxyBuyRequest(req: Request, method: string, body?: string) {
    const headers = buildBffBackendHeaders(req);
    const init: RequestInit = { method, headers, cache: "no-store" };
    if (body !== undefined) init.body = body;

    const result = await fetchBackendJson("/user/buy-request", init, "api/user/buy-request");
    return NextResponse.json(result.data, { status: result.status });
}

export async function GET(req: Request) {
    try {
        return await proxyBuyRequest(req, "GET");
    } catch {
        return NextResponse.json({ success: false, message: "Backend connection error" }, { status: 502 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.text().catch(() => "{}");
        return await proxyBuyRequest(req, "POST", body);
    } catch {
        return NextResponse.json({ success: false, message: "Backend connection error" }, { status: 502 });
    }
}