import {Role} from "../store/auth/types";

export type UtenteRoleNames = 'ROLE_ADMIN' | 'ROLE_USER' | 'UNAUTHENTICATED';

export interface UtenteRole {
    id: number,
    name: UtenteRoleNames
}
export interface UtenteModel{
    id: number,
    email: string,
    name: string,
    enabled: boolean,
    imageUrl : string,
    emailVerified: boolean,
    role: UtenteRoleNames,
}

export interface userMe {
    id: number
    name: string
    email: string
    imageUrl: any
    emailVerified: boolean
    provider: string
    providerId: any
    roles: RoleBE[]
}

export interface RoleBE {
    id: number
    name: string
}
export interface CreateUtenteModel{
    email: string,
    nome: string,
    cognome: string,
    ruolo: UtenteRoleNames,
}

export interface UtenteTableModel{
    id: number,
    email: string,
    nome: string,
    role: string,
    enabled: boolean,
}

export interface CustomUserSelectItem {
    value: UtenteRoleNames,
    label: string
}


export const tipiUtente: CustomUserSelectItem[] = [
    {
        value: 'ROLE_USER',
        label: 'Utente'
    },
    {
        value: 'ROLE_ADMIN',
        label: 'Admin'
    }
];
