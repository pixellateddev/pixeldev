"use server"

import { revalidatePath } from "next/cache"
import prisma from "./db"
import { getUser } from "@/utils/auth"
import { handleError } from "./utils"

export const createExpense = async (values: any) => {
    const user = await getUser()
    try {
        await prisma.expense.create({
            data: {
                ...values,
                date: new Date(values.date),
                userUsername: user,
                tags: {
                    connectOrCreate: values.tags.map((tag: string) => ({
                        where: {
                            name: tag,
                        },
                        create: {
                            name: tag,
                            color: "magenta",
                        },
                    })),
                },
            },
        })
        revalidatePath("/expense-tracker")
    } catch (err) {
        return handleError(err)
    }
}
