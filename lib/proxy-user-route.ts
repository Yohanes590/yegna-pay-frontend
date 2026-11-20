import { getBackendUrl } from "@/lib/backend-url";
import { buildBffBackendHeaders } from "@/lib/bff-auth-headers";

type JsonRecord = Record<string, unknown>;

export async function proxyUserPost(req: Request, backendPath: string) {
    const body = (await req.json().catch(() => ({}))) as JsonRecord;
    const bodyToken =
        (typeof body.token === "string" ? body.token : "") ||
        (typeof body.user_token === "string" ? body.user_token : "");
    const headers = buildBffBackendHeaders(req, bodyToken);

    const backendRes = await fetch(`${getBackendUrl()}${backendPath}`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    });
    const data = await backendRes.json().catch(() => ({}));
    return { data, status: backendRes.status };
}