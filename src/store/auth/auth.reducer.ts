import {createReducer} from '@reduxjs/toolkit';
import {AuthState} from './types';
import {AuthActions} from "./auth.action";

const initialState: AuthState = {
    isAuth: false,
    isError: false,
    isLoading: false,
    initialized: false,
};

export const authReducer = createReducer(initialState, (builder) => {

    builder.addCase(AuthActions.loginAction.pending, (state, action) => {
        return {
            ...state,
            isLoading: true,
            isError: false
        }
    });

    builder.addCase(AuthActions.loginAction.fulfilled, (state, action) => {
        return {
            ...state,
            isAuth: action.payload.isAuth,
            token: action.payload.token,
            isError: false,
            isLoading: false,
            initialized: true,
        }
    });

    builder.addCase(AuthActions.loginAction.rejected, (state, action) => {
        return {
            ...state,
            email: undefined,
            isAuth: false,
            isError: false,
            isLoading: false,
            initialized: true
        }
    });

    builder.addCase(AuthActions.authenticateWithToken.fulfilled, (state, action) => {
        return {
            ...state,
            isAuth: action.payload.isAuth,
            token: action.payload.token,
            user: action.payload.user,
            isError: false,
            isLoading: false,
            initialized: true,
        }
    });

    builder.addCase(AuthActions.authenticateWithToken.pending, (state, action) => {
        return {
            ...state,
            isError: false,
            isLoading: true,
        }
    });

    builder.addCase(AuthActions.authenticateWithToken.rejected, (state, action) => {
        return {
            ...state,
            isError: true,
            isLoading: false,
            initialized: true
        }
    });


    builder.addCase(AuthActions.loginWithOAuth2.fulfilled, (state, action) => {
        return {
            ...state,
            isAuth: action.payload.isAuth,
            token: action.payload.token,
            user: action.payload.user,
            isError: false,
            isLoading: false,
            initialized: true,
        }
    });

    builder.addCase(AuthActions.loginWithOAuth2.pending, (state, action) => {
        return {
            ...state,
            isError: false,
            isLoading: true,
        }
    });

    builder.addCase(AuthActions.loginWithOAuth2.rejected, (state, action) => {
        return {
            ...state,
            isError: true,
            isLoading: false,
            initialized: true
        }
    });


    builder.addCase(AuthActions.getCurrentUser.fulfilled, (state, action) => {
        return {
            ...state,
            user: action.payload,
            isError: false,
            isLoading: false,
            initialized: true,
        }
    });

    builder.addCase(AuthActions.getCurrentUser.pending, (state, action) => {
        return {
            ...state,
            isError: false,
            isLoading: true,
        }
    });

    builder.addCase(AuthActions.getCurrentUser.rejected, (state, action) => {
        return {
            ...state,
            isError: false,
            isLoading: false,
        }
    });

    builder.addCase(AuthActions.logoutAction.fulfilled, (state, action) => {
        return {
            ...state,
            user: undefined,
            token: undefined,
            email: undefined,
            isAuth: false,
            isError: false,
            isLoading: false,
        }
    });

    builder.addDefaultCase((state, action) => {
        return state;
    });
});
