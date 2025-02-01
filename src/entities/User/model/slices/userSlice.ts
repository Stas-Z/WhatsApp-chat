import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
    API_TOKEN_INSTANCE,
    API_URL,
    USER_ID_INSTANCE,
} from '@/shared/const/localstorage'

import { User, UserSchema } from '../types/userSchema'

const initialState: UserSchema = {
    isAuth: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload
            state.isAuth = true
        },
        logout: (state) => {
            state.isAuth = false
            localStorage.removeItem(API_URL)
            localStorage.removeItem(USER_ID_INSTANCE)
            localStorage.removeItem(API_TOKEN_INSTANCE)
        },
    },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
