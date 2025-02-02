import { memo, useCallback } from 'react'

import { userActions } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button } from '@/shared/ui/Button'
import { HStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './SidebarHeader.module.scss'

interface SidebarHeaderProps {
    className?: string
}

export const SidebarHeader = memo((props: SidebarHeaderProps) => {
    const { className } = props

    const dispatch = useAppDispatch()

    const onClickExit = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    return (
        <HStack
            justify="between"
            max
            className={classNames(cls.sidebarHeader, {}, [className])}
        >
            <Text bold text="Чаты" size="l" />
            <Button onClick={onClickExit}>Выйти</Button>
        </HStack>
    )
})
SidebarHeader.displayName = 'SidebarHeader'
