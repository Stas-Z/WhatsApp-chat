import { memo, useCallback, useEffect } from 'react'

import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { AppImage } from '@/shared/ui/AppImage'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Skeleton } from '@/shared/ui/Skeleton'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './LoginForm.module.scss'
import { useLazyAuthByInstance } from '../../model/api/userAuthApi'
import {
    getIdInstance,
    getTokenInstance,
} from '../../model/selectors/getLoginState/getLoginState'
import { regActions } from '../../model/slice/regSlice'

export interface LoginFormProps {
    className?: string
}

const LoginForm = (props: LoginFormProps) => {
    const { className } = props

    const dispatch = useAppDispatch()
    const idInstance = useSelector(getIdInstance)
    const apiTokenInstance = useSelector(getTokenInstance)

    const [login, { isLoading, error }] = useLazyAuthByInstance()

    function getError() {
        if (error) {
            if ('data' in error) {
                return (error.data as { message?: string }).message || ''
            }
        }
    }
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
        login({ idInstance, apiTokenInstance })
    }, [apiTokenInstance, idInstance, login])

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                onClickLogin()
            }
        },
        [onClickLogin],
    )
    useEffect(() => {
        window.addEventListener('keydown', onKeyDown)

        return () => {
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [onKeyDown])

    const errorMessage = <Text text={getError()} variant="error" />

    return (
        <VStack
            gap="24"
            align="center"
            className={classNames(cls.loginForm, {}, [className])}
        >
            <VStack gap="16" max align="center">
                <AppImage
                    width={200}
                    src={'img/Logo_green.svg'}
                    fallback={<Skeleton width={200} height={43} />}
                />
            </VStack>
            {error && errorMessage}
            <VStack gap="16" max>
                <Input
                    autoFocus
                    type="text"
                    className={cls.input}
                    placeholder="Введите idInstance"
                    size="l"
                    onChange={onChangeInstance}
                    value={idInstance}
                />
                <Input
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
