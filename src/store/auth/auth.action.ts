import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {AuthService} from "../../service/auth.service";
import {
    AuthenticateWithTokenResponse,
    ChangePasswordParams,
    LoginAuthenticateResponse,
    LoginParams, SignupParams, UserDialogParams
} from "./types";
import {uiManagerActions} from "../uiManager/uiManager.action";
import {AxiosError} from "axios";
import {UtenteModel} from "../../models/utente.model";
import {FetchUsersResponse} from "../../models/users.model";
import {UsersService} from "../../service/users.service";
import {FetchUsersParamsAndBody} from "../users/types";
import {USERS_ACTION} from "../users/users.action";

export const enum AUTH_ACTION {
    REFRESH_AUTH = 'REFRESH_AUTH',
    LOGIN = 'LOGIN',
    CURRENT_USER = 'CURRENT_USER',
    LOGIN_WITH_TOKEN = 'LOGIN_WITH_TOKEN',
    LOGIN_WITH_OAUTH2 = 'LOGIN_WITH_OAUTH2',
    LOGOUT = 'LOGOUT',
    SEND_RESET_PASSWORD = 'SEND_RESET_PASSWORD',
    CHANGE_RESET_PASSWORD = 'CHANGE_RESET_PASSWORD',
    SIGNUP = 'SIGNUP',
    JWT_FROM_TOKENRESETPASSWORD = 'JWT_FROM_TOKENRESETPASSWORD',
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

const signUp = createAsyncThunk<UtenteModel, SignupParams>(AUTH_ACTION.SIGNUP, async (params, thunkAPI): Promise<UtenteModel> => {
    try {
        return await AuthService.signUp(params);

    } catch (e: any) {
        thunkAPI.dispatch(uiManagerActions.showToast({
            title: 'Ops... something went wrong',
            description: e.response.data,
            status: "error",
            duration: 5000
        }));
        throw e;
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
        return {
            isAuth: false,
            initialized: true
        }
    }
});

const loginWithOAuth2 = createAsyncThunk(AUTH_ACTION.LOGIN_WITH_OAUTH2, async (token: string, thunkAPI): Promise<AuthenticateWithTokenResponse> => {
    try {
        AuthService.setAccessToken(token);
        return await AuthService.authenticateWithToken();
    } catch (e: any) {
        console.log("session expired ");
        throw e;
    }
});
const alterUserAction = createAsyncThunk<UtenteModel,UserDialogParams>(USERS_ACTION.FETCH_UTENTI, async (params,thunkAPI) => {
    try {
        return await UsersService.alterUser(params);
    } catch (e: any) {
        console.log('[ERROR] fetchUtentiAction',e);
        thunkAPI.dispatch(uiManagerActions.showToast({
            title: 'Si è verificato un errore',
            description: 'Non siamo riusciti ad ottenere i dati degli utenti',
            duration: 3000,
            status: 'error'
        }));

        throw e;
    }
});
// const sendResetPasswordAction = createAsyncThunk<boolean, string>(AUTH_ACTION.SEND_RESET_PASSWORD, async (username, thunkAPI) : Promise<boolean> => {
//     try {
//         await AuthService.sendResetPassword(username);
//         return true
//     } catch (e: any) {
//         console.log('Error sendResetPasswordAction', e);
//         thunkAPI.dispatch(uiManagerActions.showToast({
//             title: 'Si è verificato un errore',
//             description: 'Non siamo riusciti ad inviare la mail di reset password',
//             duration: 3000,
//             status: 'error'
//         }));
//         throw e;
//     }
// });

const changePasswordAction = createAsyncThunk<boolean,ChangePasswordParams>(AUTH_ACTION.SEND_RESET_PASSWORD, async (params, thunkAPI) => {
    try {
        await AuthService.changeResetPassword(params);
        return true
    } catch (e: any) {
        console.log('Error changeResetPasswordAction',e);
        thunkAPI.dispatch(uiManagerActions.showToast({
            title: 'Si è verificato un errore',
            description: 'Non siamo riusciti a cambiare la password',
            duration: 3000,
            status: 'error'
        }));
        throw e;
    }
});

const getJwtFromResetPasswordTokenAction = createAsyncThunk(AUTH_ACTION.JWT_FROM_TOKENRESETPASSWORD, async (token:string, thunkAPI) : Promise<LoginAuthenticateResponse> => {
    try {
        return await AuthService.getJwtFromResetPasswordToken(token);
    } catch (e: any) {
        console.log('Error changeResetPasswordAction',e);
        thunkAPI.dispatch(uiManagerActions.showToast({
            title: 'Si è verificato un errore',
            description: 'Non siamo riusciti a cambiare la password',
            duration: 3000,
            status: 'error'
        }));
        throw e;
    }
});

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
    getCurrentUser,
    loginWithOAuth2,
    signUp,
    changePasswordAction,
    getJwtFromResetPasswordTokenAction,
    alterUserAction
}
