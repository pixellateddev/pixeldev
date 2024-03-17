import { FC } from "react"
import classes from "./expense.module.scss"
import { Card } from "antd"
import dayjs from "dayjs"

interface Props {
    expense: any
}

const Expense: FC<Props> = ({ expense }) => {
    return (
        <Card>
            <div className={classes.container}>
                <p>{expense.description}</p>
                <p className={classes.amount}>₹ {expense.amount}</p>
                <p>{dayjs(expense.date).format("dddd, DD MMM YYYY")}</p>
            </div>
        </Card>
    )
}

export default Expense
