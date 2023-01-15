import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {authReducer} from "./auth/auth.reducer";
import {uiManagerReducer} from "./uiManager/uiManager.reducer";
import Interceptor from "../service/interceptor/auth.interceptor";
import {usersReducer} from "./users/users.reducer";
//viene utilizzato per creare lo store
export const store = configureStore({
    reducer: {
        //Add yours reducers
        authReducer,
        uiManagerReducer,
        usersReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type RootStore = typeof store
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
Interceptor.interceptor(store);
