import { memo, useCallback } from 'react'

import { useSelector } from 'react-redux'

import {
    getUserApiUrl,
    getUserInstance,
    getUserToken,
} from '@/entities/User/model/selectors/getUserAuthData/getUserAuthData'
import Send from '@/shared/assets/icons/send.svg?react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useEnterKey } from '@/shared/lib/hooks/useEnterKey/useEnterKey'
import { Icon } from '@/shared/ui/Icon'
import { Input } from '@/shared/ui/Input'
import { HStack } from '@/shared/ui/Stack'

import cls from './ChatFooter.module.scss'
import { useSendMessage } from '../../model/api/chatApi'
import {
    getCurrentChat,
    getMessageValue,
} from '../../model/selectors/getChatSelectors'
import { chatActions } from '../../model/slices/chatSlice'

interface ChatFooterProps {
    className?: string
}

export const ChatFooter = memo((props: ChatFooterProps) => {
    const { className } = props
    const dispatch = useAppDispatch()

    const message = useSelector(getMessageValue)

    const idInstance = useSelector(getUserInstance)
    const apiTokenInstance = useSelector(getUserToken)
    const currentChat = useSelector(getCurrentChat)
    const apiUrl = useSelector(getUserApiUrl)

    const onChangeMessage = useCallback(
        (value: string) => {
            dispatch(chatActions.setMessageValue(value))
        },
        [dispatch],
    )

    const [sendMessage] = useSendMessage()

    const onSendClick = useCallback(() => {
        sendMessage({
            apiUrl,
            message,
            apiTokenInstance,
            chatId: currentChat?.chatId,
            idInstance,
        })
        dispatch(chatActions.setMessageValue(''))
    }, [
        apiTokenInstance,
        apiUrl,
        currentChat?.chatId,
        dispatch,
        idInstance,
        message,
        sendMessage,
    ])

    useEnterKey(onSendClick)
    return (
        <HStack max className={classNames(cls.chatFooter, {}, [className])}>
            <Input
                variant="normal"
                placeholder="Введите сообщение"
                className={cls.input}
                onChange={onChangeMessage}
                value={message}
            />
            <Icon
                Svg={Send}
                width={24}
                height={24}
                clickable
                onClick={onSendClick}
                color="grey"
            />
        </HStack>
    )
})
ChatFooter.displayName = 'ChatFooter'
