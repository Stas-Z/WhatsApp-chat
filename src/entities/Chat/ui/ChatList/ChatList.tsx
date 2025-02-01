import { memo } from 'react'

import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './ChatList.module.scss'
import { getAllChats } from '../../model/selectors/getChatSelectors'
import { ChatItem } from '../ChatItem/ChatItem'

interface ChatListProps {
    className?: string
}

export const ChatList = memo((props: ChatListProps) => {
    const { className } = props

    const chats = useSelector(getAllChats)

    return (
        <div className={classNames(cls.chatList, {}, [className])}>
            <div className={cls.wrapper}>
                {chats &&
                    chats.map((chat) => (
                        <ChatItem key={chat.chatId} chatId={chat.chatId} />
                    ))}
            </div>
        </div>
    )
})
ChatList.displayName = 'ChatList'
