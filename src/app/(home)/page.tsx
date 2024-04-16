import { Button } from 'antd'
import Link from 'next/link'

export default async function Home() {
    return (
        <>
            <Link href={'/expense-tracker'}>
                <Button type="link">Expense Tracker</Button>
            </Link>
            <Link href={'/pixel-play'}>
                <Button type="link">Pixel Play</Button>
            </Link>
        </>
    )
}
