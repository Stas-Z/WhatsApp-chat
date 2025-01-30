export interface User {
    idInstance: string
    apiTokenInstance: string
}

export interface UserSchema {
    currentUser?: User
    isAuth: boolean
}
