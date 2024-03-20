import { Tag } from 'antd'
import { FC } from 'react'
import classes from './error.module.scss'

interface Props {
    message?: string
}

const ErrorBanner: FC<Props> = ({ message }) => {
    return (
        <div className={classes.banner}>
            {message && (
                <Tag className={classes.message} color="red">
                    {message}
                </Tag>
            )}
        </div>
    )
}

export default ErrorBanner
