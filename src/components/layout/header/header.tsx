import Image from 'next/image'
import { FC } from 'react'
import classes from './header.module.scss'
import Link from 'next/link'
import { Button, Drawer } from 'antd'
import { getUser } from '@/utils/auth'
import Logout from './components/logout'
import { AppDrawer } from './components'

interface Props {
    appName?: string
}

const Header: FC<Props> = async ({ appName }) => {
    let user = null
    try {
        user = await getUser()
    } catch (err) {}
    return (
        <div className={classes.header}>
            <AppDrawer user={user} />
            <Link href={'/'}>
                <Image
                    src="/logo.svg"
                    alt="logo"
                    height={30}
                    width={200}
                    priority
                />
            </Link>

            <p className={classes.appName}>{appName}</p>
            <div className={classes.auth}>
                {user ? (
                    <>
                        <p>{user}</p>
                        <Logout />
                    </>
                ) : (
                    <>
                        <Link href="/login">
                            <Button type="primary" ghost>
                                Login
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button type="primary">Sign Up</Button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header
