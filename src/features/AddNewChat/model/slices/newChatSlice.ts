import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Chat } from '@/entities/Chat'

import { NewChatSchema } from '../types/newChatSchema'

const initialState: NewChatSchema = {
    phoneNumber: '',
    allChats: [],
}

export const newChatSlice = createSlice({
    name: 'newChat',
    initialState,
    reducers: {
        setPhone: (state, action: PayloadAction<string>) => {
            state.phoneNumber = action.payload
        },
        initChats: (state, action: PayloadAction<Chat[]>) => {
            state.allChats = action.payload
        },
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
    },
})

export const { actions: newChatActions } = newChatSlice
export const { reducer: newChatReducer } = newChatSlice
