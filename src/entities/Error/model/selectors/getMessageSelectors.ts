import { StateSchema } from '@/app/providers/StoreProvider'

export const getErrorValue = (state: StateSchema) => state.error.errorValue
