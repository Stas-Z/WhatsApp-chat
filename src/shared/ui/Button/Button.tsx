import {
    ButtonHTMLAttributes,
    ForwardedRef,
    ReactNode,
    forwardRef,
} from 'react'

import { Mods, classNames } from '@/shared/lib/classNames/classNames'

import cls from './Button.module.scss'

export type ButtonVariant = 'clear' | 'outline' | 'filled'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    variant?: ButtonVariant
    square?: boolean
    disabled?: boolean
    children?: ReactNode
    fullWidth?: boolean
    addonLeft?: ReactNode
    addonRight?: ReactNode
    isLoading?: boolean
    color?: string
}

export const Button = forwardRef(
    (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
        const {
            className,
            children,
            variant = 'outline',
            square,
            disabled,
            fullWidth,
            addonLeft,
            addonRight,
            isLoading,
            color,
            ...otherProps
        } = props

        const mods: Mods = {
            [cls.disabled]: disabled,
            [cls.fullWidth]: fullWidth,
            [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
            [cls.disabled]: isLoading,
        }
        const addClass = [className, cls[variant], cls.normal]

        return (
            <button
                type="button"
                disabled={disabled}
                style={{ color: color }}
                className={classNames(cls.button, mods, addClass)}
                {...otherProps}
                ref={ref}
            >
                {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
                {children}
                {addonRight && (
                    <div className={cls.addonRight}>{addonRight}</div>
                )}
            </button>
        )
    },
)
Button.displayName = 'Button'
