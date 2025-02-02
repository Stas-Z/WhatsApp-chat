import { InputHTMLAttributes, memo, useState } from 'react'

import PhoneInput from 'react-phone-input-2'
import ru from 'react-phone-input-2/lang/ru.json'

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly' | 'size'
>

interface PhoneInputProps extends HTMLInputProps {
    onChange?: (value: string) => void
    value?: string
}

export const MyPhoneInput = memo((props: PhoneInputProps) => {
    const { onChange, value } = props

    const [isFocused, setIsFocused] = useState(false)

    const onBlur = () => setIsFocused(false)
    const onFocus = () => setIsFocused(true)

    return (
        <PhoneInput
            country={'ru'}
            value={value}
            onChange={onChange}
            enableSearch
            localization={ru}
            containerStyle={{}}
            inputStyle={{
                width: '100%',
                borderRadius: '16px',
                height: '38px',
                border: isFocused ? '1px solid #abffac' : '1px solid #3b9702',
                boxShadow: isFocused ? '0 0 5px 0 #3b9702' : 'none',
            }}
            buttonStyle={{
                borderTopLeftRadius: '16px',
                borderBottomLeftRadius: '16px',
                border: isFocused ? '1px solid #abffac' : '1px solid #3b9702',
            }}
            onBlur={onBlur}
            onFocus={onFocus}
        />
    )
})
MyPhoneInput.displayName = 'PhoneInput'
