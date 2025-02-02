import { memo } from 'react'

import { UserChatsList } from '@/features/AddNewChat'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack'

import cls from './Sidebar.module.scss'
import { SidebarFooter } from '../SidebarFooter/SidebarFooter'
import { SidebarHeader } from '../SidebarHeader/SidebarHeader'

interface SidebarProps {
    className?: string
}

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props

    return (
        <VStack maxHeight className={classNames(cls.sidebar, {}, [className])}>
            <SidebarHeader />
            <UserChatsList />
            <SidebarFooter />
        </VStack>
    )
})
Sidebar.displayName = 'Sidebar'
