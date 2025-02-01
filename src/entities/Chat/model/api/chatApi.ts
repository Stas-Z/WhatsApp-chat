import { Chat } from '@/entities/Chat'
import { Message } from '@/entities/Message'
import { MessageType } from '@/entities/Message/model/types/message'
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
        getContactInfo: build.query<Chat, FetchProps>({
            query: ({ apiUrl, idInstance, apiTokenInstance, chatId }) => ({
                url: `${apiUrl}/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
                method: 'POST',
                body: { chatId },
            }),
        }),
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
                response.slice().reverse(),
        }),

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
            async onQueryStarted(
                { apiUrl, idInstance, apiTokenInstance, chatId, message },
                thunkAPI,
            ) {
                const { dispatch, queryFulfilled } = thunkAPI
                try {
                    const { data } = await queryFulfilled

                    if (data?.idMessage) {
                        dispatch(
                            chatApi.util.updateQueryData(
                                'getChatHistory',
                                {
                                    apiUrl,
                                    idInstance,
                                    apiTokenInstance,
                                    chatId,
                                },
                                (draft) => {
                                    draft.push({
                                        idMessage: data.idMessage,
                                        chatId,
                                        textMessage: message,
                                        type: MessageType.OUTGOING,
                                        timestamp: Date.now() / 1000,
                                    })
                                },
                            ),
                        )
                    }
                } catch (error) {
                    console.error('Ошибка при отправке сообщения:', error)
                }
            },
        }),
    }),
})

export const useGetContact = chatApi.useGetContactInfoQuery
export const useCheckWhatsapp = chatApi.useCheckWhatsappQuery
export const useGetChatHistory = chatApi.useGetChatHistoryQuery
export const useSendMessage = chatApi.useSendMessageMutation
