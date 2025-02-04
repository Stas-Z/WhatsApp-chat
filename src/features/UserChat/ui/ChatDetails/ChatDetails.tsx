import { memo, useEffect, useRef } from 'react'

import { Message, MessageList } from '@/entities/Message'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack'

import cls from './ChatDetails.module.scss'

interface ChatDetailsProps {
    className?: string
    messages?: Message[]
}

export const ChatDetails = memo((props: ChatDetailsProps) => {
    const { className, messages } = props

    const listRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight
        }
    }, [messages])

    return (
        <VStack
            ref={listRef}
            max
            maxHeight
            className={classNames(cls.chatDetails, {}, [className])}
        >
            <div className={cls.space} />

            <MessageList messages={messages} />
        </VStack>
    )
})
ChatDetails.displayName = 'ChatDetails'
