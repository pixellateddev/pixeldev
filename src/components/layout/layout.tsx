import { FC, PropsWithChildren, ReactNode } from 'react'
import classes from './layout.module.scss'
import { Header } from '.'

interface Props {
    appName?: string
    header: ReactNode
}

const Layout: FC<PropsWithChildren<Props>> = ({
    appName,
    children,
    header,
}) => {
    return (
        <div className={classes.layout}>
            <header className={classes.header}>{header}</header>
            <main className={classes.main}>{children}</main>
            <footer className={classes.footer}>@Pixellateddev</footer>
        </div>
    )
}

export default Layout
