import { readFileSync } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

const FILENAME = "yegna-pay-agent-integration.md";

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "content", "yegna-pay-agent-integration.md");
        const body = readFileSync(filePath, "utf8");
        return new NextResponse(body, {
            status: 200,
            headers: {
                "Content-Type": "text/markdown; charset=utf-8",
                "Content-Disposition": `attachment; filename="${FILENAME}"`,
                "Cache-Control": "public, max-age=3600",
            },
        });
    } catch {
        return NextResponse.json({ message: "Agent guide file not found." }, { status: 404 });
    }
}