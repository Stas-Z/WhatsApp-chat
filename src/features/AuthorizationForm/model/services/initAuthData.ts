import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import {
    API_TOKEN_INSTANCE,
    API_URL,
    USER_ID_INSTANCE,
} from '@/shared/const/localstorage'

import { getAuthByInstance } from '../api/userAuthApi'

export const initAuthData = createAsyncThunk<void, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (_, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI

        const apiUrl = localStorage.getItem(API_URL)
        const idInstance = localStorage.getItem(USER_ID_INSTANCE)
        const apiTokenInstance = localStorage.getItem(API_TOKEN_INSTANCE)

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
