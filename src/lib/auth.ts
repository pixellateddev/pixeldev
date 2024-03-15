"use server"

import { ServerActionResponse } from "@/types/actions"

import prisma from "./db"
import { comparePassword, encryptPassword, setSession } from "@/utils/auth"
import { redirect } from "next/navigation"
import { handleError } from "./utils"

export const login = async (values: any): Promise<ServerActionResponse> => {
    const { username, password } = values
    try {
        const user = await prisma.user.findFirstOrThrow({
            where: {
                username,
            },
        })
        const passwordMatch = await comparePassword(password, user.password)
        if (passwordMatch) {
            setSession({ username })
            redirect("/expense-tracker")
        } else {
            throw "Invalid Username or Password"
        }
    } catch (err) {
        return handleError(err)
    }
}

export const register = async (values: any) => {
    const { username, email, password } = values
    const hashedPassword = await encryptPassword(password)
    try {
        const user = await prisma.user.create({
            data: { username, email, password: hashedPassword },
        })
        setSession(user)
        redirect("/expense-tracker")
    } catch (err) {
        return handleError(err)
    }
}
