import { GenericLayout, Header } from '@/components/layout'
import { FC, PropsWithChildren } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Pixellateddev',
}

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <GenericLayout header={<Header rootLink="/" logo="/logo.svg" />}>
            {children}
        </GenericLayout>
    )
}

export default Layout
