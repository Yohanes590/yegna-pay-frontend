import Cookies from "js-cookie";

export async function UserDataFetch() {
    const token = Cookies.get("access_token");
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
