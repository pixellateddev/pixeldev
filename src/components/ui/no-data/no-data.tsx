import { Empty } from 'antd'
import { FC } from 'react'
import classes from './no-data.module.scss'

interface Props {
    description?: string
    position?: 'start' | 'center'
}

const NoData: FC<Props> = ({ description, position = 'center' }) => {
    return (
        <div className={classes.container} style={{ alignContent: position }}>
            <Empty description={description} />
        </div>
    )
}

export default NoData
