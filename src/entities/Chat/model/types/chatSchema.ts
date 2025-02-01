export interface Chat {
    chatId: string
    name?: string
    contactName?: string
    avatar?: string
}

export interface ChatSchema {
    allChats: Chat[]
    currentChat?: Chat
    phoneNumber: string
    messageValue: string
}
