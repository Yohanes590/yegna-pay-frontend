import Cookies from "js-cookie";

const getToken = () => Cookies.get("access_token");

// User authentication function
export const UserInfo = async () => {
    const token = getToken();

    try {
        const res = await fetch("/api/user/info", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: token || "" }),
        });
        const data = await res.json();
        if (res.ok && data?.user) {
            if (data?.token) {
                Cookies.set("access_token", data.token, { expires: 7 });
            }
            return {
                message: "success",
                user: data.user,
            };
        }
        return {
            message: data?.message || "Failed to fetch user profile",
            user: null,
        };
    } catch {
        return {
            message: "Network error",
            user: null,
        };
    }
};

export const FetchBillingInfo = async () => {
    const token = getToken();
    try {
        const res = await fetch("/api/user/buy-request", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {})
            }
        });
        return await res.json();
    } catch {
        return { success: false, message: "Network connection error" };
    }
};

export const BuyRequestFunction = async (requestAmount: number, transaction_id: string, platform?: string) => {
    const token = getToken();

    try {
        const res = await fetch("/api/user/buy-request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {})
            },
            body: JSON.stringify({
                token,
                requestAmount,
                transaction_id,
                platform
            }),
        });
        return await res.json();
    } catch {
        return { success: false, message: "Network connection error" };
    }
};
