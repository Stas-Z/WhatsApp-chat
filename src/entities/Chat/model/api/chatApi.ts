import { Chat } from '@/entities/Chat'
import { rtkApi } from '@/shared/api/rtkApi'

export interface GetContactsProps {
    idInstance?: string
    apiTokenInstance?: string
    chatId: number
}

export const chatApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getContactInfo: build.query<Chat, GetContactsProps>({
            query: ({ idInstance, apiTokenInstance, chatId }) => ({
                url: `/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
                method: 'POST',
                body: { chatId },
            }),
        }),
        getAvatar: build.query<Chat, GetContactsProps>({
            query: ({ idInstance, apiTokenInstance, chatId }) => ({
                url: `/waInstance${idInstance}/getAvatar/${apiTokenInstance}`,
                method: 'POST',
                body: { chatId },
            }),
        }),
    }),
})

export const useGetContact = chatApi.useGetContactInfoQuery
export const useGetAvatar = chatApi.useGetAvatarQuery
