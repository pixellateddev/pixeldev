import { FC } from 'react'
import classes from './summary.module.scss'
import { Card, Statistic } from 'antd'

const SummaryLoader: FC = () => {
    return (
        <div className={classes.summary}>
            <Card bordered={false}>
                <Statistic title="Expenses this month" loading />
            </Card>
        </div>
    )
}

export default SummaryLoader
