import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Notice, NoticeSchema } from '../types/notification'

const initialState: NoticeSchema = {
    newNotice: [],
}

export const noticeSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setToNotice: (state, action: PayloadAction<Notice>) => {
            const notice = state.newNotice.find(
                (notice) => notice.chatId === action.payload.chatId,
            )
            if (notice) {
                notice.textMessage = action.payload.textMessage
            } else {
                state.newNotice.push({ ...action.payload })
            }
        },

        deleteNotice: (state, action: PayloadAction<Notice>) => {
            state.newNotice = state.newNotice.filter(
                (notice) => notice.chatId !== action.payload.chatId,
            )
        },
    },
})

export const { actions: noticeActions } = noticeSlice
export const { reducer: noticeReducer } = noticeSlice
