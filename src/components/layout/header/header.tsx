import Image from "next/image"
import { FC } from "react"
import classes from "./header.module.scss"
import Link from "next/link"
import { Button } from "antd"
import { getUser } from "@/utils/auth"
import Logout from "./components/logout"

const Header: FC = async () => {
    let user = null
    try {
        user = await getUser()
    } catch (err) {}
    return (
        <div className={classes.header}>
            <Image src="/logo.svg" alt="logo" height={35} width={250} />
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