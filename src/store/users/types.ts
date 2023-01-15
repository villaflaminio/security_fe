import {UtenteModel, UtenteRoleNames} from "../../models/utente.model";

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