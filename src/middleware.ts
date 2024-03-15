import { NextRequest } from "next/server"
import { getUser, updateSession } from "./utils/auth"

const middleware = async (request: NextRequest) => {
    try {
        const user = await getUser()
        if (
            user &&
            (request.nextUrl.pathname.startsWith("/login") ||
                request.nextUrl.pathname.startsWith("/register"))
        ) {
            return Response.redirect(new URL("/", request.url))
        }
    } catch (err) {}
    return await updateSession(request)
}

export default middleware
