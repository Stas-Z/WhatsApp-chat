import { memo, useCallback, useState } from 'react'

import { useSelector } from 'react-redux'

import { useGetChatHistory } from '@/entities/Chat'
import { getCurrentChatId } from '@/entities/Chat'
import { Error } from '@/entities/Error'
import { getUserApiUrl, getUserInstance, getUserToken } from '@/entities/User'
import { AddNewChatModal } from '@/features/AddNewChat'
import { ChatDetails, ChatFooter, ChatHeader } from '@/features/UserChat'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppImage } from '@/shared/ui/AppImage'
import { Button } from '@/shared/ui/Button'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './ChatWindow.module.scss'

interface ChatWindowProps {
    className?: string
}

export const ChatWindow = memo((props: ChatWindowProps) => {
    const { className } = props

    const [isAuthModal, setIsAuthModal] = useState(false)

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false)
    }, [])
    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
    }, [])

    const apiUrl = useSelector(getUserApiUrl)
    const idInstance = useSelector(getUserInstance)
    const apiTokenInstance = useSelector(getUserToken)

    const chatId = useSelector(getCurrentChatId)

    const { data: messages } = useGetChatHistory({
        apiUrl,
        chatId,
        idInstance,
        apiTokenInstance,
    })

    if (!chatId) {
        return (
            <VStack
                max
                maxHeight
                gap="24"
                justify="center"
                align="center"
                className={classNames(cls.chatWindow, {}, [className])}
            >
                <Error />
                <AppImage
                    alt="notebook image"
                    src="img/notebook.png"
                    width={320}
                />
                <Text
                    title="Начните новый чат или продолжайте беседу."
                    size="m"
                    variant="primary"
                    className={cls.text}
                    align="center"
                    lighter
                />
                <AddNewChatModal isOpen={isAuthModal} onClose={onCloseModal} />
                <Button onClick={onShowModal} variant="filled" color="white">
                    Новый Чат
                </Button>
            </VStack>
        )
    }

    return (
        <VStack
            justify="between"
            className={classNames(cls.chatWindow, {}, [className, cls.current])}
        >
            <div className={cls.imgBack}></div>
            <ChatHeader />
            <ChatDetails messages={messages} />
            <ChatFooter />
        </VStack>
    )
})
ChatWindow.displayName = 'ChatWindow'
