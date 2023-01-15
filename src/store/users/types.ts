import {UtenteModel, UtenteRoleNames} from "../../models/utente.model";

export interface UsersState {
    usersPaginated: UsersPaginatedState,
    isLoading: boolean,
    isError: boolean,
}

export interface UsersPaginatedState extends PaginatedState,OrderingFilters {
    data: UtenteModel[],
}
export interface PaginatedState {
    totalElements: number,
    totalPages: number,
    pageSize: number,
    pageIndex: number,
    filters:PaginatedTableFilters
}

export interface PaginatedTableFilters{
    filteringColumn?: string;
    orderingFilters?: OrderingFilters;
}

export interface OrderingFilters {
    sortDirection?: string,
    sortField?: string,
}
export interface FetchUsersParamsAndBody extends PaginatedRequestParamsAndBody {
    entity?: {
        id?: number,
        name?: string,
        email?: string,
    }
}
export interface PaginatedRequestParamsAndBody {
    page: number,
    size: number,
    sortField?: string,
    sortDirection?: string,
}