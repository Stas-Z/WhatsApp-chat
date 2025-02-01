import { StateSchema } from '@/app/providers/StoreProvider'

export const getCurrentChat = (state: StateSchema) => state.chat.currentChat

export const getCurrentChatId = (state: StateSchema) =>
    state.chat.currentChat?.chatId

export const getPhoneValue = (state: StateSchema) => state.chat.phoneNumber

export const getAllChats = (state: StateSchema) => state.chat.allChats

export const getMessageValue = (state: StateSchema) => state.chat.messageValue
