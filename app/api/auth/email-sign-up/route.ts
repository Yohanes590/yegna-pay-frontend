import { NextResponse } from "next/server"
import prisma from "@/app/backend-service/prisma"
import { SendingMessage } from "@/app/backend-service/service/email-send"
import { CreateToken } from "@/app/backend-service/jwt"
import bcrypt from "bcryptjs"
export async function POST(req: Request) {
    const body = await req.json()
    if (!body.first_name || !body.last_name || !body.email || !body.password) {
        return NextResponse.json({
            message: "please fill the necessary information",
            success: false
        })
    } else {
        const genSalt = await bcrypt.genSalt(10)
        const hashed_password = await bcrypt.hash(body.password, genSalt)
        const email = await prisma.users.findFirst({
            where: {
                email: body.email
            }
        })

        if (email) {
            return NextResponse.json({
                message: "email address already taken",
                success: true
            })
        } else {
            try {
                const NewUser = await prisma.users.create({
                    data: {
                        account_status: "active",
                        email: body.email,
                        password: hashed_password,
                        full_name: body.first_name + " " + body.last_name,
                        payment_plan: "free",
                        request_available: 10,
                        verified: false,
                        avatar_url: null
                    }
                })
                const createToken = CreateToken({
                    user_email: NewUser.email,
                    id: NewUser.id
                }, "15min")
                const token = (await createToken).data
                await SendingMessage(NewUser.email, token!)
                return NextResponse.json({
                    message: "register success. please verify your email",
                    success: true
                })
            } catch (error) {
                return NextResponse.json({
                    message: "email address already taken",
                    success: false
                })
            }
        }
    }
}