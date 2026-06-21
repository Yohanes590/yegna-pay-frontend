import { NextResponse } from "next/server"
import { cookies } from "next/headers"
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const token = searchParams.get("token")

        if (!token) {
            return NextResponse.json({
                message: "No token provided in redirect URL",
                success: false
            }, { status: 400 })
        }

        const cookieStore = await cookies()

        const reqUrl = new URL(req.url)
        const isSecure = reqUrl.protocol === 'https:' || process.env.NODE_ENV === 'production'

        // Set httpOnly cookie as a secure server-side fallback
        cookieStore.set("access_token", token, {
            maxAge: 7 * 24 * 60 * 60,
            path: "/",
        })

        // Redirect to client-side handler which will verify token and set a client-readable cookie
        return NextResponse.redirect(new URL(`/auth/${token}`, req.url))

    } catch (err: any) {
        return NextResponse.json({
            message: "Something went wrong on the auth handler",
            success: false
        }, { status: 500 })
    }
}