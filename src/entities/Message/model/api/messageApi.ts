import { chatApi } from '@/entities/Chat'
import { rtkApi } from '@/shared/api/rtkApi'

import { MessageType } from '../types/message'

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
                                    if (
                                        !draft.some(
                                            (msg) =>
                                                msg.idMessage ===
                                                data.idMessage,
                                        )
                                    ) {
                                        draft.push({
                                            idMessage: data.idMessage,
                                            chatId,
                                            textMessage: message,
                                            type: MessageType.OUTGOING,
                                            timestamp: Date.now() / 1000,
                                        })
                                    }
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

export const useSendMessage = messageApi.useSendMessageMutation
