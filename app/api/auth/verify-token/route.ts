import { NextResponse } from "next/server";
import prisma from "@/app/backend-service/prisma";
import { DecodeToken } from "@/app/backend-service/jwt";
export async function POST(req: Request) {
    try {
        const body = await req.json()
        const tokenResponse = await DecodeToken(body.token)
        if (tokenResponse.success == false) {
            return NextResponse.json({
                message: "can't verify token!",
                success: false
            })
        } else {
            const TokenEmail = tokenResponse?.data?.user_email
            await prisma.users.update({
                where: {
                    email: TokenEmail
                },
                data: {
                    verified: true
                }
            })
            return NextResponse.json({
                message: "account verified success",
                success: true,
                access_token: body.token,
            })
        }
    } catch (err) {
        return NextResponse.json({
            message: "can't verify token!",
            success: false
        })
    }
}