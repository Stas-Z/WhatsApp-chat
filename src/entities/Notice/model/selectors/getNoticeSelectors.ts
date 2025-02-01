import { createSelector } from '@reduxjs/toolkit'

import { StateSchema } from '@/app/providers/StoreProvider'

import { Notice } from '../types/notification'

export const getAllNotice = (state: StateSchema) => state.notice.newNotice

export const getNoticeById = (chatId: string | undefined) =>
    createSelector([getAllNotice], (allNotice: Notice[]) =>
        allNotice.find((notice) => notice.chatId === chatId),
    )
