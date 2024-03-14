import LoginForm from "@/components/login-form/login-form"
import { NextPage } from "next"
import classes from "../auth.module.scss"
import Link from "next/link"

const Login: NextPage = async () => {
  return (
    <div className={classes.container}>
      <div className={classes.formContainer}>
        <h3 className={classes.formTitle}>Log in to Pixel Account</h3>
        <LoginForm />
        <p>
          Dont have an account? <Link href="/register">Register here</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
