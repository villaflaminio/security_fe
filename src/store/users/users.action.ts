import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {AuthService} from "../../service/auth.service";
import {
    FetchUsersParamsAndBody,
} from "./types";
import {uiManagerActions} from "../uiManager/uiManager.action";
import {AxiosError} from "axios";
import {UtenteModel} from "../../models/utente.model";
import {FetchUsersResponse} from "../../models/users.model";
import {UsersService} from "../../service/users.service";

export const enum USERS_ACTION {
    FETCH_UTENTI = 'FETCH_UTENTI',
}


//how it works?
// createAsyncThunk is a function that accepts an action type string and a payload creator function.
const fetchUtentiAction = createAsyncThunk<FetchUsersResponse,FetchUsersParamsAndBody>(USERS_ACTION.FETCH_UTENTI, async (params,thunkAPI) => {
    try {
        return await UsersService.fetchUtenti(params);
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

export const UsersActions = {
    fetchUtentiAction
}
