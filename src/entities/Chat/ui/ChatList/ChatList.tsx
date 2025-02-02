import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './ChatList.module.scss'
import { Chat } from '../../model/types/chatSchema'
import { ChatItem } from '../ChatItem/ChatItem'

interface ChatListProps {
    className?: string
    allChats: Chat[]
    onClickDelete?: (chatId: string) => void
}

export const ChatList = memo((props: ChatListProps) => {
    const { className, allChats, onClickDelete } = props

    return (
        <div className={classNames(cls.chatList, {}, [className])}>
            <div className={cls.wrapper}>
                {allChats &&
                    allChats.map((chat) => (
                        <ChatItem
                            key={chat.chatId}
                            chat={chat}
                            onClick={onClickDelete}
                        />
                    ))}
            </div>
        </div>
    )
})
ChatList.displayName = 'ChatList'
