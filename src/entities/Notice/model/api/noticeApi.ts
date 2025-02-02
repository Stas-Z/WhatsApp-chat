import { StateSchema } from '@/app/providers/StoreProvider'
import { chatApi } from '@/entities/Chat'
import { MessageType } from '@/entities/Message'
import { rtkApi } from '@/shared/api/rtkApi'
import { convertTime } from '@/shared/lib/helpers/convertTime/convertTime'

import { noticeActions } from '../slices/noticeSlice'
import { NoticeResponse } from '../types/notification'

interface fetchNoticeProps {
    idInstance?: string
    apiTokenInstance?: string
    apiUrl?: string
}
interface DeleteNoticeProps extends fetchNoticeProps {
    receiptId: number
}

export const noticeApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        deleteNotification: build.mutation<
            { result: string },
            DeleteNoticeProps
        >({
            query: ({ apiUrl, idInstance, apiTokenInstance, receiptId }) => ({
                url: `${apiUrl}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
                method: 'DELETE',
            }),
            async onQueryStarted(
                { idInstance, apiTokenInstance, apiUrl },
                thunkAPI,
            ) {
                const { dispatch, queryFulfilled, getState } = thunkAPI
                try {
                    const { data } = await queryFulfilled
                    if (data) {
                        // После успешного удаления выполняем receiveNotification
                        await dispatch(
                            noticeApi.endpoints.receiveNotification.initiate(
                                {
                                    apiUrl,
                                    idInstance,
                                    apiTokenInstance,
                                },
                                { forceRefetch: true },
                            ),
                        ).unwrap()
                    }
                } catch (error) {
                    console.error('Ошибка при удалении уведомления:', error)
                }
            },
        }),
        receiveNotification: build.query<NoticeResponse, fetchNoticeProps>({
            query: ({ apiUrl, idInstance, apiTokenInstance }) => ({
                url: `${apiUrl}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=60`,
                method: 'GET',
            }),
            keepUnusedDataFor: 0,
            async onQueryStarted(
                { idInstance, apiTokenInstance, apiUrl },
                thunkAPI,
            ) {
                const { dispatch, queryFulfilled, getState } = thunkAPI
                try {
                    const { data } = await queryFulfilled

                    if (data) {
                        const { receiptId, body } = data
                        const chatId = body.senderData?.chatId
                        const timestamp = body.timestamp
                        const idMessage = body.idMessage
                        const textMessage =
                            body.messageData?.textMessageData?.textMessage

                        const state = getState() as StateSchema
                        const allChats = state.newChat.allChats

                        if (
                            chatId &&
                            allChats.some((chat) => chat.chatId === chatId) &&
                            data.body.messageData.typeMessage === 'textMessage'
                        ) {
                            dispatch(
                                noticeActions.setToNotice({
                                    timestamp: convertTime(timestamp),
                                    chatId,
                                    textMessage,
                                }),
                            )
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
                                                    msg.idMessage === idMessage,
                                            )
                                        ) {
                                            draft.push({
                                                idMessage,
                                                chatId,
                                                textMessage,
                                                type: MessageType.INCOMING,
                                                timestamp: Date.now() / 1000,
                                            })
                                        }
                                    },
                                ),
                            )
                        }

                        await dispatch(
                            noticeApi.endpoints.deleteNotification.initiate({
                                apiUrl,
                                idInstance,
                                apiTokenInstance,
                                receiptId,
                            }),
                        ).unwrap()

                        // await dispatch(
                        //     noticeApi.endpoints.receiveNotification.initiate(
                        //         {
                        //             apiUrl,
                        //             idInstance,
                        //             apiTokenInstance,
                        //         },
                        //         { forceRefetch: true },
                        //     ),
                        // ).unwrap()
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

export const usReceiveNotification = noticeApi.useReceiveNotificationQuery
