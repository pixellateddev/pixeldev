import bcrypt from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

const SECRET_KEY = process.env.SECRET_KEY!

const JWT_KEY = new TextEncoder().encode(SECRET_KEY)

export const encryptPassword = async (password: string) => {
    const hashedPassword = await bcrypt.hash(password, 8)
    return hashedPassword
}

export const comparePassword = async (
    password: string,
    hashedPassword: string
) => {
    return bcrypt.compare(password, hashedPassword)
}

export const encryptJWT = async (payload: any) => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30 minutes")
        .sign(JWT_KEY)
}

export const decrypt = async (token: string) => {
    const { payload } = await jwtVerify<{ user: { username: string } }>(
        token,
        JWT_KEY,
        {
            algorithms: ["HS256"],
        }
    )
    return payload
}

export const setSession = async (user: any) => {
    const { username } = user
    const expires = new Date(Date.now() + 1 * 1000 * 60 * 30)
    const session = await encryptJWT({ user: { username }, expires })
    cookies().set("session", session, { expires, httpOnly: true })
}

export const getSession = async () => {
    const session = cookies().get("session")?.value
    if (!session) {
        return null
    }
    return await decrypt(session)
}

export const getUser = async (): Promise<string> => {
    const session = cookies().get("session")?.value
    if (!session) {
        throw "Not Authenticated"
    }
    const decryptedSession = await decrypt(session)
    return decryptedSession.user.username
}

export const updateSession = async (request: NextRequest) => {
    const session = request.cookies.get("session")?.value
    if (!session) {
        return
    }

    const parsed = await decrypt(session)
    parsed.expires = new Date(Date.now() + 1 * 1000 * 60 * 30)

    const res = NextResponse.next()
    res.cookies.set({
        name: "session",
        value: await encryptJWT(parsed),
        httpOnly: true,
        expires: parsed.expires as Date,
    })

    return res
}
