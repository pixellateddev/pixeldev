'use server'

import { revalidatePath } from 'next/cache'
import prisma from './db'
import { getUser } from '@/utils/auth'
import { handleError } from './utils'
import dayjs from 'dayjs'
import { getRelativePercentage } from '@/utils/math'

const TAG_COLORS = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
]

export const getExpensesSummary = async (period: 'month') => {
    const user = await getUser()
    const currentSummary = prisma.expense.aggregate({
        _sum: {
            amount: true,
        },
        where: {
            userUsername: user,
            date: {
                gte: dayjs().startOf('month').toDate(),
            },
        },
    })
    const lastSummary = prisma.expense.aggregate({
        _sum: {
            amount: true,
        },
        where: {
            userUsername: user,
            date: {
                gte: dayjs().startOf('month').subtract(1, 'month').toDate(),
                lt: dayjs().startOf('month').toDate(),
            },
        },
    })
    await Promise.all([currentSummary, lastSummary])
    // await new Promise((resolve) => setTimeout(resolve, 5000))
    return {
        summary: (await currentSummary)._sum.amount || 0,
        relative: getRelativePercentage(
            (await currentSummary)._sum.amount || 0,
            (await lastSummary)._sum.amount || 0
        ),
    }
}

export const getExpenses = async () => {
    const user = await getUser()
    // await new Promise((resolve) => setTimeout(resolve, 2000))
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
        orderBy: [{ date: 'desc' }, { id: 'desc' }],
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
                tagIDs: [],
                tags: {
                    connectOrCreate: values.tags?.map((tag: string) => ({
                        where: {
                            name: tag,
                        },
                        create: {
                            name: tag,
                            color: TAG_COLORS[
                                Math.floor(Math.random() * TAG_COLORS.length)
                            ],
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

export const updateExpense = async ({ id, ...values }: any) => {
    try {
        const disconnectTagsQuery = prisma.expense.update({
            where: {
                id,
            },
            data: {
                tags: {
                    set: [],
                },
            },
        })
        const updateExpenseQuery = prisma.expense.update({
            where: {
                id,
            },
            data: {
                ...values,
                date: new Date(values.date),
                tags: {
                    connectOrCreate: values.tags?.map((tag: string) => ({
                        where: {
                            name: tag,
                        },
                        create: {
                            name: tag,
                            color: TAG_COLORS[
                                Math.floor(Math.random() * TAG_COLORS.length)
                            ],
                        },
                    })),
                },
            },
        })
        await prisma.$transaction([disconnectTagsQuery, updateExpenseQuery])
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
