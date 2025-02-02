import { Chat } from '@/entities/Chat'

export interface NewChatSchema {
    phoneNumber: string
    allChats: Chat[]
}
