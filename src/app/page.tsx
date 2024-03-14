import { getSession } from "@/utils/auth"
import Link from "next/link"

export default async function Home() {
  const session = await getSession()
  return (
    <div>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
      <p>Hi {session?.user.username || "Guest"}</p>
    </div>
  )
}
