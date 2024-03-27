'use client'
import { CloseOutlined, MenuOutlined } from '@ant-design/icons'
import { Button, Drawer } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import classes from './drawer.module.scss'
import { logOut } from '@/lib/auth'

interface Props {
    user: string | null
}

const AppDrawer: FC<Props> = ({ user }) => {
    const [open, setOpen] = useState(false)
    const onClose = () => {
        setOpen(false)
    }

    const handleLogout = async () => {
        await logOut()
        onClose()
    }
    return (
        <div className={classes.appDrawer}>
            <Button
                icon={<MenuOutlined />}
                type="text"
                onClick={() => setOpen(true)}
            />
            <Drawer
                open={open}
                placement="left"
                title={
                    <Link href={'/'}>
                        <Image
                            src="/logo.svg"
                            alt="logo"
                            height={30}
                            width={200}
                            priority
                        />
                    </Link>
                }
                extra={
                    <Button
                        type="text"
                        icon={<CloseOutlined />}
                        onClick={onClose}
                    ></Button>
                }
                onClose={onClose}
                closeIcon={false}
            >
                <div className={classes.navList}>
                    {user ? (
                        <Button type="link" onClick={handleLogout}>
                            Log Out
                        </Button>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button block type="link" onClick={onClose}>
                                    Login
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button block type="link" onClick={onClose}>
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </Drawer>
        </div>
    )
}

export default AppDrawer
