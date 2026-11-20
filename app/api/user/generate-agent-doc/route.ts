import { NextResponse } from "next/server";
import { buildBffBackendHeaders, readAuthTokenFromCookieHeader } from "@/lib/bff-auth-headers";
import { fetchBackendJson } from "@/lib/bff-upstream";
import { generateAgentDoc } from "@/lib/agent-doc/generate-agent-doc";
import { loadPublicAgentContext } from "@/lib/agent-doc/load-public-context";
import { pickProject, projectToWorkspaceContext } from "@/lib/agent-doc/resolve-workspace";

const FILENAME = "yegnapay-agent-integration.md";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    const cookieToken = readAuthTokenFromCookieHeader(req.headers.get("cookie"));
    const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim() || "";
    const token = bearer || cookieToken;
    const headers = buildBffBackendHeaders(req, token);

    const authResult = await fetchBackendJson(
        "/auth/check",
        {
            method: "POST",
            headers,
            body: JSON.stringify({ token }),
        },
        "api/user/generate-agent-doc"
    );

    const user = authResult.data?.fetchEmail as Record<string, unknown> | undefined;
    const projects = user?.projects as Parameters<typeof pickProject>[0];

    if (!authResult.ok || !user) {
        return NextResponse.json(
            {
                message: authResult.data?.message || "Sign in to download a personalized agent guide.",
                status: false,
            },
            { status: 401 }
        );
    }

    const project = pickProject(projects, projectId);
    if (!project?.api_sec_key) {
        return NextResponse.json(
            {
                message: "Create a workspace with an API key before downloading the agent guide.",
                status: false,
            },
            { status: 400 }
        );
    }

    const publicCtx = await loadPublicAgentContext();
    const workspace = projectToWorkspaceContext(project);
    const markdown = generateAgentDoc(publicCtx, workspace);

    return new NextResponse(markdown, {
        status: 200,
        headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Content-Disposition": `attachment; filename="${FILENAME}"`,
            "Cache-Control": "private, no-store",
        },
    });
}