import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Chat, ChatSchema } from '../types/chatSchema'

const initialState: ChatSchema = {
    allChats: [],
    phoneNumber: '',
    messageValue: '',
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setToChats: (state, action: PayloadAction<Chat>) => {
            const existingChat = state.allChats.find(
                (chat) => chat.chatId === action.payload.chatId,
            )

            if (!existingChat) {
                state.allChats.push({ ...action.payload })
            }
        },
        deleteChat: (state, action: PayloadAction<Chat>) => {
            state.allChats = state.allChats.filter(
                (chat) => chat.chatId !== action.payload.chatId,
            )
        },
        setChat: (state, action: PayloadAction<Chat>) => {
            state.currentChat = action.payload
        },
        setPhone: (state, action: PayloadAction<string>) => {
            state.phoneNumber = action.payload
        },
        setMessageValue: (state, action: PayloadAction<string>) => {
            state.messageValue = action.payload
        },
    },
})

export const { actions: chatActions } = chatSlice
export const { reducer: chatReducer } = chatSlice
