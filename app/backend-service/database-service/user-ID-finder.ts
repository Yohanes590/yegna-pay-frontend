import prisma from "@/app/backend-service/prisma"
export async function UserIdFinder(apiKey: string) {
    const userProject = await prisma.projects.findFirst({
        where: {
            api_sec_key: apiKey
        },
        select: {
            user: true
        }
    })
    if (!userProject) {
        return {
            message: "can't extract user id",
            success: false,
            data: null
        }
    } else {
        return {
            message: "success id",
            success: true,
            data: userProject.user.id
        }
    }
}