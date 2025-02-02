import { deleteApiData, saveApiData } from '@/app/providers/indexedDB/indexedDB'
import { userActions } from '@/entities/User'
import { rtkApi } from '@/shared/api/rtkApi'

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

                        await saveApiData(apiUrl, idInstance, apiTokenInstance)
                    }
                } catch (err) {
                    console.error(err)
                    await deleteApiData()
                }
            },
        }),
    }),
})

export const useAuthByInstance = userAuthApi.useValidateAuthQuery
export const useLazyAuthByInstance = userAuthApi.useLazyValidateAuthQuery

export const getAuthByInstance = userAuthApi.endpoints.validateAuth.initiate
