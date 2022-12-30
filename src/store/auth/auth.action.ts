import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {AuthService} from "../../service/auth.service";
import {ChangeResetPasswordParams, LoginAuthenticateResponse, LoginParams} from "./types";
import {uiManagerActions} from "../uiManager/uiManager.action";
import {AxiosError} from "axios";

export const enum AUTH_ACTION {
    REFRESH_AUTH = 'REFRESH_AUTH',
    LOGIN = 'LOGIN',
    CURRENT_USER = 'CURRENT_USER',
    LOGIN_WITH_TOKEN = 'LOGIN_WITH_TOKEN',
    LOGOUT = 'LOGOUT',
    SEND_RESET_PASSWORD = 'SEND_RESET_PASSWORD',
    CHANGE_RESET_PASSWORD = 'CHANGE_RESET_PASSWORD'
}

const refreshAuthAction = createAction(AUTH_ACTION.REFRESH_AUTH, (payload) => {
    return {payload}
})

//how it works?
// createAsyncThunk is a function that accepts an action type string and a payload creator function.
const loginAction = createAsyncThunk<LoginAuthenticateResponse, LoginParams>(AUTH_ACTION.LOGIN, async (params, thunkAPI) => {
    try {
        const response = await AuthService.loginMethod(params);
        if (response.id && response.email && response.role) {
            AuthService.setUser(response.id, response.email, response.role);
        }
        if (response.token) {
            AuthService.setAccessToken(response.token);
            return response;
        }
        return {
            isAuth: false,
        }
    } catch (e: any) {
            thunkAPI.dispatch(uiManagerActions.showToast({
                title: 'INVALID_CREDENTIALS',
                description: 'invalid email or password',
                status: "error",
                duration: 5000
            }));
        return {
            isAuth: false,
        }
    }
});

const getCurrentUser = createAsyncThunk<LoginAuthenticateResponse>(AUTH_ACTION.CURRENT_USER, async (params, thunkAPI) => {
    try {
        const response = await AuthService.getCurrentUser();

        if (response.id && response.email && response.role) {
            AuthService.setUser(response.id, response.email, response.role);
        }
        if (response.token) {
            AuthService.setAccessToken(response.token);
            return response;
        }
        return {
            isAuth: false,
        }
    } catch (e: any) {
        thunkAPI.dispatch(uiManagerActions.showToast({
            title: 'INVALID_CREDENTIALS',
            description: 'token expired or invalid',
            status: "error",
            duration: 5000
        }));
        return {
            isAuth: false,
        }
    }
});

const authenticateWithToken = createAsyncThunk(AUTH_ACTION.LOGIN_WITH_TOKEN, async (params, thunkAPI): Promise<LoginAuthenticateResponse> => {
    const token = AuthService.getAccessToken();
    const {id, email, role} = AuthService.getUser();

    return {
        isAuth: !!token,
        email,
        id: id,
        role,
    }
});

const sendResetPasswordAction = createAsyncThunk<boolean, string>(AUTH_ACTION.SEND_RESET_PASSWORD, async (username, thunkAPI) => {
    try {
        await AuthService.sendResetPassword(username);
        return true
    } catch (e: any) {
        console.log('Error sendResetPasswordAction', e);
        thunkAPI.dispatch(uiManagerActions.showToast({
            title: 'Si è verificato un errore',
            description: 'Non siamo riusciti ad inviare la mail di reset password',
            duration: 3000,
            status: 'error'
        }));
        throw e;
    }
});

// const changeResetPasswordAction = createAsyncThunk<boolean,ChangeResetPasswordParams>(AUTH_ACTION.SEND_RESET_PASSWORD, async (params,thunkAPI) => {
//     try {
//         await AuthService.changeResetPassword(params);
//         return true
//     } catch (e: any) {
//         console.log('Error changeResetPasswordAction',e);
//         thunkAPI.dispatch(uiManagerActions.showToast({
//             title: 'Si è verificato un errore',
//             description: 'Non siamo riusciti a cambiare la password',
//             duration: 3000,
//             status: 'error'
//         }));
//         throw e;
//     }
// });


const logoutAction = createAsyncThunk(AUTH_ACTION.LOGOUT, async (arg, thunkAPI) => {
    AuthService.resetAccessToken();
    return {payload: {}}
},);

export const AuthActions = {
    refreshAuthAction,
    loginAction,
    authenticateWithToken,
    logoutAction,
    sendResetPasswordAction,
    getCurrentUser
    // changeResetPasswordAction
}
