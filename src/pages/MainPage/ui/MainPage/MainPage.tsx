import { memo } from 'react'

import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import { getUserAuthData } from '@/entities/User'
import { LoginModal } from '@/features/AuthorizationForm'
import { getRouteChat } from '@/shared/const/router'
import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './MainPage.module.scss'

interface MainPageProps {
    className?: string
}

const MainPage = (props: MainPageProps) => {
    const { className } = props

    const location = useLocation()

    const authData = useSelector(getUserAuthData)

    if (authData) {
        return (
            <Navigate to={getRouteChat()} state={{ from: location }} replace />
        )
    }

    return (
        <div className={classNames(cls.mainPage, {}, [className])}>
            <LoginModal />
        </div>
    )
}

export default memo(MainPage)
