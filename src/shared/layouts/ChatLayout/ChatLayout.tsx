import { memo, ReactNode } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack, VStack } from '@/shared/ui/Stack'

import cls from './ChatLayout.module.scss'

interface ChatLayoutProps {
    className?: string
    content: ReactNode
    sidebar: ReactNode
}

export const ChatLayout = memo((props: ChatLayoutProps) => {
    const { className, content, sidebar } = props

    return (
        <HStack max className={classNames(cls.chatLayout, {}, [className])}>
            <VStack className={cls.sidebar}>{sidebar}</VStack>
            <VStack max className={cls.content}>
                {content}
            </VStack>
        </HStack>
    )
})
ChatLayout.displayName = 'ChatLayout'
