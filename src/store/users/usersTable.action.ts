import {createAction} from '@reduxjs/toolkit';
import {OrderingFilters, PaginatedTableFilters} from "./types";

export const enum USERS_TABLE_ACTION {
    SET_PAGE_INDEX = 'USERS_SET_PAGE_INDEX',
    SET_PAGE_SIZE = 'USERS_SET_PAGE_SIZE',
    SET_FILTERS = 'USERS_SET_FILTERS',
    SET_ORDERING_FILTERS = 'USERS_SET_ORDERING_FILTERS',
}

const setPageIndexAction = createAction(USERS_TABLE_ACTION.SET_PAGE_INDEX, (payload:number) => {
    return {payload}
})

const setPageSizeAction = createAction(USERS_TABLE_ACTION.SET_PAGE_SIZE, (payload:number) => {
    return {payload}
})

const setFiltersAction = createAction(USERS_TABLE_ACTION.SET_FILTERS, (payload:PaginatedTableFilters) => {
    return {payload}
})

const setOrderingFiltersAction = createAction(USERS_TABLE_ACTION.SET_ORDERING_FILTERS, (payload:OrderingFilters) => {
    return {payload}
})

export const UsersTableAction = {
    setPageIndexAction,
    setPageSizeAction,
    setFiltersAction,
    setOrderingFiltersAction
};
