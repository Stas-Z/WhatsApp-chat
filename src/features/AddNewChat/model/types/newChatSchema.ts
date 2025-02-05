import { Chat } from '@/entities/Chat'

export interface NewChatSchema {
    phoneNumber: string
    allChats: Chat[]
    isLoading?: boolean
    error?: string

    _inited: boolean
}
