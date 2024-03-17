"use client"
import { FC, useState } from "react"
import ExpenseModal from "../expense-modal/expense-modal"
import { Button, Card, Empty } from "antd"
import Expense from "../expense/expense"
import classes from "./expense-list.module.scss"

interface Props {
    expenses: any[]
}

const ExpenseList: FC<Props> = ({ expenses }) => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const openForm = () => {
        setIsFormOpen(true)
    }

    const closeForm = () => {
        setIsFormOpen(false)
    }

    return (
        <div>
            <ExpenseModal
                key={undefined}
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
            >
                {!expenses.length && (
                    <Empty description="You have no recorded expenses. Please record a new expense." />
                )}
                <div className={classes.expenseList}>
                    {expenses.map((expense) => (
                        <Expense key={expense.id} expense={expense} />
                    ))}
                </div>
            </Card>
        </div>
    )
}

export default ExpenseList
