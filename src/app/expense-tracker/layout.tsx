import { FC, PropsWithChildren } from 'react'
import { Metadata } from 'next'
import { Header } from '@/components/layout'

export const metadata: Metadata = {
    title: 'Expense Tracker by Pixellateddev',
}

const ExpenseLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div>
            <header>
                <Header appName="Expense Tracker" />
            </header>
            <main>{children}</main>
            <footer>Footer</footer>
        </div>
    )
}

export default ExpenseLayout
