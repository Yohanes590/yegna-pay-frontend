import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get("token");

        const redirectUrl = new URL(token ? `/dashboard?token=${encodeURIComponent(token)}` : "/dashboard", req.url);
        const res = NextResponse.redirect(redirectUrl);

        if (token) {
            res.cookies.set("access_token", token, {
                path: "/",
                maxAge: 7 * 24 * 60 * 60,
                sameSite: "lax",
            });
        }
        return res;
    } catch {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }
}
