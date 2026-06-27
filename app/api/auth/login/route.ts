import { NextResponse } from "next/server";
import { SendingMessage } from "@/app/backend-service/service/email-send";
import { CreateToken } from "@/app/backend-service/jwt";
import bcrypt from "bcryptjs";
import prisma from "@/app/backend-service/prisma";
export async function POST(req: Request) {
    const body = await req.json()
    if (!body.email || !body.password) {
        return NextResponse.json({
            message: "please provide information",
            status: false
        })
    } else {
        const user = await prisma.users.findFirst({
            where: {
                email: body.email
            }
        })
        if (!user) {
            return NextResponse.json({
                message: "user not found!",
                status: false
            })
        } else if (user.verified == false) {
            const verificationToken = await CreateToken({
                user_email: user.email,
                id: user.id
            }, "7d")
            await SendingMessage(user.email, verificationToken.data!)
            return NextResponse.json({
                message: "please verify your email address. we have sent a verification link to your inbox",
                status: false
            })
        } else {
            const comparePassword = await bcrypt.compare(body.password, user.password!)
            if (!comparePassword) {
                return NextResponse.json({
                    message: "user not found!",
                    status: false
                })
            } else {
                const token = await CreateToken({
                    user_email: user.email,
                    id: user.id
                }, "7d")
                return NextResponse.json({
                    message: "user successfully logged in",
                    status: true,
                    token: token.data
                })
            }
        }
    }
}