export { chatApi } from './model/api/chatApi'

export { useGetChatHistory, useLazyGetChatHistory } from './model/api/chatApi'

export { ChatList } from './ui/ChatList/ChatList'

export {
    getCurrentChat,
    getCurrentChatId,
} from './model/selectors/getChatSelectors'

export { chatActions, chatReducer } from './model/slices/chatSlice'

export type { Chat, ChatSchema } from './model/types/chatSchema'
