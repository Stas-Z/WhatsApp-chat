export interface Chat {
    id: number
    name: string
    urlAvatar?: string
}

export interface ChatSchema {
    currentChat?: Chat
}
