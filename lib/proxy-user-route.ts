import { getBackendUrl } from "@/lib/backend-url";

type JsonRecord = Record<string, unknown>;

export async function proxyUserPost(req: Request, backendPath: string) {
    const body = (await req.json().catch(() => ({}))) as JsonRecord;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const cookie = req.headers.get("cookie");
    if (cookie) headers.cookie = cookie;

    const tokenFromBody =
        (typeof body.token === "string" ? body.token : "") ||
        (typeof body.user_token === "string" ? body.user_token : "");
    if (tokenFromBody) {
        headers.Authorization = `Bearer ${tokenFromBody}`;
    }

    const backendRes = await fetch(`${getBackendUrl()}${backendPath}`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    });
    const data = await backendRes.json().catch(() => ({}));
    return { data, status: backendRes.status };
}