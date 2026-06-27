import { DecodeToken } from "@/app/backend-service/jwt";
import prisma from "@/app/backend-service/prisma";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
    const body = await req.json()
    if (body.updatedData.length > 6) {
        return NextResponse.json({
            success: false,
            message: "you are trying un authorized access!!"
        })
    } else {
        const decodeUser = await DecodeToken(body.token)
        if (decodeUser.success == false) {
            return NextResponse.json({
                success: false,
                message: "please login again!!"
            })
        } else {
            try {

                await prisma.projects.update({
                    where: {
                        id: body.id
                    },
                    data: body.updatedData,
                })
                return NextResponse.json({
                    success: true,
                    message: "project edited successfully"
                })
            } catch (error: any) {
                return NextResponse.json({
                    success: false,
                    message: "internal server error can't edit project"
                })
            }
        }


    }
}