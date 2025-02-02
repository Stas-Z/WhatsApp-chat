import { memo } from 'react'

import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/Text'

import cls from './Error.module.scss'
import { getErrorValue } from '../../model/selectors/getMessageSelectors'

interface ErrorProps {
    className?: string
}

export const Error = memo((props: ErrorProps) => {
    const { className } = props

    const errorMessage = useSelector(getErrorValue)

    if (!errorMessage) {
        return null
    }

    return (
        <div className={classNames(cls.error, {}, [className])}>
            <Text variant="error" text={errorMessage} align="center" />
        </div>
    )
})
Error.displayName = 'Error'
