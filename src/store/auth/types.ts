import {UtenteModel, UtenteRoleNames} from "../../models/utente.model";
import {bool} from "yup";

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
    role: Role[],
    duration: number,
    email: string
    id: number

}

export interface Role {
    authority: string
}


export interface LoginParams {
    email: string
    password: string
}
export interface EmailParam{
    email: string
}
export interface SignupParams {
    email: string
    name: string
    password: string
    confirmPassword: string
}
export interface UserDialogParams {
    id?: number
    email: string
    name: string
    roles : string[]
    enabled : boolean
}


export interface ModifyUserParams {
    email: string,
    name: string,
    role : string,
    disabled : boolean
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

export interface ChangePasswordParams {
    password: string,
    confirmPassword: string
}
