import { memo, useEffect, useRef } from 'react'

import { useSelector } from 'react-redux'

import { Message, MessageList } from '@/entities/Message'
import { getNoticeById } from '@/entities/Notice'
import {
    getUserApiUrl,
    getUserInstance,
    getUserToken,
} from '@/entities/User/model/selectors/getUserAuthData/getUserAuthData'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack'

import cls from './ChatDetails.module.scss'
import { getCurrentChatId } from '../../model/selectors/getChatSelectors'

interface ChatDetailsProps {
    className?: string
    messages?: Message[]
}

export const ChatDetails = memo((props: ChatDetailsProps) => {
    const { className, messages } = props

    const idInstance = useSelector(getUserInstance)
    const apiTokenInstance = useSelector(getUserToken)
    const chatId = useSelector(getCurrentChatId)
    const apiUrl = useSelector(getUserApiUrl)
    const notice = useSelector(getNoticeById(chatId))

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
