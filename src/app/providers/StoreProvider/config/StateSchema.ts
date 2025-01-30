import { ChatSchema } from '@/entities/Chat'
import { UserSchema } from '@/entities/User'
import { AuthSchema } from '@/features/AuthorizationForm'
import { rtkApi } from '@/shared/api/rtkApi'

import { createReduxStore } from './store'

export interface StateSchema {
    user: UserSchema
    chat: ChatSchema
    authForm: AuthSchema

    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}

export interface ThunkConfig<T> {
    rejectValue: T
    state: StateSchema
}

export type RootState = ReturnType<typeof createReduxStore>['getState']
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
