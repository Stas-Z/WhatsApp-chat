import { createSelector } from '@reduxjs/toolkit'

import { StateSchema } from '@/app/providers/StoreProvider'

export const getUserData = (state: StateSchema) => state.user

export const getUserAuthData = createSelector(
    getUserData,
    (user) => user.isAuth,
)

export const getCurrentUser = createSelector(
    getUserData,
    (user) => user.currentUser,
)
export const getUserApiUrl = createSelector(
    getUserData,
    (user) => user.currentUser?.apiUrl,
)
export const getUserInstance = createSelector(
    getUserData,
    (user) => user.currentUser?.idInstance,
)
export const getUserToken = createSelector(
    getUserData,
    (user) => user.currentUser?.apiTokenInstance,
)
