import {AxiosResponse} from 'axios';
import {appAxios} from "./axios.config";
import {LoginAuthenticateResponse, LoginParams} from "../store/auth/types";

const loginMethod = async (params: LoginParams):Promise<LoginAuthenticateResponse> => {
    console.log('Request [loginRequest] params:', params);
    // const response: AxiosResponse<LoginResponseDto> = await appAxios.post(`/api/authenticate`,{},{
    //     params:{username:params.username, password:params.password}
    // });
    // console.log('Request [loginRequest] ', response.data);
    // if (response && response.data && response.data.token) {
    //     AuthService.setAccessToken(response.data.token)
    //     AuthService.setRefreshToken(response.data.refreshToken)
    //     let userRole:UtenteRoleNames = 'ROLE_LION'
    //
    //     if (response.data.role && response.data.role.filter(e => e.role === 'ROLE_ADMIN').length > 0 ) {
    //         userRole = 'ROLE_ADMIN'
    //         console.log('Request [loginRequest] admin role')
    //     }
    //
    //     return {
    //         isAuth: !!response.data.token,
    //         token:response.data.token,
    //         username: response.data.username,
    //         id: response.data.id,
    //         role: userRole,
    //     }
    // }
     throw new Error('Error during login')
}
const setUser = (id: number,username:string) => {
    localStorage.setItem('username', username);
    localStorage.setItem('id', `${id}`);
}

export const AuthService = {
    loginMethod,
    setUser
}
