"use client"

import { createExpense } from "@/lib/expense"
import { Button, DatePicker, Form, Input, InputNumber } from "antd"
import { FC, useState } from "react"
import dayjs from "dayjs"

const ExpenseForm: FC = () => {
    const [submitting, setSubmitting] = useState(false)
    const onSubmit = async (values: any) => {
        setSubmitting(true)
        const parsedValues = {
            ...values,
            date: new Date(values.date).toISOString(),
        }
        await createExpense(parsedValues)
        setSubmitting(false)
    }

    return (
        <Form requiredMark="optional" layout="vertical" onFinish={onSubmit}>
            <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="amount"
                label="Amount"
                rules={[{ required: true }]}
            >
                <InputNumber addonAfter="₹" />
            </Form.Item>
            <Form.Item name="date" label="Date" rules={[{ required: true }]}>
                <DatePicker
                    allowClear={false}
                    defaultPickerValue={dayjs()}
                    maxDate={dayjs()}
                />
            </Form.Item>
            <Form.Item name="notes" label="Notes">
                <Input.TextArea />
            </Form.Item>
            <Form.Item>
                <Button loading={submitting} type="primary" htmlType="submit">
                    Create
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ExpenseForm
