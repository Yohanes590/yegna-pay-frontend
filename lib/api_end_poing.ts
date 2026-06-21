import Cookies from "js-cookie"
import { userInfo } from "os"
const token = Cookies.get("access_token")


// user authentication function
export const UserInfo = async () => {
    const TokenSending = await fetch(process.env.NEXT_PUBLIC_YEGNA_SERVER! + "/auth/check", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            token: token
        })
    })
    const ServerResponse = await TokenSending.json()
    console.log(ServerResponse)
    if (token == undefined) {
        window.location.href = "/"
    } else if (ServerResponse.status == 200) {
        return {
            message: "success",
            user: ServerResponse.fetchEmail
        }

    } else if (ServerResponse.status == 500) {
        window.location.href = "/"
    } else if (ServerResponse.status == 400) {
        return {
            message: ServerResponse.message, user: {
                message: "The user is baned",
                status: "400"
            }
        }
    }
}



export const BuyRequestFunction = async (requestAmount: number, transaction_id: string) => {
    const BuyAPIRequest = await fetch(`${process.env.NEXT_PUBLIC_YEGNA_SERVER!}/user/buy-request`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: token,
            requestAmount: requestAmount,
            transaction_id: transaction_id
        })
    })
    const ServerResponse = await BuyAPIRequest.json()
    return ServerResponse
}