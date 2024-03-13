"use client"

import { login } from "@/lib/auth"
import { Button, Form, Input } from "antd"
import { FC } from "react"

interface Props {
  onSubmit: (values: any) => void
}

const LoginForm: FC<Props> = ({ onSubmit }) => {
  return (
    <Form requiredMark="optional" onFinish={onSubmit}>
      <Form.Item name="username" label="Username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </Form>
  )
}

export default LoginForm
