import { memo, useCallback } from 'react'

import { userActions } from '@/entities/User'
import { ChatList } from '@/features/ChatList'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button } from '@/shared/ui/Button'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './Sidebar.module.scss'

interface SidebarProps {
    className?: string
}

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props
    const dispatch = useAppDispatch()

    const onClickExit = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    return (
        <VStack maxHeight className={classNames(cls.sidebar, {}, [className])}>
            <HStack justify="between" max className={cls.header}>
                <Text bold text="Чаты" size="l" />
                <Button onClick={onClickExit}>Выйти</Button>
            </HStack>
            <ChatList />
        </VStack>
    )
})
Sidebar.displayName = 'Sidebar'
