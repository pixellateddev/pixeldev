import { FC, PropsWithChildren } from "react"
import { Header } from "./(components)"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Expense Tracker by Pixellateddev",
}

const ExpenseLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div>
            <header>
                <Header />
            </header>
            <main>{children}</main>
            <footer>Footer</footer>
        </div>
    )
}

export default ExpenseLayout
