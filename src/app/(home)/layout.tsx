import { GenericLayout, Header } from '@/components/layout'
import { FC, PropsWithChildren } from 'react'
import classes from './home-layout.module.scss'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
    title: 'Pixellateddev',
}

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return <GenericLayout>{children}</GenericLayout>
}

export default Layout
