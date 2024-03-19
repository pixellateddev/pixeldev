import { FC } from "react"
import classes from "./expense.module.scss"
import { Button, Card, Tag } from "antd"
import dayjs from "dayjs"
import {
    CalendarOutlined,
    DeleteOutlined,
    EditOutlined,
} from "@ant-design/icons"

interface Props {
    expense: any
    onEdit: () => void
    onDelete: () => void
}

const Expense: FC<Props> = ({ expense, onEdit, onDelete }) => {
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
                <div className={classes.actions}>
                    <Button
                        onClick={onEdit}
                        icon={<EditOutlined />}
                        type="link"
                        shape="circle"
                    />
                    <Button
                        icon={<DeleteOutlined title="Delete" />}
                        onClick={onDelete}
                        type="link"
                        danger
                        shape="circle"
                    />
                </div>
                <p className={classes.notes}>{expense.notes}</p>
            </div>
        </Card>
    )
}

export default Expense
