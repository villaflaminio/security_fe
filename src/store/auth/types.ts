import {UtenteRoleNames} from "../../models/utente.model";

export interface AuthState {
    isAuth: boolean,
    email?: string,
    id?: number,
    role?: UtenteRoleNames,
    isLoading: boolean,
    isError: boolean,
    initialized: boolean,
}

export interface LoginResponseDto{
    token: string,
    refreshToken:string,
    role: [
        {role: string}
    ],
    duration: number,
    email: string
    id: number

}

export interface LoginParams{
    email:string
    password:string
}

export interface LoginAuthenticateResponse {
    isAuth: boolean,
    id?: number,
    email?: string,
    token?: string,
    role?: UtenteRoleNames,
}

export interface ChangeResetPasswordParams{
    token: string,
    password: string,
}
