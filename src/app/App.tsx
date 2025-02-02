import { Suspense, useEffect } from 'react'

import { initAuthData } from '@/features/AuthorizationForm'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import AppRouter from './providers/router/ui/AppRouter'

export const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initAuthData())
    }, [dispatch])

    return (
        <div id="app" className="app">
            <Suspense fallback="">
                <AppRouter />
            </Suspense>
        </div>
    )
}
