export const convertTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    const hours = date.getHours()
    const minutes = date.getMinutes()

    return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`
}
