import { buildBffBackendHeaders } from "@/lib/bff-auth-headers";
import { fetchBackendJson } from "@/lib/bff-upstream";

type JsonRecord = Record<string, unknown>;

export async function proxyUserPost(req: Request, backendPath: string) {
    const body = (await req.json().catch(() => ({}))) as JsonRecord;
    const bodyToken =
        (typeof body.token === "string" ? body.token : "") ||
        (typeof body.user_token === "string" ? body.user_token : "");
    const headers = buildBffBackendHeaders(req, bodyToken);

    const bearer = headers.Authorization?.replace(/^Bearer\s+/i, "").trim();
    if (bearer && !(typeof body.token === "string" && body.token.trim())) {
        body.token = bearer;
    }

    if (backendPath === "/user/delete-project") {
        const pid =
            (typeof body.project_id === "string" ? body.project_id : "") ||
            (typeof body.id === "string" ? body.id : "");
        if (pid) {
            body.project_id = pid;
            body.id = pid;
        }
    }

    if (process.env.BFF_AUTH_DEBUG === "1") {
        const cookie = req.headers.get("cookie") || "";
        console.info("[bff proxy]", backendPath, {
            hasAuthorization: Boolean(headers.Authorization),
            cookieHasAccess: cookie.includes("access_token="),
            bodyHasToken: Boolean(body.token),
        });
    }

    const logTag = `api/user proxy → ${backendPath}`;
    const result = await fetchBackendJson(
        backendPath,
        {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        },
        logTag
    );

    return { data: result.data, status: result.status };
}