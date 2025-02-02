import { openDB } from 'idb'

import { Chat } from '@/entities/Chat'

const DB_NAME = 'chatAppDB'
const DB_VERSION = 1

// Создаём базу данных и храним необходимые объекты
export const initDB = async () => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            // Создаем хранилища для данных
            const apiStore = db.createObjectStore('apiData', { keyPath: 'id' })
            apiStore.createIndex('key', 'key')
            db.createObjectStore('chats', { keyPath: 'id' })
        },
    })
}

// Сохранение данных API в IndexedDB
export const saveApiData = async (
    apiUrl: string,
    userId: string,
    apiToken: string,
) => {
    const db = await initDB()
    await db.put('apiData', { id: 'apiUrl', key: 'API_URL', value: apiUrl })
    await db.put('apiData', {
        id: 'userId',
        key: 'USER_ID_INSTANCE',
        value: userId,
    })
    await db.put('apiData', {
        id: 'apiToken',
        key: 'API_TOKEN_INSTANCE',
        value: apiToken,
    })
}

// Получение данных API из IndexedDB
export const getApiData = async () => {
    const db = await initDB()
    const apiUrl = await db.getFromIndex('apiData', 'key', 'API_URL')
    const userId = await db.getFromIndex('apiData', 'key', 'USER_ID_INSTANCE')
    const apiToken = await db.getFromIndex(
        'apiData',
        'key',
        'API_TOKEN_INSTANCE',
    )
    return {
        apiUrl: apiUrl?.value,
        userId: userId?.value,
        apiToken: apiToken?.value,
    }
}
export const deleteApiData = async () => {
    const db = await initDB()

    // Удаляем данные из таблицы apiData
    await db.delete('apiData', 'apiToken')
    await db.delete('apiData', 'apiUrl')
    await db.delete('apiData', 'userId')
}

// Сохранение чатов
export const saveChats = async (chats: Chat[]) => {
    const db = await initDB()
    const tx = db.transaction('chats', 'readwrite')

    chats.forEach((chat) => {
        tx.store.put({ id: chat.chatId, value: chat })
    })

    await tx.done
}

// Получение чатов
export const getChats = async (): Promise<Chat[]> => {
    const db = await initDB()
    const store = db.transaction('chats', 'readonly').store

    const storedChats = await store.getAll()

    return storedChats.map((item) => item.value)
}

export const deleteChat = async (chatId: string) => {
    const db = await initDB()
    const tx = db.transaction('chats', 'readwrite')
    await tx.store.delete(chatId)
    await tx.done
}
