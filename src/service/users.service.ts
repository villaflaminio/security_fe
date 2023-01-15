import {AxiosResponse} from 'axios';
import {FetchUsersParamsAndBody, PaginatedRequestParamsAndBody} from "../store/users/types";
import {FetchUsersResponse} from "../models/users.model";
import {appAxios} from "./axios.config";

const fetchUtenti = async (requestParams: FetchUsersParamsAndBody): Promise<FetchUsersResponse> => {
    console.log('Request [fetchUtenti] params:', requestParams);
    const params:PaginatedRequestParamsAndBody = {
        page: requestParams.page,
        size: requestParams.size ,
        //FIXED BY DEFAULT
        sortField: requestParams.sortField,
        sortDirection: requestParams.sortDirection,
    }
    const response: AxiosResponse<FetchUsersResponse> = await appAxios.post(`/api/admin/users/filter`,{
        ...requestParams.entity
    },{
        params
    });

    console.log('Request [fetchUtenti] ', response.data);
    if (response && response.data) {
        return response.data
    }
    throw new Error('Error during fetchUtenti')
}

//
// const createUtente = async (utenteModel: CreateUtenteModel): Promise<void> => {
//     console.log('Request [createUtente] params:', utenteModel);
//     const response: AxiosResponse = await appAxios.post(`/api/admin/user`,utenteModel);
//
//     console.log('Request [createUtente] ', response.data);
//     if (response.status === 200) {
//         return
//     }
//     throw new Error('Error during createUtente')
// }
//
// const deleteUtente = async (id:number): Promise<void> => {
//     console.log('Request [deleteUtente] params:', id);
//     const response: AxiosResponse = await appAxios.delete(`/api/admin/user/${id}`);
//
//     console.log('Request [deleteUtente] ', response.data);
//     if (response.status === 200) {
//         return
//     }
//     throw new Error('Error during deleteUtente')
// }


export const UsersService = {
    fetchUtenti,
    // createUtente,
    // deleteUtente
}
