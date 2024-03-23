import { NextPage } from 'next'
import classes from './expense-tracker.module.scss'
import {
    ExpenseList,
    ExpenseListLoader,
    Summary,
    SummaryLoader,
} from './(components)'
import { Suspense } from 'react'

const ExpenseTracker: NextPage = () => {
    return (
        <div className={classes.container}>
            <Suspense fallback={<SummaryLoader />}>
                <Summary />
            </Suspense>
            <Suspense fallback={<ExpenseListLoader />}>
                <ExpenseList />
            </Suspense>
        </div>
    )
}

export default ExpenseTracker
