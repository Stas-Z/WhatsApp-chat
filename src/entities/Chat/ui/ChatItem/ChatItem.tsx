import { memo, useCallback, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import { getNoticeById } from '@/entities/Notice'
import { usReceiveNotification } from '@/entities/Notice/model/api/noticeApi'
import {
    getUserApiUrl,
    getUserInstance,
    getUserToken,
} from '@/entities/User/model/selectors/getUserAuthData/getUserAuthData'
import Close from '@/shared/assets/icons/close.svg?react'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
    formatPhoneNumber,
    onlyPhoneNumber,
} from '@/shared/lib/helpers/formatPhoneNumber/formatPhoneNumber'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Avatar } from '@/shared/ui/Avatar'
import { Icon } from '@/shared/ui/Icon'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './ChatItem.module.scss'
import { useCheckWhatsapp, useGetContact } from '../../model/api/chatApi'
import { getCurrentChatId } from '../../model/selectors/getChatSelectors'
import { chatActions } from '../../model/slices/chatSlice'

interface ChatItemProps {
    className?: string
    chatId: string
}

export const ChatItem = memo((props: ChatItemProps) => {
    const { className, chatId } = props
    const dispatch = useAppDispatch()

    const [isExist, setIsExist] = useState(true)

    const idInstance = useSelector(getUserInstance)
    const apiTokenInstance = useSelector(getUserToken)
    const apiUrl = useSelector(getUserApiUrl)
    const currentChat = useSelector(getCurrentChatId)

    const notice = useSelector(getNoticeById(chatId))

    const { data: contact } = useGetContact({
        apiUrl,
        chatId,
        apiTokenInstance,
        idInstance,
    })

    const { data: exist } = useCheckWhatsapp({
        apiUrl,
        chatId: onlyPhoneNumber(chatId),
        apiTokenInstance,
        idInstance,
    })

    const { data } = usReceiveNotification({
        apiUrl,
        apiTokenInstance,
        idInstance,
    })

    useEffect(() => {
        if (exist) {
            setIsExist(exist?.existsWhatsapp)
        }
    }, [exist])

    const onClickChat = useCallback(() => {
        if (isExist) {
            dispatch(
                chatActions.setChat({
                    chatId,
                    name: contact?.name,
                    avatar: contact?.avatar,
                }),
            )
        }
    }, [chatId, contact?.name, contact?.avatar, dispatch, isExist])

    const onClickDelete = useCallback(() => {
        dispatch(chatActions.deleteChat({ chatId }))
    }, [chatId, dispatch])

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
                <Avatar src={contact?.avatar} size={49} alt={contact?.name} />
            </HStack>
            <VStack max maxHeight justify="center" className={cls.info}>
                <Text
                    title={
                        contact?.name ||
                        contact?.contactName ||
                        formatPhoneNumber(chatId)
                    }
                    size="s"
                    variant={isExist ? 'normal' : 'error'}
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
            {!isExist && (
                <div className={cls.delete}>
                    <Icon
                        Svg={Close}
                        width={20}
                        height={20}
                        clickable
                        onClick={onClickDelete}
                        color="red"
                    />
                </div>
            )}
        </HStack>
    )
})
ChatItem.displayName = 'ChatItem'
