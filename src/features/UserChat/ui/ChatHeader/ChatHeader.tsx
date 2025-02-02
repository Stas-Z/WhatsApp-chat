import { memo } from 'react'

import { useSelector } from 'react-redux'

import { getCurrentChat } from '@/entities/Chat'
import { classNames } from '@/shared/lib/classNames/classNames'
import { formatPhoneNumber } from '@/shared/lib/helpers/formatPhoneNumber/formatPhoneNumber'
import { Avatar } from '@/shared/ui/Avatar'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './ChatHeader.module.scss'

interface ChatHeaderProps {
    className?: string
}

export const ChatHeader = memo((props: ChatHeaderProps) => {
    const { className } = props
    const currentChat = useSelector(getCurrentChat)

    return (
        <HStack max className={classNames(cls.chatHeader, {}, [className])}>
            <HStack max maxHeight justify="center" className={cls.avatar}>
                <Avatar
                    src={currentChat?.avatar}
                    size={49}
                    alt={currentChat?.name}
                />
            </HStack>
            <VStack max maxHeight justify="center">
                <Text title={currentChat?.name} size="s" />
                {currentChat && (
                    <Text
                        text={formatPhoneNumber(currentChat?.chatId)}
                        size="s"
                        variant="grey"
                    />
                )}
            </VStack>
        </HStack>
    )
})
ChatHeader.displayName = 'ChatHeader'
