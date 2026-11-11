import { NextResponse } from "next/server";
import { getBackendUrl } from "@/lib/backend-url";

function buildForwardHeaders(req: Request): Record<string, string> {
    const headers: Record<string, string> = {};
    const cookie = req.headers.get("cookie");
    const authorization = req.headers.get("authorization");
    const xAccessToken = req.headers.get("x-access-token");

    if (cookie) headers["cookie"] = cookie;
    if (authorization) headers["authorization"] = authorization;
    if (xAccessToken) headers["x-access-token"] = xAccessToken;

    return headers;
}

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        if (!id) {
            return NextResponse.json(
                { status: 400, success: false, message: "Image ID is required" },
                { status: 400 }
            );
        }

        const backendRes = await fetch(
            `${getBackendUrl()}/qr-images/file/${encodeURIComponent(id)}`,
            {
                method: "GET",
                headers: buildForwardHeaders(req),
                cache: "no-store",
            }
        );

        if (!backendRes.ok) {
            const errorBody = await backendRes.text();
            return new NextResponse(errorBody || "Image not found", {
                status: backendRes.status,
                headers: {
                    "Content-Type":
                        backendRes.headers.get("content-type") || "application/json",
                },
            });
        }

        const buffer = await backendRes.arrayBuffer();
        const contentType =
            backendRes.headers.get("content-type") || "application/octet-stream";
        const cacheControl =
            backendRes.headers.get("cache-control") || "private, max-age=300";

        return new NextResponse(buffer, {
            status: 200,
            headers: {
                "Content-Type": contentType,
                "Cache-Control": cacheControl,
            },
        });
    } catch {
        return NextResponse.json(
            { status: 502, success: false, message: "Unable to load QR receipt image" },
            { status: 502 }
        );
    }
}

