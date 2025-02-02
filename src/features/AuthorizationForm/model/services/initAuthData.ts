import { createAsyncThunk } from '@reduxjs/toolkit'

import { getApiData, getChats } from '@/app/providers/indexedDB/indexedDB'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { chatActions } from '@/entities/Chat'
// eslint-disable-next-line
import { newChatActions } from '@/features/AddNewChat'

import { getAuthByInstance } from '../api/userAuthApi'

export const initAuthData = createAsyncThunk<void, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (_, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI

        const storedData = await getApiData()
        const storedChats = await getChats()

        dispatch(newChatActions.initChats(storedChats))
        if (storedChats.length) {
            dispatch(chatActions.setCurrentChat(storedChats[0]))
        }

        const apiUrl = storedData.apiUrl
        const idInstance = storedData.userId
        const apiTokenInstance = storedData.apiToken

        if (!apiUrl || !idInstance || !apiTokenInstance) {
            return rejectWithValue('no user data')
        }

        try {
            await dispatch(
                getAuthByInstance({ apiUrl, idInstance, apiTokenInstance }),
            )

            return
        } catch (e) {
            console.log(e)
            return rejectWithValue('error initAuthData')
        }
    },
)
