import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Loader.module.scss'

interface LoaderProps {
    className?: string
}

export const Loader = memo((props: LoaderProps) => {
    const { className } = props

    return <span className={classNames(cls.loader, {}, [className])}></span>
})
Loader.displayName = 'Loader'
