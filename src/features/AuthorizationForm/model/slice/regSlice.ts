import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { AuthSchema } from '../types/AuthSchema'

export const initialState: AuthSchema = {
    apiUrl: '',
    idInstance: '',
    apiTokenInstance: '',
}

export const regSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setApiUrl: (state, action: PayloadAction<string>) => {
            state.apiUrl = action.payload
        },
        setIdInstance: (state, action: PayloadAction<string>) => {
            state.idInstance = action.payload
        },
        setTokenInstance: (state, action: PayloadAction<string>) => {
            state.apiTokenInstance = action.payload
        },
    },
})

export const { actions: regActions } = regSlice
export const { reducer: regReducer } = regSlice
