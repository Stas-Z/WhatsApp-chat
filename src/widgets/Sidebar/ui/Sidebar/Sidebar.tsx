import { memo, useCallback, useState } from 'react'

import { useSelector } from 'react-redux'

import { ChatList, getCurrentChat } from '@/entities/Chat'
import { userActions } from '@/entities/User'
import { AddNewChatModal } from '@/features/AddNewChat'
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
    const currentChat = useSelector(getCurrentChat)

    const [isAuthModal, setIsAuthModal] = useState(false)

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false)
    }, [])
    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
    }, [])

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
            <AddNewChatModal isOpen={isAuthModal} onClose={onCloseModal} />
            <HStack max className={cls.addButtonBlock}>
                {currentChat && (
                    <Button
                        variant="filled"
                        fullWidth
                        onClick={onShowModal}
                        className={cls.addButton}
                    >
                        Добавить чат
                    </Button>
                )}
            </HStack>
        </VStack>
    )
})
Sidebar.displayName = 'Sidebar'
