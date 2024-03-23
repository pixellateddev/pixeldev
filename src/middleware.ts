import { NextRequest } from 'next/server'
import { getUser, updateSession } from './utils/auth'

const middleware = async (request: NextRequest) => {
    try {
        await getUser()
        if (
            request.nextUrl.pathname.startsWith('/login') ||
            request.nextUrl.pathname.startsWith('/register')
        ) {
            return Response.redirect(new URL('/', request.url))
        }
    } catch (err) {
        if (request.nextUrl.pathname.startsWith('/expense-tracker')) {
            return Response.redirect(new URL('/login', request.url))
        }
    }
    return await updateSession(request)
}

export default middleware
