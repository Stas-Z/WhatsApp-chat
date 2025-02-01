import { memo } from 'react'

import { ChatWindow } from '@/features/ChatWindow'
import { ChatLayout } from '@/shared/layouts/ChatLayout'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack'
import { Sidebar } from '@/widgets/Sidebar'

import cls from './ChatPage.module.scss'

interface ChatPageProps {
    className?: string
}

const ChatPage = (props: ChatPageProps) => {
    const { className } = props

    return (
        <VStack maxHeight className={classNames(cls.chatPage, {}, [className])}>
            <ChatLayout content={<ChatWindow />} sidebar={<Sidebar />} />
        </VStack>
    )
}

export default memo(ChatPage)
