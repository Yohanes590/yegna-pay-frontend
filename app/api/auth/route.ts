import { NextResponse } from "next/server";
export async function POST(req: Request) {
    const GithubLink = "https://github.com/login/oauth/authorize" + `?client_id=${process.env.GITHUB_CLIENT_ID}` + "&scope=read:user user:email"
    return NextResponse.json({
        generatedLink: GithubLink
    })
}