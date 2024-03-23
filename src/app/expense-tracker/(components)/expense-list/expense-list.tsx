'use client'
import { FC, useState } from 'react'
import ExpenseModal from '../expense-modal/expense-modal'
import { Button, Card } from 'antd'
import Expense from '../expense/expense'
import classes from './expense-list.module.scss'
import { deleteExpense } from '@/lib/expense'
import { NoData } from '@/components/ui'

interface Props {
    expenses: any[]
}

const ExpenseList: FC<Props> = ({ expenses }) => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [selectedExpense, setSelectedExpense] = useState<any>(null)
    const openForm = (expense?: any) => {
        if (expense) {
            setSelectedExpense(expense)
        }
        setIsFormOpen(true)
    }

    const closeForm = () => {
        setIsFormOpen(false)
        setSelectedExpense(null)
    }

    const handleDelete = (expenseId: string) => {
        deleteExpense(expenseId)
    }

    return (
        <>
            <ExpenseModal
                key={isFormOpen.toString()}
                expense={selectedExpense}
                open={isFormOpen}
                onClose={closeForm}
            />

            <Card
                title="Yours Expenses"
                extra={
                    <Button type="primary" onClick={openForm}>
                        Record Expense
                    </Button>
                }
                className={classes.card}
            >
                {!expenses.length && (
                    <NoData description="You have no recorded expenses. Please record a new expense." />
                )}
                <div className={classes.expenseList}>
                    {expenses.map((expense) => (
                        <Expense
                            key={expense.id}
                            expense={expense}
                            onEdit={openForm.bind(this, expense)}
                            onDelete={handleDelete.bind(this, expense.id)}
                        />
                    ))}
                </div>
            </Card>
        </>
    )
}

export default ExpenseList
