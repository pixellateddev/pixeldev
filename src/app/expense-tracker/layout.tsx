import { FC, PropsWithChildren } from 'react'
import { Metadata } from 'next'
import { GenericLayout, Header } from '@/components/layout'

export const metadata: Metadata = {
    title: 'Expense Tracker by Pixellateddev',
}

const ExpenseLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <GenericLayout
            header={
                <Header
                    rootLink="/expense-tracker"
                    logo="/apps/expense-tracker.svg"
                />
            }
        >
            {children}
        </GenericLayout>
    )
}

export default ExpenseLayout
