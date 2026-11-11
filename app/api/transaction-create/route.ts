import { NextResponse } from "next/server";
import { getBackendUrl } from "@/lib/backend-url";

export async function POST(req: Request) {
    try {
        const headers: Record<string, string> = {};
        const auth = req.headers.get("authorization");
        if (auth) headers["authorization"] = auth;
        const apiKeyHeader = req.headers.get("x-api-key");
        if (apiKeyHeader) headers["x-api-key"] = apiKeyHeader;
        const cookie = req.headers.get("cookie");
        if (cookie) headers["cookie"] = cookie;

        const contentType = req.headers.get("content-type") || "";
        let backendRes: Response;

        const backendUrl = getBackendUrl();

        if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData();
            backendRes = await fetch(`${backendUrl}/api/transaction-create`, {
                method: "POST",
                headers,
                body: formData,
            });
        } else {
            const body = await req.json().catch(() => ({}));
            headers["Content-Type"] = "application/json";
            backendRes = await fetch(`${backendUrl}/api/transaction-create`, {
                method: "POST",
                headers,
                body: JSON.stringify(body),
            });
        }

        const data = await backendRes.json();
        return NextResponse.json(data, { status: backendRes.status });
    } catch {
        return NextResponse.json({ success: false, message: "Backend connection error" }, { status: 502 });
    }
}
