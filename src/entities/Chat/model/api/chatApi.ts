import { errorActions } from '@/entities/Error'
import { Message } from '@/entities/Message'
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
export interface FetchMessageProps extends FetchProps {
    idMessage?: string
}

export interface SendDeleteMessageProps extends FetchProps {
    receiptId: number
}

export const chatApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        checkWhatsapp: build.query<{ existsWhatsapp: boolean }, FetchProps>({
            query: ({ apiUrl, idInstance, apiTokenInstance, chatId }) => ({
                url: `${apiUrl}/waInstance${idInstance}/checkWhatsapp/${apiTokenInstance}`,
                method: 'POST',
                body: { phoneNumber: chatId },
            }),
        }),

        getChatHistory: build.query<Message[], FetchProps>({
            query: ({ apiUrl, idInstance, apiTokenInstance, chatId }) => ({
                url: `${apiUrl}/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
                method: 'POST',
                body: { chatId },
            }),
            transformResponse: (response: Message[]) =>
                response
                    .filter(
                        (message) =>
                            message.typeMessage === 'textMessage' ||
                            message.typeMessage === 'extendedTextMessage',
                    )
                    .slice()
                    .reverse(),

            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled
                    dispatch(errorActions.setErrorMessage(''))
                } catch (error) {
                    console.error('Ошибка загрузки истории чата:', error)
                    dispatch(
                        errorActions.setErrorMessage('Ошибка загрузки чата'),
                    )
                }
            },
        }),
    }),
})

export const useCheckWhatsapp = chatApi.useCheckWhatsappQuery
export const useGetChatHistory = chatApi.useGetChatHistoryQuery
export const useLazyGetChatHistory = chatApi.useLazyGetChatHistoryQuery
