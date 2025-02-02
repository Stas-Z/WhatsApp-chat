import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'

import { chatReducer } from '@/entities/Chat'
import { errorReducer } from '@/entities/Error'
import { messageReducer } from '@/entities/Message'
import { noticeReducer } from '@/entities/Notice'
import { userReducer } from '@/entities/User'
import { newChatReducer } from '@/features/AddNewChat'
import { regReducer } from '@/features/AuthorizationForm'
import { rtkApi } from '@/shared/api/rtkApi'

import { StateSchema } from './StateSchema'

export function createReduxStore(initialState?: StateSchema) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer,
        chat: chatReducer,
        message: messageReducer,
        error: errorReducer,
        newChat: newChatReducer,
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
