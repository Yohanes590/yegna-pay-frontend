export async function SendWebHook(webhook: any, transaction_info: any,) {
    try {
        const sendingURL = await fetch(webhook, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transaction_info)
        })
        if (sendingURL.ok) {
            return {
                message: "success to send web hook",
                success: true,
                data: transaction_info,
            }
        } else {
            return {
                message: "unable to send web hook",
                success: false,
                data: null
            }
        }
    } catch (error) {
        return {
            message: "unable to send web hook",
            success: false,
            data: null
        }
    }

}