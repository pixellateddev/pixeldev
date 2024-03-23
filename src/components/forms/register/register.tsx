'use client'

import validateMessages from '@/constant/message'
import { register } from '@/lib/auth'
import { Button, Form, Input } from 'antd'
import { FC, useState } from 'react'

const RegisterForm: FC = () => {
    const [submitting, setSubmitting] = useState(false)
    const onSubmit = async (values: any) => {
        setSubmitting(true)
        const result = await register(values)
        setSubmitting(false)
    }
    return (
        <Form
            requiredMark="optional"
            layout="vertical"
            validateMessages={validateMessages}
            onFinish={onSubmit}
        >
            <Form.Item
                name="username"
                label="Username"
                rules={[
                    { required: true, type: 'string', min: 5 },
                    { type: 'string', max: 30 },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true }, { type: 'email' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[
                    { required: true, type: 'string', min: 10 },
                    { type: 'string', max: 40 },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                rules={[
                    { required: true },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject(
                                new Error(
                                    'Confirm Password does not match the entered password'
                                )
                            )
                        },
                    }),
                ]}
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
