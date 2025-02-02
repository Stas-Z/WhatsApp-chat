import { Chat, chatActions } from '@/entities/Chat'
import { errorActions } from '@/entities/Error'
import { rtkApi } from '@/shared/api/rtkApi'
import { onlyPhoneNumber } from '@/shared/lib/helpers/formatPhoneNumber/formatPhoneNumber'

import { newChatActions } from '../slices/newChatSlice'

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

export const newChatApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        checkWhatsapp: build.query<{ existsWhatsapp: boolean }, FetchProps>({
            query: ({ apiUrl, idInstance, apiTokenInstance, chatId }) => ({
                url: `${apiUrl}/waInstance${idInstance}/checkWhatsapp/${apiTokenInstance}`,
                method: 'POST',
                body: { phoneNumber: chatId },
            }),
        }),
        getContactInfo: build.query<Chat, FetchProps>({
            query: ({ apiUrl, idInstance, apiTokenInstance, chatId }) => ({
                url: `${apiUrl}/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
                method: 'POST',
                body: { chatId },
            }),
            async onQueryStarted(
                { apiUrl, idInstance, apiTokenInstance },
                thunkAPI,
            ) {
                const { dispatch, queryFulfilled } = thunkAPI
                try {
                    const { data } = await queryFulfilled

                    if (data) {
                        const { chatId, avatar, contactName, name } = data

                        const checkResponse = await dispatch(
                            newChatApi.endpoints.checkWhatsapp.initiate({
                                apiUrl,
                                idInstance,
                                apiTokenInstance,
                                chatId: onlyPhoneNumber(chatId),
                            }),
                        ).unwrap()

                        if (!checkResponse.existsWhatsapp) {
                            dispatch(
                                errorActions.setErrorMessage(
                                    'Этот номер не зарегистрирован в WhatsApp',
                                ),
                            )
                            console.error(
                                'Этот номер не зарегистрирован в WhatsApp!',
                            )
                            return
                        }
                        dispatch(errorActions.setErrorMessage(''))
                        dispatch(
                            newChatActions.setToChats({
                                chatId,
                                avatar,
                                contactName,
                                name,
                            }),
                        )
                        dispatch(
                            chatActions.setCurrentChat({
                                chatId,
                                avatar: avatar || undefined,
                                contactName,
                                name,
                            }),
                        )
                    }
                } catch (error) {
                    console.error(
                        'Ошибка обработки receiveNotification:',
                        error,
                    )
                }
            },
        }),
    }),
})

export const useLazyGetContact = newChatApi.useLazyGetContactInfoQuery
