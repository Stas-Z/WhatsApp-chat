import React, { InputHTMLAttributes, memo, useState } from 'react'

import { Mods, classNames } from '@/shared/lib/classNames/classNames'

import cls from './Input.module.scss'
import { HStack } from '../Stack'
import { Text } from '../Text'

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly' | 'size'
>

type InputSize = 's' | 'm' | 'l'

interface InputProps extends HTMLInputProps {
    className?: string
    value?: string | number
    onChange?: (value: string) => void
    readonly?: boolean
    label?: string
    size?: InputSize
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        readonly,
        label,
        size = 'm',
        ...otherProps
    } = props

    const [isFocused, setIsFocused] = useState(false)

    const onBlur = () => {
        setIsFocused(false)
    }

    const onFocus = () => {
        setIsFocused(true)
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
    }

    const mods: Mods = {
        [cls.readonly]: readonly,
        [cls.focused]: isFocused,
    }

    const input = (
        <div
            className={classNames(cls.inputWrapper, mods, [
                className,
                cls[size],
            ])}
        >
            <input
                type={type}
                value={value}
                onChange={onChangeHandler}
                className={cls.input}
                readOnly={readonly}
                onBlur={onBlur}
                onFocus={onFocus}
                {...otherProps}
            />
        </div>
    )

    if (label) {
        return (
            <HStack max gap="8">
                <Text text={label} />
                {input}
            </HStack>
        )
    }

    return input
})
Input.displayName = 'Input'
