import { DecodeToken } from "@/app/backend-service/jwt";
import prisma from "@/app/backend-service/prisma";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
    const body = await req.json()
    const { token, id } = body
    if (!token) {
        return NextResponse.json({
            success: false,
            message: "unauthorized access!"
        })
    } else if (!id) {
        return NextResponse.json({
            success: false,
            message: "project id required!"
        })
    } else {
        const decodeToken = await DecodeToken(token)
        if (decodeToken.success == false) {
            return NextResponse.json({
                success: false,
                message: "please login again"
            })
        } else {
            try {
                await prisma.projects.delete({
                    where: {
                        id: id
                    }
                })
                return NextResponse.json({
                    success: true,
                    message: "project deleted successfully"
                })
            } catch (error) {
                return NextResponse.json({
                    success: false,
                    message: "internal server can't delete project"
                })
            }

        }
    }
}