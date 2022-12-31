import {AxiosResponse} from 'axios';
import {appAxios} from "./axios.config";
import {
    AuthenticateWithTokenResponse,
    LoginAuthenticateResponse,
    LoginParams,
    LoginResponseDto, SignupParams
} from "../store/auth/types";
import {UtenteModel, UtenteRoleNames} from "../models/utente.model";
import {AxiosError} from "axios/index";

const loginMethod = async (params: LoginParams): Promise<LoginAuthenticateResponse> => {
    try {
        console.log('Request [loginRequest] params:', params);

        const response: AxiosResponse<LoginResponseDto> = await appAxios.post(`/api/auth/login`,
            {email: params.email, password: params.password}
        ).catch((error: AxiosError) => {
            throw error;
        });

        if (response && response.data && response.data.token) {
            AuthService.setAccessToken(response.data.token);
            AuthService.setRefreshToken(response.data.refreshToken);

            let userRole: UtenteRoleNames = 'ROLE_USER'

            if (response.data.role && response.data.role.filter(e => e.role === 'ROLE_ADMIN').length > 0) {
                userRole = 'ROLE_ADMIN'
                console.log('Request [loginRequest] admin role')
            }

            return {
                isAuth: !!response.data.token,
                token: response.data.token,
                role: userRole
            }
        }
        throw new Error('Bad credentials')
    } catch (e) {
        throw e
    }
}


const signUp = async (params: SignupParams): Promise<UtenteModel> => {
    try {
        console.log('Request [signUpMethod] params:', params);

        const response: AxiosResponse<UtenteModel> = await appAxios.post(`/api/auth/signup`,
            { name : params.name ,email: params.email, password: params.password}
        ).catch((error: AxiosError) => {
            throw error;
        });
        return response.data;
    } catch (e) {
        throw e
    }
}

const getCurrentUser = async (): Promise<UtenteModel> => {
    try {
        console.log('Request [getCurrentUser] params:', AuthService.getAccessToken());
        const response: AxiosResponse<UtenteModel> = await appAxios.get(`/api/user/me`
        ).catch((error: AxiosError) => {
            throw error;
        });
        return response.data;
    } catch (e) {
        throw e
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

const authenticateWithToken = async (): Promise<AuthenticateWithTokenResponse> => {
    try {
        console.log('Request [authenticateWithToken] params:', AuthService.getAccessToken());
        const token = AuthService.getAccessToken();
        if(!token) {
            return {
                isAuth: false
            }
        }
        const user = await AuthService.getCurrentUser();
        return {
            isAuth: true,
            token: token,
            user: user
        }
    } catch (e) {
        throw e
    }
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
    return localStorage.getItem('accessToken') as string;
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
    signUp,
    setUser,
    getUser,
    sendResetPassword,
    authenticateWithToken,
    // changeResetPassword,
    getRefreshToken,
    setRefreshToken,
    getCurrentUser
}
