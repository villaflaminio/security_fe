import {createReducer} from '@reduxjs/toolkit';
import {AuthState} from './types';
import {AuthActions} from "./auth.action";

const initialState: AuthState = {
    isAuth:false,
    isError:false,
    isLoading:false,
    initialized:false,
};

export const authReducer = createReducer(initialState, (builder) => {

    builder.addCase(AuthActions.loginAction.pending, (state, action) => {
        return{
            ...state,
            isLoading:true,
            isError:false
        }
    });

    builder.addCase(AuthActions.loginAction.fulfilled, (state, action) => {
        return {
            ...state,
            isAuth: action.payload.isAuth,
            username: action.payload.username,
            id: action.payload.id,
            isError:false,
            isLoading:false,
            initialized:true,
        }
    });

    builder.addCase(AuthActions.loginAction.rejected, (state, action) => {
        return {
            ...state,
            username:undefined,
            id:undefined,
            isAuth: false,
            isError:false,
            isLoading:false,
            initialized:true
        }
    });



    builder.addDefaultCase((state, action) => {
        return state;
    });
});
