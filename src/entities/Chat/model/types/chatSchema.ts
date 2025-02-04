export interface Chat {
    chatId: string
    name?: string
    contactName?: string
    avatar?: string
    timestamp?: number
}

export interface ChatSchema {
    currentChat?: Chat
}
