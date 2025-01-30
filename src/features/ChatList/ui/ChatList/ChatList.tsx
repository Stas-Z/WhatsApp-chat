import { memo } from 'react'

import { useSelector } from 'react-redux'

import { ChatItem } from '@/entities/Chat'
import {
    getUserInstance,
    getUserToken,
} from '@/entities/User/model/selectors/getUserAuthData/getUserAuthData'
import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './ChatList.module.scss'
import { useGetPostList } from '../../model/api/chatListApi'

interface ChatListProps {
    className?: string
}

// const chats: Chat[] = [
//     {
//         id: 1,
//         name: 'Stanislav Zabolotnii',
//         avatar: 'https://pps.whatsapp.net/v/t61.24694-24/418722328_465341022928687_4510326076984135662_n.jpg?stp=dst-jpg_s96x96_tt6&ccb=11-4&oh=01_Q5AaIIT-Y-BUoOBpcVndTwCjg-Z2FWm4oGBbLaxKiE-znpxv&oe=67A78D7E&_nc_sid=5e03e0&_nc_cat=102',
//     },
//     {
//         id: 2,
//         name: 'Stanislav Zabolotnii',
//         avatar: 'https://pps.whatsapp.net/v/t61.24694-24/418722328_465341022928687_4510326076984135662_n.jpg?stp=dst-jpg_s96x96_tt6&ccb=11-4&oh=01_Q5AaIIT-Y-BUoOBpcVndTwCjg-Z2FWm4oGBbLaxKiE-znpxv&oe=67A78D7E&_nc_sid=5e03e0&_nc_cat=102',
//     },
//     {
//         id: 3,
//         name: 'Stanislav Zabolotnii',
//         avatar: '',
//     },
//     {
//         id: 4,
//         name: 'Stanislav Zabolotnii',
//         avatar: '',
//     },
//     {
//         id: 5,
//         name: 'Stanislav Zabolotnii',
//         avatar: '',
//     },
//     {
//         id: 6,
//         name: 'Stanislav Zabolotnii',
//         avatar: '',
//     },
//     {
//         id: 7,
//         name: 'Stanislav Zabolotnii',
//         avatar: '',
//     },
//     {
//         id: 8,
//         name: 'Stanislav Zabolotnii',
//         avatar: '',
//     },
//     {
//         id: 9,
//         name: 'Stanislav Zabolotnii',
//         avatar: '',
//     },
//     {
//         id: 10,
//         name: 'Stanislav Zabolotnii',
//         avatar: '',
//     },
//     {
//         id: 11,
//         name: 'Stanislav Zabolotnii',
//         avatar: '',
//     },
//     {
//         id: 12,
//         name: 'Stanislav Zabolotnii',
//         avatar: '',
//     },
//     {
//         id: 13,
//         name: 'Stanislav Zabolotnii',
//         avatar: '',
//     },
//     {
//         id: 14,
//         name: 'Stanislav Zabolotnii',
//         avatar: '',
//     },
//     {
//         id: 15,
//         name: 'Stanislav Zabolotnii',
//         avatar: '',
//     },
// ]

export const ChatList = memo((props: ChatListProps) => {
    const { className } = props

    const idInstance = useSelector(getUserInstance)
    const apiTokenInstance = useSelector(getUserToken)

    const { data: contacts } = useGetPostList({
        idInstance,
        apiTokenInstance,
    })

    return (
        <div className={classNames(cls.chatList, {}, [className])}>
            <div className={cls.wrapper}>
                {contacts &&
                    contacts.map((contact) => (
                        <ChatItem
                            key={contact.id}
                            chatId={contact.id}
                            name={contact.name}
                        />
                    ))}
            </div>
        </div>
    )
})
ChatList.displayName = 'ChatList'
