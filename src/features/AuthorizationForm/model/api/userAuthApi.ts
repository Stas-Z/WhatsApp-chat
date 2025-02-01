import { userActions } from '@/entities/User'
import { rtkApi } from '@/shared/api/rtkApi'
import {
    API_TOKEN_INSTANCE,
    API_URL,
    USER_ID_INSTANCE,
} from '@/shared/const/localstorage'

import { AuthSchema } from '../types/AuthSchema'

export const userAuthApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        validateAuth: build.query<string, AuthSchema>({
            query: ({ apiUrl, idInstance, apiTokenInstance }) => ({
                url: `${apiUrl}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`,
                method: 'GET',
            }),
            onQueryStarted: async (
                { apiUrl, idInstance, apiTokenInstance },
                thunkAPI,
            ) => {
                const { dispatch, queryFulfilled } = thunkAPI
                try {
                    const { data } = await queryFulfilled
                    if (data && idInstance && apiTokenInstance) {
                        dispatch(
                            userActions.setUser({
                                apiUrl,
                                idInstance,
                                apiTokenInstance,
                            }),
                        )
                        localStorage.setItem(API_URL, apiUrl)
                        localStorage.setItem(USER_ID_INSTANCE, idInstance)
                        localStorage.setItem(
                            API_TOKEN_INSTANCE,
                            apiTokenInstance,
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
