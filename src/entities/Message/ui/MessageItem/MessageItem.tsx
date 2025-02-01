import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { convertTime } from '@/shared/lib/helpers/convertTime/convertTime'
import { HStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './MessageItem.module.scss'
import { Message, MessageType } from '../../model/types/message'

interface MessageItemProps {
    className?: string
    message: Message
}

export const MessageItem = memo((props: MessageItemProps) => {
    const { className, message } = props
    const incoming = message.type === MessageType.INCOMING

    return (
        <div className={classNames(cls.message, {}, [className])}>
            <HStack
                justify={incoming ? 'start' : 'end'}
                className={cls.messageWrapper}
            >
                <div
                    className={classNames(
                        cls.messageBlock,
                        { [cls.incoming]: incoming },
                        [],
                    )}
                >
                    <div className={cls.textBlock}>
                        <Text
                            text={message.textMessage}
                            size="s"
                            className={cls.text}
                        />
                        <Text
                            text={convertTime(message.timestamp)}
                            size="xs"
                            variant="grey"
                            className={cls.time}
                        />
                    </div>
                </div>
            </HStack>
        </div>
    )
})
MessageItem.displayName = 'Message'
