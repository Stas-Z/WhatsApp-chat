import { JSX } from 'react'

import { Navigate, useLocation } from 'react-router-dom'

import { getRouteMain } from '@/shared/const/router'

interface RequireAuthProps {
    children: JSX.Element
}

export function RequireAuth(props: RequireAuthProps) {
    const { children } = props
    // const auth = useSelector(getUserAuthData)
    const auth = false
    const location = useLocation()

    if (!auth) {
        return (
            <Navigate to={getRouteMain()} state={{ from: location }} replace />
        )
    }

    return children
}
