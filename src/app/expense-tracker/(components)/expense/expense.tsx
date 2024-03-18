import { FC } from "react"
import classes from "./expense.module.scss"
import { Card, Tag } from "antd"
import dayjs from "dayjs"
import { CalendarOutlined } from "@ant-design/icons"

interface Props {
    expense: any
}

const Expense: FC<Props> = ({ expense }) => {
    console.log(expense)
    return (
        <Card>
            <div className={classes.container}>
                <p className={classes.description}>{expense.description}</p>
                <div className={classes.tags}>
                    {expense.tags.map((tag: any) => (
                        <Tag key={tag.name} color={tag.color}>
                            {tag.name}
                        </Tag>
                    ))}
                </div>
                <p className={classes.amount}>₹ {expense.amount}</p>
                <p className={classes.date}>
                    <CalendarOutlined /> &nbsp;
                    <span className={classes.dayName}>
                        {dayjs(expense.date).format("dddd")}
                    </span>
                    ,&nbsp;
                    {dayjs(expense.date).format("DD MMM YYYY")}
                </p>
                <p className={classes.notes}>{expense.notes}</p>
            </div>
        </Card>
    )
}

export default Expense
