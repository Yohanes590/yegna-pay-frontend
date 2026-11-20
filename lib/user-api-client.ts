import { getMutationAuthToken } from "@/lib/client-auth-token";

export async function postUserApi(
    path: string,
    body: Record<string, unknown>
): Promise<{ ok: boolean; status: number; data: Record<string, unknown> }> {
    const authToken = await getMutationAuthToken();
    if (!authToken) {
        return {
            ok: false,
            status: 401,
            data: { success: false, message: "Please sign in again." },
        };
    }

    const res = await fetch(path, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ ...body, token: authToken }),
    });

    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    return { ok: res.ok, status: res.status, data };
}