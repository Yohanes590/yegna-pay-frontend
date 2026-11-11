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

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const projectId = url.searchParams.get("projectId");

        if (!projectId) {
            return NextResponse.json(
                { status: 400, success: false, message: "projectId is required" },
                { status: 400 }
            );
        }

        const forwardParams = new URLSearchParams();
        for (const key of ["status", "page", "limit", "search"]) {
            const value = url.searchParams.get(key);
            if (value !== null && value !== "") {
                forwardParams.set(key, value);
            }
        }

        const queryString = forwardParams.toString();
        const targetUrl = `${getBackendUrl()}/qr-images/project/${encodeURIComponent(projectId)}${
            queryString ? `?${queryString}` : ""
        }`;

        const backendRes = await fetch(targetUrl, {
            method: "GET",
            headers: buildForwardHeaders(req),
            cache: "no-store",
        });

        const data = await backendRes.json().catch(() => ({
            success: false,
            message: "Invalid response from server",
        }));

        return NextResponse.json(data, { status: backendRes.status || 500 });
    } catch {
        return NextResponse.json(
            {
                status: 502,
                success: false,
                message: "Unable to connect to QR images backend service",
            },
            { status: 502 }
        );
    }
}

