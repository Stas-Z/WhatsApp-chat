export const MessageType = {
    OUTGOING: 'outgoing',
    INCOMING: 'incoming',
} as const

export type MessageTypes = ValueOf<typeof MessageType>

export interface Message {
    chatId?: string
    typeMessage?: string
    textMessage?: string
    type: MessageTypes
    timestamp: number
    idMessage: string
}

export interface MessageSchema {
    messageValue: string
}
