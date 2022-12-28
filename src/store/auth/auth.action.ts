import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {AuthService} from "../../service/auth.service";
import {LoginAuthenticateResponse, LoginParams} from "./types";

export const enum AUTH_ACTION {
    LOGIN = 'LOGIN',
}


const loginAction = createAsyncThunk<LoginAuthenticateResponse,LoginParams>(AUTH_ACTION.LOGIN, async (params) => {
    try {
        const response = await AuthService.loginMethod(params);
        if (response.id && response.email && response.role) {
            AuthService.setUser(response.id, response.email,response.role);
        }
        if (response.token){
            AuthService.setAccessToken(response.token);
            return response;
        }
        return {
            isAuth: false,
        }
    } catch (e: any) {
        return {
            isAuth: false,
        }
    }
});

export const AuthActions = {
    loginAction,
}
