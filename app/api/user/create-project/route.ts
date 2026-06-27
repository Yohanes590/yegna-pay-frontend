import { NextResponse } from "next/server";
import prisma from "@/app/backend-service/prisma";
import { DecodeToken } from "@/app/backend-service/jwt";

export async function POST(req: Request) {
    const body = await req.json()

    const { token, apiKey, call_back, discription, project_name, date_expire, receiver_name } = body
    if (!token) {
        return NextResponse.json({
            message: "un authorized access",
            success: false,
        })
    } else {
        const tokenDecoding = await DecodeToken(token)
        if (tokenDecoding.success == false) {
            return NextResponse.json({
                message: "please login again",
                success: false,
            })
        } else {
            const userId = tokenDecoding?.data?.id
            try {
                await prisma.projects.create({
                    data: {
                        api_sec_key: apiKey,
                        call_back_url: call_back,
                        project_description: discription,
                        project_name: project_name,
                        ProjectBalance: "100",
                        before_expires: date_expire,
                        receiver_name: receiver_name,
                        user: {
                            connect: { id: userId }
                        }
                    },
                },
                )
                return NextResponse.json({
                    message: "project created successfully",
                    success: true
                })
            } catch (error: any) {
                return NextResponse.json({
                    message: error.message,
                    success: false
                })
            }

        }
    }

}