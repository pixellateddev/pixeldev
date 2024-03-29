import { NextPage } from 'next'
import classes from '../auth.module.scss'
import Link from 'next/link'
import { RegisterForm } from '@/components/forms'
import { Button, Card } from 'antd'

const Register: NextPage = async () => {
    return (
        <div className={classes.container}>
            <Card className={classes.card}>
                <div className={classes.formContainer}>
                    <h3 className={classes.formTitle}>
                        Create a Pixel Account
                    </h3>
                    <RegisterForm />
                    <p>
                        Already have an account?{' '}
                        <Link href="/login">
                            <Button type="link">Login here</Button>
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    )
}

export default Register
