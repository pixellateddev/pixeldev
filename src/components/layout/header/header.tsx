import Image from 'next/image'
import { FC, ReactElement, ReactNode } from 'react'
import classes from './header.module.scss'
import Link from 'next/link'
import { Button } from 'antd'
import { getUser } from '@/utils/auth'
import Logout from './components/logout'

interface Props {
    logo?: ReactNode
}

const Header: FC<Props> = async ({ logo }) => {
    let user = null
    try {
        user = await getUser()
    } catch (err) {}
    return (
        <div className={classes.header}>
            {logo}
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
