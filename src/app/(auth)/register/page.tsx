import RegisterForm from "@/components/register-form/register-form"
import { NextPage } from "next"
import classes from "../auth.module.scss"
import Link from "next/link"

const Register: NextPage = async () => {
  return (
    <div className={classes.container}>
      <div className={classes.formContainer}>
        <h3 className={classes.formTitle}>Create a Pixel Account</h3>
        <RegisterForm />
        <p>
          Already have an account? <Link href="/login">Login here</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
