import { NextResponse } from "next/server";
import { getBackendUrl } from "@/lib/backend-url";

export async function GET() {
    try {
        const backendRes = await fetch(`${getBackendUrl()}/api/config/public`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        });
        const data = await backendRes.json();
        return NextResponse.json(data, { status: backendRes.status });
    } catch {
        return NextResponse.json(
            {
                status: 200,
                success: true,
                request_currency: 0.5,
                cost_per_request: 0.5,
                currency: "ETB",
                free_requests: 200,
            },
            { status: 200 }
        );
    }
}
