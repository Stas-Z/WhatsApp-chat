import { createSelector } from '@reduxjs/toolkit'

import { StateSchema } from '@/app/providers/StoreProvider'

import { initialState } from '../../slice/regSlice'

export const getLoginState = (state: StateSchema) =>
    state?.authForm || initialState

export const getApiUrl = createSelector(
    getLoginState,
    (authForm) => authForm.apiUrl,
)
export const getIdInstance = createSelector(
    getLoginState,
    (authForm) => authForm.idInstance,
)

export const getTokenInstance = createSelector(
    getLoginState,
    (authForm) => authForm.apiTokenInstance,
)
