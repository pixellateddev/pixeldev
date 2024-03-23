import { getExpensesSummary } from '@/lib/expense'
import { Card, Statistic } from 'antd'
import { FC } from 'react'
import classes from './summary.module.scss'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'

const Summary: FC = async () => {
    const { summary, relative } = await getExpensesSummary('month')
    return (
        <div className={classes.summary}>
            <Card bordered={false}>
                <Statistic
                    title="Expenses this month"
                    value={summary}
                    prefix="₹"
                />
            </Card>
            <Card bordered={false}>
                <Statistic
                    title="Relative to last month"
                    value={relative.percentage}
                    valueStyle={{
                        color:
                            relative.direction === 'increase'
                                ? 'rgb(229, 79, 79)'
                                : 'green',
                    }}
                    precision={2}
                    prefix={
                        relative.direction === 'increase' ? (
                            <ArrowUpOutlined />
                        ) : (
                            <ArrowDownOutlined />
                        )
                    }
                    suffix={'%'}
                />
            </Card>
        </div>
    )
}

export default Summary
