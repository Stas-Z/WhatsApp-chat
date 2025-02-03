import { memo, useCallback, useRef } from 'react'

import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useEnterKey } from '@/shared/lib/hooks/useEnterKey/useEnterKey'
import { AppImage } from '@/shared/ui/AppImage'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Loader } from '@/shared/ui/Loader'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './LoginForm.module.scss'
import { useLazyAuthByInstance } from '../../model/api/userAuthApi'
import {
    getApiUrl,
    getIdInstance,
    getTokenInstance,
} from '../../model/selectors/getLoginState/getLoginState'
import { regActions } from '../../model/slice/regSlice'

export interface LoginFormProps {
    className?: string
}

const LoginForm = (props: LoginFormProps) => {
    const { className } = props

    const inputRef = useRef<HTMLInputElement>(null)

    const dispatch = useAppDispatch()
    const apiUrl = useSelector(getApiUrl)
    const idInstance = useSelector(getIdInstance)
    const apiTokenInstance = useSelector(getTokenInstance)

    const [login, { isLoading, isError }] = useLazyAuthByInstance()

    const onChangeApiUrl = useCallback(
        (value: string) => {
            dispatch(regActions.setApiUrl(value))
        },
        [dispatch],
    )
    const onChangeInstance = useCallback(
        (value: string) => {
            dispatch(regActions.setIdInstance(value))
        },
        [dispatch],
    )

    const onChangeToken = useCallback(
        (value: string) => {
            dispatch(regActions.setTokenInstance(value))
        },
        [dispatch],
    )

    const onClickLogin = useCallback(async () => {
        login({ apiUrl, idInstance, apiTokenInstance })
    }, [apiTokenInstance, apiUrl, idInstance, login])

    useEnterKey(onClickLogin, inputRef)

    return (
        <VStack
            gap="24"
            align="center"
            className={classNames(cls.loginForm, {}, [className])}
        >
            <VStack gap="16" max align="center" className={cls.logo}>
                <AppImage
                    width={200}
                    src={'img/Logo_green.svg'}
                    fallback={<Loader />}
                />
            </VStack>
            {isError && (
                <Text text="Вы ввели неправильные данные!" variant="error" />
            )}
            <VStack gap="16" max>
                <Input
                    ref={inputRef}
                    autoFocus
                    type="text"
                    className={cls.input}
                    placeholder="Введите apiUrl"
                    size="l"
                    onChange={onChangeApiUrl}
                    value={apiUrl}
                />
                <Input
                    ref={inputRef}
                    autoFocus
                    type="text"
                    className={cls.input}
                    placeholder="Введите idInstance"
                    size="l"
                    onChange={onChangeInstance}
                    value={idInstance}
                />
                <Input
                    ref={inputRef}
                    type="password"
                    className={cls.input}
                    placeholder="Введите apiTokenInstance"
                    size="l"
                    onChange={onChangeToken}
                    value={apiTokenInstance}
                />
            </VStack>
            <HStack max justify="end">
                <Button
                    onClick={onClickLogin}
                    variant="filled"
                    className={cls.loginBtn}
                    disabled={isLoading}
                    isLoading={isLoading}
                >
                    Войти
                </Button>
            </HStack>
        </VStack>
    )
}

export default memo(LoginForm)
