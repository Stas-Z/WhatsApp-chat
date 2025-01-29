import { ChatPage } from '@/pages/ChatPage'
import { MainPage } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import {
    AppRoutes,
    AppRoutesTypes,
    getRouteChat,
    getRouteMain,
} from '@/shared/const/router'
import { AppRoutesProps } from '@/shared/types/router'

export const routeConfig: Record<AppRoutesTypes, AppRoutesProps> = {
    [AppRoutes.MAIN_PAGE]: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    [AppRoutes.CHAT_PAGE]: {
        path: getRouteChat(),
        element: <ChatPage />,
        authOnly: true,
    },

    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
}
