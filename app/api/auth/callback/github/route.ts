import { NextResponse } from "next/server";
import prisma from "../../../../backend-service/prisma"
import { CreateToken } from "@/app/backend-service/jwt";
import { cookies } from "next/headers"
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
        return NextResponse.json({ error: "Missing code parameter" }, { status: 400 });
    }

    try {
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            })
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
            return NextResponse.json({ error: tokenData.error_description || "Failed to get token" }, { status: 400 });
        }

        const accessToken = tokenData.access_token;

        const UserEmailFetch = await fetch('https://api.github.com/user/emails', {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "User-Agent": "yegna-pay"
            }
        });

        const userDataFetch = await fetch('https://api.github.com/user', {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "User-Agent": "yegna-pay"
            }
        });
        const UserDataResponse = await userDataFetch.json()
        const userEmailResponse = await UserEmailFetch.json();
        const Cookies = await cookies()

        const userEmail = userEmailResponse[0].email

        const findUser = await prisma.users.findFirst({
            where: {
                email: userEmail
            }
        })
        if (findUser) {
            const token = CreateToken({
                user_email: findUser.email,
                id: findUser.id
            }, "7d")
            const tokenCookie = (await token).data
            Cookies.set("access_token", `${tokenCookie}`, {
                // httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "strict",
                path: "/"

            })
            return NextResponse.redirect(new URL("/dashboard", request.url));

        } else {
            const NewUser = await prisma.users.create({
                data: {
                    avatar_url: UserDataResponse.avatar_url,
                    account_status: "active",
                    email: userEmail,
                    full_name: UserDataResponse.name,
                    payment_plan: "free",
                    request_available: 10,
                    verified: true,
                }
            })

            const token = CreateToken({
                user_email: NewUser.email,
                id: NewUser.id
            }, "7d")
            Cookies.set("access_token", `${(await token).data}`, {
                // httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "strict",
                path: "/"
            })
            return NextResponse.redirect(new URL("/dashboard", request.url));

        }



    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}