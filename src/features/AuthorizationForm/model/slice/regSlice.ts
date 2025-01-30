import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { AuthSchema } from '../types/AuthSchema'

export const initialState: AuthSchema = {
    idInstance: '',
    apiTokenInstance: '',
}

export const regSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
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
