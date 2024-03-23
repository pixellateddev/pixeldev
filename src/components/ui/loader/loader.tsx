import { FC } from 'react'
import { Spin, SpinProps } from 'antd'

import classes from './loader.module.scss'

interface Props {
    size?: SpinProps['size']
}

const Loader: FC<Props> = ({ size }) => {
    return (
        <div className={classes.loaderContainer}>
            <Spin size={size} />
        </div>
    )
}

export default Loader
