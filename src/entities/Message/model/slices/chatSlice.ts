import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { MessageSchema } from '../types/message'

const initialState: MessageSchema = {
    messageValue: '',
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessageValue: (state, action: PayloadAction<string>) => {
            state.messageValue = action.payload
        },
    },
})

export const { actions: messageActions } = messageSlice
export const { reducer: messageReducer } = messageSlice
