import LoginForm from "@/components/login-form/login-form"
import { getSession } from "@/utils/auth"
import { NextPage } from "next"

const Login: NextPage = async () => {
  return (
    <div>
      <LoginForm />
    </div>
  )
}

export default Login
