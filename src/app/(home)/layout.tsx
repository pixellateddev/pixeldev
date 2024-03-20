import { Header } from '@/components/layout'
import { FC, PropsWithChildren } from 'react'
import classes from './home-layout.module.scss'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
    title: 'Pixellateddev',
}

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={classes.container}>
            <header className={classes.header}>
                <Header />
            </header>
            <main className={classes.main}>{children}</main>
            <footer className={classes.footer}>Footer</footer>
        </div>
    )
}

export default Layout
