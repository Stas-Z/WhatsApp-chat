import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Text.module.scss'

export type TextVariant =
    | 'normal'
    | 'primary'
    | 'error'
    | 'grey'
    | 'white'
    | 'succes'

export type TextAlign = 'right' | 'left' | 'center'

export type TextSize = 'xs' | 's' | 'm' | 'l'

interface TextProps {
    className?: string
    title?: string
    text?: string
    variant?: TextVariant
    align?: TextAlign
    size?: TextSize
    bold?: boolean
    lighter?: boolean
    ellipsis?: boolean
}

type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4'

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    xs: 'h4',
    s: 'h3',
    m: 'h2',
    l: 'h1',
}
const mapSizeToClass: Record<TextSize, string> = {
    xs: 'size_xs',
    s: 'size_s',
    m: 'size_m',
    l: 'size_l',
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        text,
        title,
        variant = 'normal',
        align = 'left',
        size = 'm',
        bold,
        lighter,
        ellipsis,
    } = props

    const HeaderTag = mapSizeToHeaderTag[size]
    const sizeClass = mapSizeToClass[size]

    const additionalClasses = [
        className,
        cls[variant],
        cls[align],
        cls[sizeClass],
    ]

    return (
        <div
            className={classNames(
                cls.text,
                {
                    [cls.bold]: bold,
                    [cls.lighter]: lighter,
                },
                additionalClasses,
            )}
        >
            {title && <HeaderTag className={cls.title}>{title}</HeaderTag>}
            {text && (
                <p
                    className={classNames(
                        cls.text,
                        { [cls.ellipsis]: ellipsis },
                        [],
                    )}
                >
                    {text}
                </p>
            )}
        </div>
    )
})

Text.displayName = 'Text'
