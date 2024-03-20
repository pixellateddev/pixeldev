import type { FormProps } from 'antd'

const validateMessages: FormProps['validateMessages'] = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    string: {
        min: '${label} must be atleast ${min} characters',
        max: '${label} cannot be longer than ${max} characters',
    },
}

export default validateMessages
