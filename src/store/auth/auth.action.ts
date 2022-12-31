import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {AuthService} from "../../service/auth.service";
import {
    AuthenticateWithTokenResponse,
    ChangeResetPasswordParams,
    LoginAuthenticateResponse,
    LoginParams
} from "./types";
import {uiManagerActions} from "../uiManager/uiManager.action";
import {AxiosError} from "axios";
import {UtenteModel} from "../../models/utente.model";

export const enum AUTH_ACTION {
    REFRESH_AUTH = 'REFRESH_AUTH',
    LOGIN = 'LOGIN',
    CURRENT_USER = 'CURRENT_USER',
    LOGIN_WITH_TOKEN = 'LOGIN_WITH_TOKEN',
    LOGIN_WITH_OAUTH2 = 'LOGIN_WITH_OAUTH2',
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

        if (response.token) {
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

const getCurrentUser = createAsyncThunk(AUTH_ACTION.CURRENT_USER, async (params, thunkAPI): Promise<UtenteModel> => {
    try {
        return await AuthService.getCurrentUser();
    } catch (e: any) {
        thunkAPI.dispatch(uiManagerActions.showToast({
            title: 'INVALID_CREDENTIALS',
            description: 'token expired or invalid',
            status: "error",
            duration: 5000
        }));
        throw e;
    }
});

const authenticateWithToken = createAsyncThunk(AUTH_ACTION.LOGIN_WITH_TOKEN, async (params, thunkAPI): Promise<AuthenticateWithTokenResponse> => {
    try {
        return await AuthService.authenticateWithToken();
    } catch (e: any) {
        console.log("session expired ");
        throw e;
    }
});

const loginWithOAuth2 = createAsyncThunk(AUTH_ACTION.LOGIN_WITH_OAUTH2, async (token : string, thunkAPI): Promise<AuthenticateWithTokenResponse> => {
    try {
        AuthService.setAccessToken(token);
        return await AuthService.authenticateWithToken();
    } catch (e: any) {
        console.log("session expired ");
        throw e;
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
    sessionStorage.clear();

    return {payload: {}}
},);

export const AuthActions = {
    refreshAuthAction,
    loginAction,
    authenticateWithToken,
    logoutAction,
    sendResetPasswordAction,
    getCurrentUser,
    loginWithOAuth2
    // changeResetPasswordAction
}
