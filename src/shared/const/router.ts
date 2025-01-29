export const AppRoutes = {
    MAIN_PAGE: 'main_page',
    CHAT_PAGE: 'chat_page',

    NOT_FOUND: 'not_found',
} as const

export type AppRoutesTypes = ValueOf<typeof AppRoutes>

export const getRouteMain = () => '/'
export const getRouteChat = () => '/chat'
