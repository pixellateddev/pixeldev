import { createExpense, updateExpense } from '@/lib/expense'
import { DatePicker, Form, Input, InputNumber, Modal, Select } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { FC, useState } from 'react'
import classes from './expense-modal.module.scss'

interface Props {
    expense?: any
    open?: boolean
    onClose: () => void
}

const ExpenseModal: FC<Props> = ({ open, expense, onClose }) => {
    const [form] = Form.useForm()
    const [submitting, setSubmitting] = useState(false)

    const onOk = () => {
        form.submit()
    }

    const onCancel = () => {
        onClose()
    }

    const handleSubmit = async (values: any) => {
        setSubmitting(true)
        const parsedValues = {
            ...initialValues,
            ...values,
            date: (values.date as Dayjs).toISOString(),
        }
        if (expense) {
            await updateExpense(parsedValues)
        } else {
            await createExpense(parsedValues)
        }
        setSubmitting(false)
        onCancel()
    }

    let initialValues = {
        tags: [],
    }

    if (expense) {
        initialValues = {
            ...expense,
            tags: expense.tags.map((tag: any) => tag.name),
            date: dayjs(expense.date),
        }
    }

    return (
        <Modal
            open={open}
            title="Record Expense"
            confirmLoading={submitting}
            onOk={onOk}
            onCancel={onCancel}
        >
            <Form
                className={classes.form}
                form={form}
                initialValues={initialValues}
                requiredMark="optional"
                onFinish={handleSubmit}
                labelCol={{ span: 7 }}
                labelAlign="left"
            >
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
                <Form.Item
                    name="date"
                    label="Date"
                    rules={[{ required: true }]}
                >
                    <DatePicker
                        allowClear={false}
                        defaultPickerValue={dayjs()}
                        maxDate={dayjs()}
                    />
                </Form.Item>
                <Form.Item name="tags" label="Tags">
                    <Select mode="tags" maxTagCount="responsive" />
                </Form.Item>
                <Form.Item name="notes" label="Notes">
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ExpenseModal
