import { NextPage } from 'next'
import classes from '../auth.module.scss'
import Link from 'next/link'
import { LoginForm } from '@/components/forms'
import { Button, Card } from 'antd'

const Login: NextPage = async () => {
    return (
        <div className={classes.container}>
            <Card className={classes.card}>
                <div className={classes.formContainer}>
                    <h3 className={classes.formTitle}>
                        Log in to Pixel Account
                    </h3>
                    <LoginForm />
                    <p>
                        Dont have an account?{' '}
                        <Link href="/register">
                            <Button type="link">Register here</Button>
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    )
}

export default Login
