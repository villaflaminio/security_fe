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
    role: [
        { role: string }
    ],
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
