export { ChatFooter } from './ui/ChatFooter/ChatFooter'

export { ChatList } from './ui/ChatList/ChatList'

export { ChatDetails } from './ui/ChatDetails'

export {
    getCurrentChat,
    getPhoneValue,
} from './model/selectors/getChatSelectors'

export { chatActions, chatReducer } from './model/slices/chatSlice'

export type { Chat, ChatSchema } from './model/types/chatSchema'
