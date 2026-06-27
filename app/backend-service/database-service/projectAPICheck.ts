import prisma from "@/app/backend-service/prisma";
export async function ProjectAPIKey(APIKey: string) {
    const FindAPIKey = await prisma.projects.findFirst({
        where: {
            api_sec_key: APIKey
        },
        select: {
            user_Id: true,
            id: true,
        }
    })
    if (!FindAPIKey) {
        return {
            message: "Unauthorized API Key",
            success: false,
        }
    } else {
        return {
            message: "Authorized API Key",
            data: FindAPIKey,
            success: true
        }

    }
}