import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'

import { chatReducer } from '@/entities/Chat'
import { noticeReducer } from '@/entities/Notice'
import { userReducer } from '@/entities/User'
import { regReducer } from '@/features/AuthorizationForm'
import { rtkApi } from '@/shared/api/rtkApi'

import { StateSchema } from './StateSchema'

export function createReduxStore(initialState?: StateSchema) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer,
        chat: chatReducer,
        notice: noticeReducer,
        authForm: regReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    }

    const store = configureStore({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(rtkApi.middleware),
    })

    return store
}
