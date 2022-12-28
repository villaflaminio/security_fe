
export interface AuthState {
    isAuth: boolean,
    username?: string,
    id?: number,
    isLoading: boolean,
    isError: boolean,
    initialized: boolean,
}

export interface LoginParams{
    username:string
    password:string
}
export interface LoginAuthenticateResponse {
    isAuth: boolean,
    id?: number,
    username?: string,
    token?: string,
}