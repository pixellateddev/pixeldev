import { getExpenses } from '@/lib/expense'
import { FC } from 'react'
import ExpenseList from './expense-list'

const ExpenseListServer: FC = async () => {
    const expenses = await getExpenses()
    return <ExpenseList expenses={expenses} />
}

export default ExpenseListServer
