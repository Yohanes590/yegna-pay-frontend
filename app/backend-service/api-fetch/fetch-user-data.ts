import Cookies from "js-cookie";
import { authClient } from "@/lib/auth-client";

export async function UserDataFetch() {
    let token = Cookies.get("access_token");
    if (!token) {
        try {
            const session = await authClient.getSession();
            token = session?.data?.session?.token;
        } catch {
            // ignore
        }
    }
    if (!token && typeof window !== "undefined") {
        const searchParams = new URLSearchParams(window.location.search);
        const urlToken = searchParams.get("token");
        if (urlToken) {
            token = urlToken;
            Cookies.set("access_token", urlToken, { expires: 7 });
        }
    }
    try {
        const fetchingUserInformation = await fetch("/api/user/info", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: token || ""
            })
        });

        const serverResponse = await fetchingUserInformation.json().catch(() => ({}));
        if (fetchingUserInformation.ok && serverResponse.user) {
            if (serverResponse.token) {
                Cookies.set("access_token", serverResponse.token, { expires: 7 });
            }
            return {
                message: "success",
                user: serverResponse.user,
                statusCode: fetchingUserInformation.status,
            };
        }
        const errText =
            serverResponse?.message ||
            serverResponse?.detail ||
            serverResponse?.hint ||
            `HTTP ${fetchingUserInformation.status}`;
        return {
            message: errText,
            user: null,
            statusCode: fetchingUserInformation.status,
        };
    } catch {
        return {
            message: "network_error",
            user: null
        };
    }
}
