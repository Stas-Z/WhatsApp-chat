import { memo, useCallback, useEffect } from 'react'

import { useSelector } from 'react-redux'

import { getUserApiUrl, getUserInstance, getUserToken } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { unformatPhoneNumber } from '@/shared/lib/helpers/formatPhoneNumber/formatPhoneNumber'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button } from '@/shared/ui/Button'
import { MyPhoneInput } from '@/shared/ui/PhoneInput'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './AddNewForm.module.scss'
import { useLazyGetContact } from '../../model/api/newChatApi'
import { getPhoneValue } from '../../model/selectors/getChatSelectors'
import { newChatActions } from '../../model/slices/newChatSlice'

export interface AddNewFormProps {
    className?: string
    onClose: () => void
}

const AddNewForm = (props: AddNewFormProps) => {
    const { className, onClose } = props
    const dispatch = useAppDispatch()

    const phoneNumber = useSelector(getPhoneValue)
    const idInstance = useSelector(getUserInstance)
    const apiTokenInstance = useSelector(getUserToken)
    const apiUrl = useSelector(getUserApiUrl)

    const [getContact] = useLazyGetContact()

    const onChangePhone = useCallback(
        (value: string) => {
            dispatch(newChatActions.setPhone(value))
        },
        [dispatch],
    )

    const onClickNewChat = useCallback(() => {
        getContact({
            apiTokenInstance,
            apiUrl,
            chatId: unformatPhoneNumber(phoneNumber),
            idInstance,
        })

        dispatch(newChatActions.setPhone(''))
        onClose()
    }, [
        apiTokenInstance,
        apiUrl,
        dispatch,
        getContact,
        idInstance,
        onClose,
        phoneNumber,
    ])

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                onClickNewChat()
            }
        },
        [onClickNewChat],
    )
    useEffect(() => {
        window.addEventListener('keydown', onKeyDown)

        return () => {
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [onKeyDown])

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
            <MyPhoneInput onChange={onChangePhone} value={phoneNumber} />

            <Button className={cls.button} onClick={onClickNewChat}>
                Начать
            </Button>
        </VStack>
    )
}

export default memo(AddNewForm)
