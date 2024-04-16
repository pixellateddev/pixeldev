import { Button } from 'antd'
import { NextPage } from 'next'
import Link from 'next/link'

const PixelPlay: NextPage = () => {
    return (
        <div>
            Pixel Play{' '}
            <Link href="/pixel-play/snake">
                <Button type="link">Snake</Button>
            </Link>
        </div>
    )
}

export default PixelPlay
