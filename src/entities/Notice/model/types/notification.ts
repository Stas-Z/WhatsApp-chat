export interface NoticeResponse {
    receiptId: number
    body: {
        timestamp: number
        idMessage: string
        senderData: {
            chatId: string
            chatName: string
        }
        messageData: {
            typeMessage: string
            textMessageData: {
                textMessage: string
            }
        }
    }
}

export interface Notice {
    timestamp: string
    chatId: string
    textMessage: string
}
export interface NoticeSchema {
    newNotice: Notice[]
}
