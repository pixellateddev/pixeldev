import { getSession } from "@/utils/auth"
import Link from "next/link"

export default async function Home() {
    const session = await getSession()
    return (
        <div>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
            <Link href="/expense-tracker">Expense Tracker</Link>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    )
}
