import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { getAuthByInstance } from '@/features/AuthorizationForm'
import {
    API_TOKEN_INSTANCE,
    USER_ID_INSTANCE,
} from '@/shared/const/localstorage'

export const initAuthData = createAsyncThunk<void, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (_, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI

        const idInstance = localStorage.getItem(USER_ID_INSTANCE)
        const apiTokenInstance = localStorage.getItem(API_TOKEN_INSTANCE)

        if (!idInstance || !apiTokenInstance) {
            return rejectWithValue('no user data')
        }

        try {
            await dispatch(getAuthByInstance({ idInstance, apiTokenInstance }))

            return
        } catch (e) {
            console.log(e)
            return rejectWithValue('error initAuthData')
        }
    },
)
