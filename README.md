# WhatsApp Chat

## Описание проекта

Этот проект представляет собой веб-интерфейс для отправки и получения сообщений WhatsApp с использованием API от [GREEN-API](https://console.green-api.com/).
Проект разработан с учетом **минималистичного UI** в стиле веб-версии WhatsApp, где поддерживаются только текстовые сообщения.

## 📌 Основные технологии

- **Фронтенд**: React + Redux Toolkit + RTK Query
- **Бэкенд**: GREEN-API (интерактивный сервис WhatsApp)
- **Оптимизация**: Lazy Loading (динамическая загрузка компонентов)
- **Архитектура**: Feature-Sliced Design (FSD)
- **Хранение данных**: IndexedDB (локальное хранилище)

## 🔧 Регистрация и настройка API

1. Зарегистрируйтесь на [GREEN-API](https://console.green-api.com/).
2. Создайте **Instance** и получите:
    - **idInstance** (идентификатор инстанса)
    - **apiTokenInstance** (токен доступа)
3. Настройте получения входящих уведомлений в Личном кабинете.
4. Используйте полученные данные для авторизации в интерфейсе.

## 🚀 Оптимизация и производительность

### Lazy Loading (ленивая загрузка компонентов)

Для ускорения загрузки приложения используются **динамические импорты**:

```tsx
const ChatPage = lazy(() => import('@/pages/ChatPage'))
```

### Использование RTK Query

- RTK Query позволяет **кешировать запросы**, снижая нагрузку на сервер.
- Используется метод `updateQueryData` для обновления данных без лишних запросов.

## 🗂 Архитектура проекта (FSD)

Проект разделен на логические модули по **Feature-Sliced Design (FSD)**:

```sh
src/
  entities/       # Базовые сущности (User, Chat)
  features/       # Бизнес-логика (отправка сообщений, добавление чатов)
  shared/         # Общие компоненты и утилиты
  widgets/        # Готовые компоненты интерфейса
  pages/          # Основные страницы
```

## 📥 Хранение данных в IndexedDB

Для сохранения пользовательских данных используется **IndexedDB**.

### Данные, сохраняемые в IndexedDB:

- **API данные** (`apiUrl`, `idInstance`, `apiTokenInstance`)
- **Список чатов** (`allChats`)

## 🔄 Взаимодействие с API

### Основные методы

🔹 **Авторизация пользователя**

```ts
validateAuth: build.query<string, AuthSchema>({
    query: ({ apiUrl, idInstance, apiTokenInstance }) => ({
        url: `${apiUrl}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`,
        method: 'GET',
    }),
})
```

🔹 **Проверка, зарегистрирован ли номер в WhatsApp**

```ts
checkWhatsapp: build.query<{ existsWhatsapp: boolean }, FetchProps>({
    query: ({ apiUrl, idInstance, apiTokenInstance, chatId }) => ({
        url: `${apiUrl}/waInstance${idInstance}/checkWhatsapp/${apiTokenInstance}`,
        method: 'POST',
        body: { phoneNumber: chatId },
    }),
})
```

🔹 **Получение информации о контакте**

```ts
getContactInfo: build.query<Chat, FetchProps>({
    query: ({ apiUrl, idInstance, apiTokenInstance, chatId }) => ({
        url: `${apiUrl}/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
        method: 'POST',
        body: { chatId },
    }),
})
```

🔹 **Отправка сообщения**

```ts
sendMessage: build.mutation<void, SendMessageProps>({
    query: ({ apiUrl, idInstance, apiTokenInstance, chatId, message }) => ({
        url: `${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
        method: 'POST',
        body: { chatId, message },
    }),
})
```

## 📌 Интерфейс пользователя

### Основные элементы

✅ **Сайдбар** — содержит список чатов.  
✅ **Модальное окно** — позволяет ввести номер телефона и добавить новый чат  
✅ **Окно переписки** — отображает историю сообщений и поле для ввода

## 📌 Запуск проекта

1. Убедитесь, что на вашем компьютере установлены **Node.js** и **npm** или **yarn**.
2. Склонируйте репозиторий:
    ```bash
    git clone https://github.com/Stas-Z/WhatsApp-chat.git
    ```
3. Перейдите в папку проекта:

    ```bash
    cd WhatsApp-chat

    ```

4. Установите зависимости:
    ```bash
    npm install
    # или
    yarn install
    ```
5. Запустите проект в режиме разработки:
    ```bash
    npm run start:vite
    # или
    yarn start:vite
    ```
6. Откройте [http://localhost:3000](http://localhost:3000) в вашем браузере.

## 🛠 Развитие проекта

### Возможные доработки

- Поддержка **медиафайлов** (изображения, видео, аудио)
- Реализация **групповых чатов**
