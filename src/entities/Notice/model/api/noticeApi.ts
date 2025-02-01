import { StateSchema } from '@/app/providers/StoreProvider'
import { chatApi } from '@/entities/Chat/model/api/chatApi'
import { MessageType } from '@/entities/Message/model/types/message'
import { NoticeResponse } from '@/entities/Notice/model/types/notification'
import { rtkApi } from '@/shared/api/rtkApi'
import { convertTime } from '@/shared/lib/helpers/convertTime/convertTime'

import { noticeActions } from '../slices/noticeSlice'

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
        deleteNotification: build.mutation<void, DeleteNoticeProps>({
            query: ({ apiUrl, idInstance, apiTokenInstance, receiptId }) => ({
                url: `${apiUrl}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
                method: 'DELETE',
            }),
        }),
        receiveNotification: build.query<NoticeResponse, fetchNoticeProps>({
            query: ({ apiUrl, idInstance, apiTokenInstance }) => ({
                url: `${apiUrl}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=60`,
                method: 'GET',
            }),
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
                        const allChats = state.chat.allChats

                        if (
                            chatId &&
                            allChats.some((chat) => chat.chatId === chatId)
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
                                        draft.push({
                                            idMessage,
                                            chatId,
                                            textMessage,
                                            type: MessageType.INCOMING,
                                            timestamp: Date.now() / 1000,
                                        })
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
