"use client"

import { login } from "@/lib/auth"
import { Button, Form, Input } from "antd"
import { FC, useState } from "react"

const LoginForm: FC = () => {
  const [submitting, setSubmitting] = useState(false)
  const onSubmit = async (values: any) => {
    setSubmitting(true)
    const result = await login(values)
    setSubmitting(false)
  }
  return (
    <Form requiredMark="optional" onFinish={onSubmit}>
      <Form.Item name="username" label="Username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Button loading={submitting} type="primary" htmlType="submit">
        Login
      </Button>
    </Form>
  )
}

export default LoginForm