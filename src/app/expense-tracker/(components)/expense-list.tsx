import { FC } from "react"

interface Props {
    expenses: any[]
}

const ExpenseList: FC<Props> = ({ expenses }) => {
    return expenses.map((expense) => (
        <div key={expense.id}>
            <p>{expense.description}</p>
            <p>{expense.amount}</p>
            <p>{expense.date.toString()}</p>
        </div>
    ))
}

export default ExpenseList
