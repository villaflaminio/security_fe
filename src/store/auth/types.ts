import {UtenteModel, UtenteRoleNames} from "../../models/utente.model";

export interface AuthState {
    isAuth: boolean,
    id?: number,
    isLoading: boolean,
    isError: boolean,
    initialized: boolean,
    user?: UtenteModel
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
    token?: string,
}

export interface ChangeResetPasswordParams{
    token: string,
    password: string,
}
