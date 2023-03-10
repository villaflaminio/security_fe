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
import {UserDialogParams} from "../auth/types";

export const enum USERS_ACTION {
    FETCH_UTENTI = 'FETCH_UTENTI',
}


//how it works?
// createAsyncThunk is a function that accepts an action type string and a payload creator function.
const fetchUsersAction = createAsyncThunk<FetchUsersResponse,FetchUsersParamsAndBody>(USERS_ACTION.FETCH_UTENTI, async (params,thunkAPI) => {
    try {
        return await UsersService.fetchUsers(params);
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
const alterUserAction = createAsyncThunk<FetchUsersResponse,UserDialogParams>(USERS_ACTION.FETCH_UTENTI, async (params,thunkAPI) => {
    try {
       const ret =   await UsersService.alterUser(params);
        let entity = {}

        const fetchParams:FetchUsersParamsAndBody = {
              page: 0,
                size: 5,
                sortDirection: 'ASC',
                entity: entity,
                sortField: "",
       }
        return await UsersService.fetchUsers(fetchParams);

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
    fetchUsersAction,
    alterUserAction,
}
