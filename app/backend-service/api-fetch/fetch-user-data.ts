import Cookies from "js-cookie";

const token = Cookies.get("access_token")

export async function UserDataFetch() {
    const fetchingUserInformation = await fetch("/api/user/info", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: token
        })
    })
    const serverResponse = await fetchingUserInformation.json()
    if (fetchingUserInformation.ok) {
        return {
            message: "success",
            user: serverResponse.user
        }
    } else {
        return {
            message: "error",
            user: null
        }
    }

}