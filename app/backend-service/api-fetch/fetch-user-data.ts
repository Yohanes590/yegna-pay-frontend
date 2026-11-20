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
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: token || ""
            })
        });

        const serverResponse = await fetchingUserInformation.json();
        if (fetchingUserInformation.ok && serverResponse.user) {
            if (serverResponse.token) {
                Cookies.set("access_token", serverResponse.token, { expires: 7 });
            }
            return {
                message: "success",
                user: serverResponse.user
            };
        } else {
            return {
                message: serverResponse?.message || "error",
                user: null
            };
        }
    } catch {
        return {
            message: "network_error",
            user: null
        };
    }
}
