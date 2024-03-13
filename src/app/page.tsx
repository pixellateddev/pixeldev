import LoginForm from "@/components/login-form/login-form"
import { login } from "@/lib/auth"

export default function Home() {
  return (
    <LoginForm
      onSubmit={async (values) => {
        "use server"
        login(values)
      }}
    />
  )
}
