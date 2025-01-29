import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './ChatPage.module.scss'

interface ChatPageProps {
    className?: string
}

const ChatPage = (props: ChatPageProps) => {
    const { className } = props

    return (
        <div className={classNames(cls.chatPage, {}, [className])}>
            <div />
        </div>
    )
}

export default memo(ChatPage)
