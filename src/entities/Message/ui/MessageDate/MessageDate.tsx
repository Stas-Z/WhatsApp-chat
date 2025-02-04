import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './MessageDate.module.scss'

interface MessageDateProps {
    className?: string
    messageDate?: string | null
}

export const MessageDate = memo((props: MessageDateProps) => {
    const { className, messageDate } = props

    if (!messageDate) {
        return
    }

    return (
        <div className={classNames(cls.messageDate, {}, [className])}>
            <HStack justify="center">
                <div className={cls.messageBlock}>
                    <div className={cls.textBlock}>
                        <Text
                            text={messageDate}
                            size="s"
                            className={cls.text}
                            variant="grey"
                        />
                    </div>
                </div>
            </HStack>
        </div>
    )
})
MessageDate.displayName = 'MessageDate'
