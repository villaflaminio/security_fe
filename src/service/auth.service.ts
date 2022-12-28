import {AxiosResponse} from 'axios';
import {appAxios} from "./axios.config";
import {LoginAuthenticateResponse, LoginParams, LoginResponseDto} from "../store/auth/types";
import {UtenteRoleNames} from "../models/utente.model";

const loginMethod = async (params: LoginParams): Promise<LoginAuthenticateResponse> => {
    console.log('Request [loginRequest] params:', params);

    try {
        const response: AxiosResponse<LoginResponseDto> = await appAxios.post(`/api/auth/login`,
            {email: params.email, password: params.password}
        );

        if (response && response.data && response.data.token) {
            AuthService.setAccessToken(response.data.token);
            AuthService.setRefreshToken(response.data.refreshToken);
            let userRole: UtenteRoleNames = 'ROLE_USER';

            if (response.data.role && response.data.role.filter(e => e.role === 'ROLE_ADMIN').length > 0) {
                userRole = 'ROLE_ADMIN'
                console.log('Request [loginRequest] admin role')
            } else {
                userRole = 'ROLE_USER'
                console.log('Request [loginRequest] user role')
            }

            return {
                isAuth: !!response.data.token,
                token: response.data.token,
                email: response.data.email,
                id: response.data.id,
                role: userRole,
            }
        }
        throw new Error('Error during loginRequest')
    } catch (e) {
        console.log('Request [loginRequest] error', e);
        throw new Error('Error during login')
    }
}


const sendResetPassword = async (email: string): Promise<void> => {
    console.log('Request [sendResetPassword] params:' + email);
    const response: AxiosResponse = await appAxios.post(`/api/auth/recupero/recuperaPassword`, {}, {
        params: {email: email}
    });

    console.log('Request [sendResetPassword] ', response.data);
    if (response.status === 200) {
        return
    }
    throw new Error('Error during sendResetPassword')
}

// const changeResetPassword = async (params:ChangeResetPasswordParams): Promise<void> => {
//     console.log('Request [changeResetPassword] params:' + params);
//     const response: AxiosResponse = await appAxios.post(`/api/auth/recupero/setRecuperaPassword`,{},{
//         params:{
//             token:params.token,
//             newPassword:params.password
//         }
//     });
//     console.log('Request [changeResetPassword] ', response.data);
//     if (response.status === 200) {
//         return
//     }
//     throw new Error('Error during changeResetPassword')
// }


//LOCAL
const getAccessToken = () => {
    return localStorage.getItem('accessToken');
}

const setAccessToken = (accessToken: string) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
    }
}

const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
}

const setRefreshToken = (token: string) => {
    if (token) {
        localStorage.setItem('refreshToken', token);
    }
}

const setUser = (id: number, email: string, role: UtenteRoleNames) => {
    localStorage.setItem('email', email);
    localStorage.setItem('id', `${id}`);
    localStorage.setItem('role', role);
}

const getUser = (): { email?: string, id?: number, role: UtenteRoleNames } => {
    const email = localStorage.getItem('email');
    const id = localStorage.getItem('id');
    const role = localStorage.getItem('role');

    return {
        email: email ? email : undefined,
        id: id ? Number(id) : undefined,
        role: role ? role as UtenteRoleNames : 'ROLE_USER',
    }
}


const resetAccessToken = () => {
    localStorage.clear()
}

export const AuthService = {
    loginMethod,
    getAccessToken,
    setAccessToken,
    resetAccessToken,
    setUser,
    getUser,
    sendResetPassword,
    // changeResetPassword,
    getRefreshToken,
    setRefreshToken
}
