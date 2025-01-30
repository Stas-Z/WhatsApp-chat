import { userActions } from '@/entities/User'
import { rtkApi } from '@/shared/api/rtkApi'
import {
    API_TOKEN_INSTANCE,
    USER_ID_INSTANCE,
} from '@/shared/const/localstorage'

import { AuthSchema } from '../types/AuthSchema'

export const userAuthApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        validateAuth: build.query<string, AuthSchema>({
            query: ({ idInstance, apiTokenInstance }) => ({
                url: `/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`,
                method: 'GET',
            }),
            onQueryStarted: async (
                { idInstance, apiTokenInstance },
                thunkAPI,
            ) => {
                const { dispatch, queryFulfilled } = thunkAPI
                try {
                    const { data } = await queryFulfilled
                    if (data && idInstance && apiTokenInstance) {
                        dispatch(
                            userActions.setUser({
                                idInstance,
                                apiTokenInstance,
                            }),
                        )
                        localStorage.setItem(
                            USER_ID_INSTANCE,
                            String(idInstance),
                        )
                        localStorage.setItem(
                            API_TOKEN_INSTANCE,
                            String(apiTokenInstance),
                        )
                    }
                } catch (err) {
                    console.error(err)
                    localStorage.removeItem(USER_ID_INSTANCE)
                    localStorage.removeItem(API_TOKEN_INSTANCE)
                }
            },
        }),
    }),
})

export const useAuthByInstance = userAuthApi.useValidateAuthQuery
export const useLazyAuthByInstance = userAuthApi.useLazyValidateAuthQuery

export const getAuthByInstance = userAuthApi.endpoints.validateAuth.initiate
