import { StateSchema } from '@/app/providers/StoreProvider'

export const getMessageValue = (state: StateSchema) =>
    state.message.messageValue
