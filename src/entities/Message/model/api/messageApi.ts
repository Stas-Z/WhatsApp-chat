import { rtkApi } from '@/shared/api/rtkApi'

export interface FetchProps {
    idInstance?: string
    apiTokenInstance?: string
    chatId?: string
    apiUrl?: string
}
export interface SendMessageProps extends FetchProps {
    message: string
}
export interface GetMessageProps extends FetchProps {
    minutes: number
}

export const messageApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        sendMessage: build.mutation<{ idMessage: string }, SendMessageProps>({
            query: ({
                apiUrl,
                idInstance,
                apiTokenInstance,
                chatId,
                message,
            }) => ({
                url: `${apiUrl}/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
                method: 'POST',
                body: {
                    chatId,
                    message,
                },
            }),
        }),
    }),
})

export const useSendMessage = messageApi.useSendMessageMutation
