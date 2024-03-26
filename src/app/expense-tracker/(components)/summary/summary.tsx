import { getExpensesSummary } from '@/lib/expense'
import { Card, Statistic } from 'antd'
import { FC } from 'react'
import classes from './summary.module.scss'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import clsx from 'clsx'

const Summary: FC = async () => {
    const { current, relative } = await getExpensesSummary('month')
    const suffix = (
        <p
            className={clsx(classes.suffix, {
                [classes.decrease]: relative < 0,
                [classes.increase]: relative > 0,
            })}
        >
            {relative !== Infinity &&
                (relative > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />)}
            {relative !== Infinity && `${Math.abs(relative)}%`}
        </p>
    )

    return (
        <div className={classes.summary}>
            <Card bordered={false}>
                <Statistic
                    title="Expenses this month"
                    value={current}
                    prefix="₹"
                    suffix={suffix}
                />
            </Card>
        </div>
    )
}

export default Summary
