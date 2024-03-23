import { FC, PropsWithChildren } from 'react'
import classes from './layout.module.scss'
import { Header } from '.'

interface Props {
    appName?: string
}

const Layout: FC<PropsWithChildren<Props>> = ({ appName, children }) => {
    return (
        <div className={classes.layout}>
            <header className={classes.header}>
                <Header appName={appName} />
            </header>
            <main className={classes.main}>{children}</main>
            <footer className={classes.footer}>@Pixellateddev</footer>
        </div>
    )
}

export default Layout
