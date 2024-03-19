"use client"

import { logOut } from "@/lib/auth"
import { LogoutOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { FC } from "react"

const Logout: FC = () => {
    const handleClick = async () => {
        await logOut()
    }
    return <Button onClick={handleClick} icon={<LogoutOutlined />} />
}

export default Logout
