import { Middleware } from '@reduxjs/toolkit'

import { AppDispatch, StateSchema } from '@/app/providers/StoreProvider'
import { chatApi } from '@/entities/Chat'
import { messageApi, MessageType } from '@/entities/Message'

interface Store {
    dispatch: AppDispatch
    getState: () => StateSchema
}

export const messageMiddleware: Middleware =
    (store: Store) => (next) => async (action) => {
        if (messageApi.endpoints.sendMessage.matchFulfilled(action)) {
            const { idMessage } = action.payload
            const { apiUrl, idInstance, apiTokenInstance, chatId, message } =
                action.meta.arg.originalArgs

            if (idMessage) {
                store.dispatch(
                    chatApi.util.updateQueryData(
                        'getChatHistory',
                        { apiUrl, idInstance, apiTokenInstance, chatId },
                        (draft) => {
                            if (
                                !draft.some(
                                    (msg) => msg.idMessage === idMessage,
                                )
                            ) {
                                draft.push({
                                    idMessage,
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
        }

        return next(action)
    }
