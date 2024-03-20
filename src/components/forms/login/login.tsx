'use client'

import { ErrorBanner } from '@/components/ui'
import validateMessages from '@/constant/message'
import { login } from '@/lib/auth'
import { KeyOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Tag } from 'antd'
import { FC, useEffect, useState } from 'react'

const LoginForm: FC = () => {
    const [form] = Form.useForm()
    const [invalid, setInvalid] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const onSubmit = async (values: any) => {
        setSubmitting(true)
        const result = await login(values)
        setSubmitting(false)

        if (result?.error) {
            setInvalid(true)
        }
    }

    const formState = Form.useWatch(
        (values) => values.username + values.password,
        form
    )

    useEffect(() => {
        setInvalid(false)
    }, [formState])

    return (
        <>
            <ErrorBanner
                message={invalid ? 'Invalid username or password' : ''}
            />
            <Form
                validateMessages={validateMessages}
                requiredMark="optional"
                layout="vertical"
                form={form}
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
                    <Input prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        { required: true, type: 'string', min: 10 },
                        { type: 'string', max: 40 },
                    ]}
                >
                    <Input.Password prefix={<KeyOutlined />} />
                </Form.Item>
                <Button loading={submitting} type="primary" htmlType="submit">
                    Login
                </Button>
            </Form>
        </>
    )
}

export default LoginForm
