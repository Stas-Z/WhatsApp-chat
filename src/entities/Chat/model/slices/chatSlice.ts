import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Chat, ChatSchema } from '../types/chatSchema'

const initialState: ChatSchema = {}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChat: (state, action: PayloadAction<Chat>) => {
            state.currentChat = action.payload
        },
    },
})

export const { actions: chatActions } = chatSlice
export const { reducer: chatReducer } = chatSlice
