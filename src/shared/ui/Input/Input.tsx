import React, {
    forwardRef,
    InputHTMLAttributes,
    memo,
    ReactNode,
    useState,
} from 'react'

import { Mods, classNames } from '@/shared/lib/classNames/classNames'

import cls from './Input.module.scss'
import { HStack } from '../Stack'
import { Text } from '../Text'

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly' | 'size'
>

type InputSize = 's' | 'm' | 'l'
type InputVariant = 'otlined' | 'normal'

interface InputProps extends HTMLInputProps {
    className?: string
    value?: string | number
    onChange?: (value: string) => void
    readonly?: boolean
    label?: string
    size?: InputSize
    variant?: InputVariant
    addonRight?: ReactNode
}

export const Input = memo(
    forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
        const {
            className,
            value,
            onChange,
            type = 'text',
            readonly,
            label,
            size = 'm',
            variant = 'otlined',
            addonRight,
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
            [cls.withAddonRight]: Boolean(addonRight),
        }

        const input = (
            <div
                className={classNames(cls.inputWrapper, mods, [
                    className,
                    cls[size],
                    cls[variant],
                ])}
            >
                <input
                    ref={ref}
                    type={type}
                    value={value}
                    onChange={onChangeHandler}
                    className={cls.input}
                    readOnly={readonly}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    {...otherProps}
                />
                {addonRight && (
                    <div className={cls.addonRight}>{addonRight}</div>
                )}
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
    }),
)
Input.displayName = 'Input'
