import { ExpenseForm } from "@/components/forms"
import prisma from "@/lib/db"
import { getSession } from "@/utils/auth"
import { NextPage } from "next"
import ExpenseList from "./(components)/expense-list"

const ExpenseTracker: NextPage = async () => {
    const session = await getSession()
    if (!session) {
        return null
    }
    // await prisma.expense.create({
    //   data: {
    //     userUsername: "hsagarthegr8",
    //     description: "Hello",
    //     amount: 400,
    //     date: new Date(),
    //   },
    // })
    // const expenses = await prisma.expense.findMany({

    //     where: {
    //         userUsername: session.user.username,
    //     },
    // })
    const expenses = await prisma.expense.findMany({
        where: {
            userUsername: session.user.username,
        },
        orderBy: {
            date: "desc",
        },
    })

    return (
        <div>
            <div>Hello Expense Tracker</div>
            <ExpenseList expenses={expenses} />
            <ExpenseForm />
        </div>
    )
}

export default ExpenseTracker
