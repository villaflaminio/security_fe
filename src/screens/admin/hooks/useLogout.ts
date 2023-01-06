import axios from "axios";
import React, {useEffect} from "react";
import {UtenteModel} from "../../../models/utente.model";
import {useAppDispatch, useAppSelector} from "../../../store/store.config";
import {useNavigate} from "react-router-dom";
import {AuthService} from "../../../service/auth.service";
import {AuthActions} from "../../../store/auth/auth.action";
import {RoutesPaths} from "../../../navigation/root.routes";

export function useLogout() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(AuthActions.logoutAction());
        navigate(RoutesPaths.LOGIN.toString())
    }

    return {logout};
}
