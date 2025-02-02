export interface Chat {
    chatId: string
    name?: string
    contactName?: string
    avatar?: string
}

export interface ChatSchema {
    currentChat?: Chat
}
