import { createAsyncThunk } from '@reduxjs/toolkit'

import { getChats } from '@/app/providers/indexedDB/indexedDB'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Chat, chatActions } from '@/entities/Chat'

export const initAllChats = createAsyncThunk<Chat[], void, ThunkConfig<string>>(
    'newChat/initAllChats',
    async (_, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI

        try {
            const storedChats = await getChats()

            if (!storedChats.length) {
                return rejectWithValue('no chats data')
            }
            dispatch(chatActions.setCurrentChat(storedChats[0]))

            return storedChats
        } catch (e) {
            console.log(e)
            return rejectWithValue('error initAllChats')
        }
    },
)
