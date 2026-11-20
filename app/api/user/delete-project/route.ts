import { NextResponse } from "next/server";
import { proxyUserPost } from "@/lib/proxy-user-route";

export async function POST(req: Request) {
    try {
        const { data, status } = await proxyUserPost(req, "/user/delete-project");
        const httpStatus = status >= 400 && status < 600 ? status : status === 200 ? 200 : status;
        return NextResponse.json(data, { status: httpStatus });
    } catch (err: unknown) {
        const detail = err instanceof Error ? err.message : "unknown";
        console.error("[api/user/delete-project]", detail);
        return NextResponse.json(
            { success: false, message: "Backend connection error", detail },
            { status: 502 }
        );
    }
}
