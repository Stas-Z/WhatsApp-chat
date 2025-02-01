import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './MessageList.module.scss'
import { Message } from '../../model/types/message'
import { MessageItem } from '../MessageItem/MessageItem'

interface MessageListProps {
    className?: string
    messages?: Message[]
}

export const MessageList = memo((props: MessageListProps) => {
    const { className, messages } = props

    return (
        <div className={classNames(cls.messageList, {}, [className])}>
            {messages &&
                messages.map((message) => (
                    <MessageItem key={message.idMessage} message={message} />
                ))}
        </div>
    )
})
MessageList.displayName = 'MessageList'
