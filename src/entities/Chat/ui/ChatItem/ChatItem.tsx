import { memo, useCallback } from 'react'

import { useInView } from 'react-intersection-observer'
import { useSelector } from 'react-redux'

import {
    getUserInstance,
    getUserToken,
} from '@/entities/User/model/selectors/getUserAuthData/getUserAuthData'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Avatar } from '@/shared/ui/Avatar'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './ChatItem.module.scss'
import { useGetAvatar } from '../../model/api/chatApi'
import { chatActions } from '../../model/slices/chatSlice'

interface ChatItemProps {
    className?: string
    name: string
    chatId: number
}

export const ChatItem = memo((props: ChatItemProps) => {
    const { className, chatId, name } = props
    const dispatch = useAppDispatch()

    const idInstance = useSelector(getUserInstance)
    const apiTokenInstance = useSelector(getUserToken)

    const { ref, inView } = useInView({ triggerOnce: true })
    const { data } = useGetAvatar(
        {
            chatId,
            apiTokenInstance,
            idInstance,
        },
        { skip: !inView },
    )

    const onClickChat = useCallback(() => {
        dispatch(
            chatActions.setChat({
                id: chatId,
                name,
                urlAvatar: data?.urlAvatar,
            }),
        )
    }, [chatId, data?.urlAvatar, dispatch, name])

    return (
        <HStack
            onClick={onClickChat}
            max
            className={classNames(cls.chatItem, {}, [className])}
        >
            <div ref={ref} className={cls.avatar}>
                <Avatar src={data?.urlAvatar} size={49} alt={name} />
            </div>
            <VStack max maxHeight justify="center" className={cls.info}>
                <Text title={name} size="s" />
            </VStack>
        </HStack>
    )
})
ChatItem.displayName = 'ChatItem'
