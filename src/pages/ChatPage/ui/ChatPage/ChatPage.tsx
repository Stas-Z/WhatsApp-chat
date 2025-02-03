import { memo, useEffect } from 'react'

import { initAllChats } from '@/features/AddNewChat'
import { ChatLayout } from '@/shared/layouts/ChatLayout'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { VStack } from '@/shared/ui/Stack'
import { ChatWindow } from '@/widgets/ChatWindow'
import { Sidebar } from '@/widgets/Sidebar'

import cls from './ChatPage.module.scss'

interface ChatPageProps {
    className?: string
}

const ChatPage = (props: ChatPageProps) => {
    const { className } = props

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initAllChats())
    }, [dispatch])

    return (
        <VStack maxHeight className={classNames(cls.chatPage, {}, [className])}>
            <ChatLayout content={<ChatWindow />} sidebar={<Sidebar />} />
        </VStack>
    )
}

export default memo(ChatPage)
