import { memo, useCallback, useState } from 'react'

import { useSelector } from 'react-redux'

import { getCurrentChat } from '@/entities/Chat'
import { Error } from '@/entities/Error'
import { AddNewChatModal } from '@/features/AddNewChat'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/Button'
import { HStack } from '@/shared/ui/Stack'

import cls from './SidebarFooter.module.scss'

interface SidebarFooterProps {
    className?: string
}

export const SidebarFooter = memo((props: SidebarFooterProps) => {
    const { className } = props
    const currentChat = useSelector(getCurrentChat)

    const [isAuthModal, setIsAuthModal] = useState(false)

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false)
    }, [])
    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
    }, [])
    return (
        <>
            <AddNewChatModal isOpen={isAuthModal} onClose={onCloseModal} />
            <Error className={cls.error} />
            <HStack
                max
                className={classNames(cls.sidebarFooter, {}, [className])}
            >
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
        </>
    )
})
SidebarFooter.displayName = 'SidebarFooter'
