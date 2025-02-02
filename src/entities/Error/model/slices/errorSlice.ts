import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ErrorSchema } from '../types/error'

const initialState: ErrorSchema = {
    errorValue: '',
}

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorValue = action.payload
        },
    },
})

export const { actions: errorActions } = errorSlice
export const { reducer: errorReducer } = errorSlice
