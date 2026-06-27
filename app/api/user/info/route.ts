import { NextResponse } from "next/server";
import { DecodeToken } from "@/app/backend-service/jwt";
import prisma from "@/app/backend-service/prisma";
export async function POST(req: Request) {
    const body = await req.json()
    try {
        const Token = DecodeToken(body.token)
        const JWTData = (await Token).data
        const user = await prisma.users.findFirst({
            where: {
                email: JWTData?.user_email!
            },
            include: {
                projects: {
                    include: {
                        transactions: true
                    }
                },

            }
        })
        return NextResponse.json({
            user,
            status: true,
        })
    } catch (error) {
        return NextResponse.json({
            message: "something wen't wrong",
            status: false
        })
    }
}