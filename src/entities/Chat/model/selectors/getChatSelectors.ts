import { StateSchema } from '@/app/providers/StoreProvider'

export const getCurrentChat = (state: StateSchema) => state.chat.currentChat

export const getCurrentChatId = (state: StateSchema) =>
    state.chat.currentChat?.chatId
