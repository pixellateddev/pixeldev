"use server"

import { revalidatePath } from "next/cache"
import prisma from "./db"
import { getSession, getUser } from "@/utils/auth"

export const createExpense = async (values: any) => {
    const user = await getUser()
    const expense = await prisma.expense.create({
        data: {
            ...values,
            date: new Date(values.date),
            userUsername: user,
        },
    })

    revalidatePath("/expense-tracker")
}
