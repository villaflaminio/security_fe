import {UtenteModel, UtenteRoleNames} from "../../models/utente.model";

export interface AuthState {
    isAuth: boolean,
    id?: number,
    token?: string,
    isLoading: boolean,
    isError: boolean,
    initialized: boolean,
    role?: UtenteRoleNames,
    user?: UtenteModel
}

export interface LoginResponseDto {
    token: string,
    refreshToken: string,
    role: [
        { role: string }
    ],
    duration: number,
    email: string
    id: number

}

export interface LoginParams {
    email: string
    password: string
}

export interface SignupParams {
    email: string
    name: string
    password: string
    confirmPassword: string
}

export interface LoginAuthenticateResponse {
    isAuth: boolean,
    id?: number,
    token?: string,
    role?: UtenteRoleNames,

}

export interface AuthenticateWithTokenResponse extends LoginAuthenticateResponse {
    user?: UtenteModel,
    initialized: boolean

}

export interface ChangeResetPasswordParams {
    token: string,
    password: string,
}
