import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://1103.api.green-api.com',
    }),
    endpoints: (builder) => ({}),
})
