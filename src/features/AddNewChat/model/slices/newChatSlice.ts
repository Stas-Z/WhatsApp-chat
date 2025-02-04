import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Chat } from '@/entities/Chat'

import { initAllChats } from '../services/initAllChats'
import { NewChatSchema } from '../types/newChatSchema'

const initialState: NewChatSchema = {
    phoneNumber: '',
    allChats: [],
    isLoading: false,
    error: '',
    _inited: false,
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
    extraReducers(builder) {
        builder
            .addCase(initAllChats.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(
                initAllChats.fulfilled,
                (state, action: PayloadAction<Chat[]>) => {
                    state.allChats = action.payload
                    state.isLoading = false
                    state._inited = true
                },
            )
            .addCase(initAllChats.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { actions: newChatActions } = newChatSlice
export const { reducer: newChatReducer } = newChatSlice
