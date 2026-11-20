import { NextResponse } from "next/server";
import { proxyUserPost } from "@/lib/proxy-user-route";

export async function POST(req: Request) {
    try {
        const { data, status } = await proxyUserPost(req, "/user/edit-project");
        return NextResponse.json(data, { status });
    } catch {
        return NextResponse.json({ success: false, message: "Backend connection error" }, { status: 502 });
    }
}
