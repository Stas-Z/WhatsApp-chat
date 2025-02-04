import { createSelector } from '@reduxjs/toolkit'

import { StateSchema } from '@/app/providers/StoreProvider'

export const getCurrentChat = (state: StateSchema) => state.chat.currentChat

export const getCurrentChatId = createSelector(
    [getCurrentChat],
    (currentChat) => currentChat?.chatId,
)
