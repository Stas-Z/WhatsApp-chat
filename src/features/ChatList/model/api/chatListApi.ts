import { Chat } from '@/entities/Chat'
import { rtkApi } from '@/shared/api/rtkApi'

export interface GetContactsProps {
    idInstance?: string
    apiTokenInstance?: string
}

export const chatListApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getContacts: build.query<Chat[], GetContactsProps>({
            query: ({ idInstance, apiTokenInstance }) => ({
                url: `/waInstance${idInstance}/getContacts/${apiTokenInstance}`,
                method: 'GET',
            }),
        }),
    }),
})

export const useGetPostList = chatListApi.useGetContactsQuery
