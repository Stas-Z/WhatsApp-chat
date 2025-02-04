export const convertTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    const hours = date.getHours()
    const minutes = date.getMinutes()

    return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`
}

export const formatMessageDate = (timestamp: number | undefined) => {
    if (!timestamp) {
        return null
    }
    const messageDate = new Date(timestamp * 1000)
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)

    const isSameDay = (date1: Date, date2: Date) =>
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()

    if (isSameDay(messageDate, today)) {
        return 'Сегодня'
    }
    if (isSameDay(messageDate, yesterday)) {
        return 'Вчера'
    }

    return messageDate.toLocaleDateString('ru-RU') // Формат: ДД.ММ.ГГГГ
}
