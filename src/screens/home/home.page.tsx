import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/store.config";
import './Profile.css';
import {AuthService} from "../../service/auth.service";
import {AuthActions} from "../../store/auth/auth.action";
import {RoutesPaths} from "../../navigation/root.routes";
import {UtenteModel} from "../../models/utente.model";
import {Navigate, useNavigate} from "react-router-dom";
import TestGrants from "./TestGrants";
import NavbarComponent from "./navbar.component";
import {Content} from "./Content";

const HomePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    //get current user async

    const logout = () => {
        dispatch(AuthActions.logoutAction());
        navigate(RoutesPaths.LOGIN.toString())
    }

    return (
        <>
            <NavbarComponent>
                <Content/>
                <TestGrants/>
            </NavbarComponent>


        </>

    );
};

export default HomePage;
