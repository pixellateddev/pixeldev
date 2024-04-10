import { isRedirectError } from 'next/dist/client/components/redirect'

export const handleError = (error: any) => {
    if (isRedirectError(error)) {
        throw error
    }
    console.error(error)
    return {
        error: true,
        message: error.message,
    }
}
