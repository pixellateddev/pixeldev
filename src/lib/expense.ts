'use server'

import { revalidatePath } from 'next/cache'
import prisma from './db'
import { getUser } from '@/utils/auth'
import { handleError } from './utils'

export const getExpenses = async () => {
    const user = await getUser()
    return await prisma.expense.findMany({
        where: {
            userUsername: user,
        },
        select: {
            id: true,
            description: true,
            notes: true,
            amount: true,
            date: true,
            tags: {
                select: {
                    name: true,
                    color: true,
                },
            },
        },
        orderBy: {
            date: 'desc',
        },
    })
}

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
                            color: 'magenta',
                        },
                    })),
                },
            },
        })
        revalidatePath('/expense-tracker')
    } catch (err) {
        return handleError(err)
    }
}

export const deleteExpense = async (expenseId: string) => {
    const disconnectTagsQuery = prisma.expense.update({
        where: {
            id: expenseId,
        },
        data: {
            tags: {
                set: [],
            },
        },
    })

    const deleteExpenseQuery = prisma.expense.delete({
        where: {
            id: expenseId,
        },
    })

    await prisma.$transaction([disconnectTagsQuery, deleteExpenseQuery])
    revalidatePath('/expense-tracker')
}
