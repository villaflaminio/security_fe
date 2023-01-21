import {createReducer} from '@reduxjs/toolkit';
import {UsersState} from "./types";
import {UsersActions} from "./users.action";
import {UsersTableAction} from "./usersTable.action";

const initialState: UsersState = {
    isError: false,
    isLoading: false,
    usersPaginated:{
        data: [],
        totalElements: 0,
        totalPages: 0,
        pageSize:10,
        pageIndex:0,
        filters: {}
    },

};

export const usersReducer = createReducer(initialState, (builder) => {
    //LIST PROPRIETARI
    builder.addCase(UsersActions.fetchUsersAction.pending, (state, action) => {
        return {
            ...state,
            isLoading: true,
            isError: false,
        }
    });

    builder.addCase(UsersActions.fetchUsersAction.rejected, (state, action) => {
        return {
            ...state,
            isLoading: false,
            isError: true,
        }
    });

    builder.addCase(UsersActions.fetchUsersAction.fulfilled, (state, action) => {
        const {content, totalElements, totalPages} = action.payload;
        return {
            ...state,
            isLoading: false,
            isError: false,
            usersPaginated: {
                ...state.usersPaginated,
                data: content,
                totalElements,
                totalPages
            }
        }
    });

    //Utenti
    builder.addCase(UsersTableAction.setPageIndexAction, (state, action) => {
        return {
            ...state,
            usersPaginated: {
                ...state.usersPaginated,
                pageIndex: action.payload
            }
        }
    });

    builder.addCase(UsersTableAction.setPageSizeAction, (state, action) => {
        return {
            ...state,
            usersPaginated: {
                ...state.usersPaginated,
                pageSize: action.payload
            }
        }
    });

    builder.addCase(UsersTableAction.setFiltersAction, (state, action) => {
        return {
            ...state,
            usersPaginated:{
                ...state.usersPaginated,
                filters:{
                    ...state.usersPaginated.filters,
                    ...action.payload
                }
            }
        }
    });

    builder.addCase(UsersTableAction.setOrderingFiltersAction, (state, action) => {
        return {
            ...state,
            usersPaginated:{
                ...state.usersPaginated,
                ...action.payload
            }
        }
    });


    builder.addDefaultCase((state, action) => {
        return state;
    });
});
