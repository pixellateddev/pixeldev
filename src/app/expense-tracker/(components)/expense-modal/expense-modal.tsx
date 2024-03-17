import { createExpense } from "@/lib/expense"
import { DatePicker, Form, Input, InputNumber, Modal } from "antd"
import dayjs from "dayjs"
import { FC, useState } from "react"

interface Props {
    open?: boolean
    onClose: () => void
}

const ExpenseModal: FC<Props> = ({ open, onClose }) => {
    const [form] = Form.useForm()
    const [submitting, setSubmitting] = useState(false)

    const onOk = () => {
        form.submit()
    }

    const onCancel = () => {
        form.resetFields()
        onClose()
    }

    const handleSubmit = async (values: any) => {
        setSubmitting(true)
        const parsedValues = {
            ...values,
            date: new Date(values.date).toISOString(),
        }
        await createExpense(parsedValues)
        setSubmitting(false)
        onCancel()
    }

    return (
        <Modal
            open={open}
            title="Record Expense"
            onOk={onOk}
            onCancel={onCancel}
        >
            <div>
                <Form
                    form={form}
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
                    <Form.Item name="notes" label="Notes">
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default ExpenseModal
