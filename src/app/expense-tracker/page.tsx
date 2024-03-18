import prisma from "@/lib/db"
import { getUser } from "@/utils/auth"
import { NextPage } from "next"
import ExpenseList from "./(components)/expense-list/expense-list"
import classes from "./expense-tracker.module.scss"

const ExpenseTracker: NextPage = async () => {
    const user = await getUser()
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
            userUsername: user,
        },
        include: {
            tags: true,
        },

        orderBy: {
            date: "desc",
        },
    })

    return (
        <div className={classes.container}>
            <ExpenseList expenses={expenses} />
        </div>
    )
}

export default ExpenseTracker
