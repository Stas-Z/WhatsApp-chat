import { StateSchema } from '@/app/providers/StoreProvider'

export const getPhoneValue = (state: StateSchema) => state.newChat.phoneNumber

export const getAllChats = (state: StateSchema) => state.newChat.allChats
