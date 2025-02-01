export const formatPhoneNumber = (phone: string) => {
    return phone.replace(/(\d+)@c\.us$/, '+$1')
}

export const unformatPhoneNumber = (phone: string) => {
    return phone.replace(/^(\+?)(\d+)$/, '$2@c.us')
}

export const onlyPhoneNumber = (phone: string) => {
    return phone.replace(/@c\.us$/, '')
}
