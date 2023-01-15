import {PageableResponse} from "./pageableResponse.model";
import {UtenteModel} from "./utente.model";

export interface FetchUsersResponse extends PageableResponse<UtenteModel[]> {

}