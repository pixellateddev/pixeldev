"use client"

import { register } from "@/lib/auth"
import { Button, Form, Input } from "antd"
import { FC, useState } from "react"

const RegisterForm: FC = () => {
  const [submitting, setSubmitting] = useState(false)
  const onSubmit = async (values: any) => {
    setSubmitting(true)
    const result = await register(values)
    setSubmitting(false)
  }
  return (
    <Form requiredMark="optional" layout="vertical" onFinish={onSubmit}>
      <Form.Item name="username" label="Username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        rules={[{ required: true }]}
      >
        <Input.Password />
      </Form.Item>
      <Button loading={submitting} type="primary" htmlType="submit">
        Register
      </Button>
    </Form>
  )
}

export default RegisterForm
