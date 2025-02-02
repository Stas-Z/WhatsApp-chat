import { memo, useCallback } from 'react'

import { useSelector } from 'react-redux'

import { getNoticeById } from '@/entities/Notice'
import Close from '@/shared/assets/icons/delete.svg?react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { formatPhoneNumber } from '@/shared/lib/helpers/formatPhoneNumber/formatPhoneNumber'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Avatar } from '@/shared/ui/Avatar'
import { Icon } from '@/shared/ui/Icon'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './ChatItem.module.scss'
import { getCurrentChatId } from '../../model/selectors/getChatSelectors'
import { chatActions } from '../../model/slices/chatSlice'
import { Chat } from '../../model/types/chatSchema'

interface ChatItemProps {
    className?: string
    chat: Chat
    onClick?: (chatId: string) => void
}

export const ChatItem = memo((props: ChatItemProps) => {
    const { className, chat, onClick } = props
    const { chatId, avatar, contactName, name } = chat

    const dispatch = useAppDispatch()

    const currentChat = useSelector(getCurrentChatId)

    const notice = useSelector(getNoticeById(chatId))

    const onClickChat = useCallback(() => {
        dispatch(
            chatActions.setCurrentChat({
                chatId,
                name,
                avatar: avatar || undefined,
            }),
        )
    }, [avatar, chatId, dispatch, name])

    const onClickDelete = useCallback(() => {
        dispatch(chatActions.deleteCurrentChat())
        if (onClick) {
            onClick(chatId)
        }
    }, [chatId, dispatch, onClick])

    return (
        <HStack
            onClick={onClickChat}
            max
            className={classNames(
                cls.chatItem,
                { [cls.current]: currentChat === chatId },
                [className],
            )}
        >
            <HStack max maxHeight justify="center" className={cls.avatar}>
                <Avatar src={avatar} size={49} alt={name} />
            </HStack>
            <VStack max maxHeight justify="center" className={cls.info}>
                <Text
                    title={name || contactName || formatPhoneNumber(chatId)}
                    size="s"
                />
                <HStack max justify="between">
                    <Text
                        className={cls.notice}
                        text={
                            notice
                                ? notice.textMessage
                                : formatPhoneNumber(chatId)
                        }
                        size="s"
                        variant="grey"
                        ellipsis
                    />
                    {notice && (
                        <Text
                            text={notice.timestamp}
                            size="xs"
                            variant="succes"
                        />
                    )}
                </HStack>
            </VStack>

            {currentChat === chatId && (
                <div
                    className={cls.delete}
                    onClick={(event) => event.stopPropagation()}
                >
                    <Icon
                        Svg={Close}
                        width={16}
                        height={16}
                        clickable
                        onClick={onClickDelete}
                        className={cls.delIcon}
                    />
                </div>
            )}
        </HStack>
    )
})
ChatItem.displayName = 'ChatItem'
