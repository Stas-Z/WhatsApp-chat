import { memo, useCallback } from 'react'

import { useSelector } from 'react-redux'

import { chatActions } from '@/entities/Chat'
import { getPhoneValue } from '@/entities/Chat'
import { classNames } from '@/shared/lib/classNames/classNames'
import { unformatPhoneNumber } from '@/shared/lib/helpers/formatPhoneNumber/formatPhoneNumber'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useEnterKey } from '@/shared/lib/hooks/useEnterKey/useEnterKey'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './AddNewForm.module.scss'

export interface AddNewFormProps {
    className?: string
    onClose: () => void
}

const AddNewForm = (props: AddNewFormProps) => {
    const { className, onClose } = props
    const dispatch = useAppDispatch()

    const phoneNumber = useSelector(getPhoneValue)

    const onChangePhone = useCallback(
        (value: string) => {
            dispatch(chatActions.setPhone(value))
        },
        [dispatch],
    )

    const onClickNewChat = useCallback(() => {
        dispatch(
            chatActions.setToChats({
                chatId: unformatPhoneNumber(phoneNumber),
            }),
        )
        dispatch(chatActions.setPhone(''))
        onClose()
    }, [dispatch, onClose, phoneNumber])

    useEnterKey(onClickNewChat)

    return (
        <VStack
            gap="16"
            className={classNames(cls.addNewForm, {}, [className])}
            align="center"
        >
            <Text
                title="Введите номер собиседника"
                size="s"
                bold
                variant="primary"
            />
            <Input
                autoFocus
                type="text"
                className={cls.input}
                placeholder="Номер телефона"
                onChange={onChangePhone}
                value={phoneNumber}
            />

            <Button className={cls.button} onClick={onClickNewChat}>
                Начать
            </Button>
        </VStack>
    )
}

export default memo(AddNewForm)
