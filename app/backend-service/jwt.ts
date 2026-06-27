import JWT, { JwtPayload } from "jsonwebtoken"
export const CreateToken = async (information: any, time: any) => {
    try {
        const Token = JWT.sign(information, process.env.PRIVATE_KEY!, { "algorithm": "RS256", expiresIn: time })
        return {
            success: true,
            data: Token
        }
    } catch (error) {
        return {
            success: false,
            data: null
        }
    }
}


export const DecodeToken = async (token: string) => {
    try {
        const decodedToken = JWT.verify(token, process.env.PRIVATE_KEY!, { algorithms: ["RS256"] }) as JwtPayload
        return {
            success: true,
            data: decodedToken
        }
    } catch (err) {
        return {
            success: false,
            data: null
        }
    }
}