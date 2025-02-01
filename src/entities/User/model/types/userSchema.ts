export interface User {
    apiUrl: string
    idInstance: string
    apiTokenInstance: string
}

export interface UserSchema {
    currentUser?: User
    isAuth: boolean
}
