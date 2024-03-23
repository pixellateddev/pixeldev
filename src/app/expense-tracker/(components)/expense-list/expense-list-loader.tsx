import { Button, Card } from 'antd'
import { FC } from 'react'
import classes from './expense-list.module.scss'
import { Loader } from '@/components/ui'

const ExpenseListLoader: FC = () => {
    return (
        <Card
            title="Your Expenses"
            extra={<Button type="default">Record Expense</Button>}
            className={classes.card}
        >
            <Loader />
        </Card>
    )
}

export default ExpenseListLoader
