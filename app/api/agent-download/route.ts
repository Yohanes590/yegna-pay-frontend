import { NextResponse } from "next/server";
import { generateAgentDoc } from "@/lib/agent-doc/generate-agent-doc";
import { loadPublicAgentContext } from "@/lib/agent-doc/load-public-context";

const FILENAME = "yegna-pay-agent-integration.md";

/** Public template (no live API key). Use /api/user/generate-agent-doc when signed in. */
export async function GET() {
    try {
        const publicCtx = await loadPublicAgentContext();
        const body = generateAgentDoc(publicCtx, null);
        return new NextResponse(body, {
            status: 200,
            headers: {
                "Content-Type": "text/markdown; charset=utf-8",
                "Content-Disposition": `attachment; filename="${FILENAME}"`,
                "Cache-Control": "public, max-age=300",
            },
        });
    } catch (err: unknown) {
        const detail = err instanceof Error ? err.message : "unknown";
        console.error("[api/agent-download]", detail);
        return NextResponse.json({ message: "Could not generate agent guide." }, { status: 500 });
    }
}