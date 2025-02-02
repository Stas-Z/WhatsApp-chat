import { memo, useCallback } from 'react'

import { useSelector } from 'react-redux'

import { ChatList } from '@/entities/Chat'
import { usReceiveNotification } from '@/entities/Notice'
import { getUserApiUrl, getUserInstance, getUserToken } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import cls from './UserChatsList.module.scss'
import { getAllChats } from '../../model/selectors/getChatSelectors'
import { newChatActions } from '../../model/slices/newChatSlice'

interface UserChatsListProps {
    className?: string
}

export const UserChatsList = memo((props: UserChatsListProps) => {
    const { className } = props

    const dispatch = useAppDispatch()

    const idInstance = useSelector(getUserInstance)
    const apiTokenInstance = useSelector(getUserToken)
    const apiUrl = useSelector(getUserApiUrl)

    const { data } = usReceiveNotification(
        {
            apiUrl,
            apiTokenInstance,
            idInstance,
        },
        { refetchOnFocus: true },
    )

    const chats = useSelector(getAllChats)

    const onClickDelete = useCallback(
        (chatId: string) => {
            dispatch(newChatActions.deleteChat({ chatId }))
        },
        [dispatch],
    )

    return (
        <div className={classNames(cls.userChatsList, {}, [className])}>
            <ChatList allChats={chats} onClickDelete={onClickDelete} />
        </div>
    )
})
UserChatsList.displayName = 'UserChatsList'
