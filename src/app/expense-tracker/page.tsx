import prisma from '@/lib/db'
import { getUser } from '@/utils/auth'
import { NextPage } from 'next'
import ExpenseList from './(components)/expense-list/expense-list'
import classes from './expense-tracker.module.scss'
import { getExpenses } from '@/lib/expense'

const ExpenseTracker: NextPage = async () => {
    const expenses = await getExpenses()

    return (
        <div className={classes.container}>
            <ExpenseList expenses={expenses} />
        </div>
    )
}

export default ExpenseTracker
