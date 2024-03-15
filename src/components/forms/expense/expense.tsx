"use client"

import { createExpense } from "@/lib/expense"
import { Button, DatePicker, Form, Input, InputNumber } from "antd"
import { FC } from "react"

const ExpenseForm: FC = () => {
  const onSubmit = async (values: any) => {
    const parsedValues = {
      ...values,
      date: new Date(values.date).toISOString(),
    }
    createExpense(parsedValues)
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
      <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
        <InputNumber addonAfter="₹" />
      </Form.Item>
      <Form.Item name="date" label="Date" rules={[{ required: true }]}>
        <DatePicker allowClear />
      </Form.Item>
      <Form.Item name="notes" label="Notes">
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ExpenseForm
