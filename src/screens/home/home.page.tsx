import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/store.config";
import './Profile.css';
import {uiManagerActions} from "../../store/uiManager/uiManager.action";
import {AuthService} from "../../service/auth.service";
import {AuthActions} from "../../store/auth/auth.action";
import {RoutesPaths} from "../../navigation/root.routes";
import {UtenteModel} from "../../models/utente.model";
import {Link} from "@chakra-ui/react";
import {Navigate, useNavigate} from "react-router-dom";
import TestGrants from "./TestGrants";

const HomePage = () => {
    const [localUser, setUser] = React.useState<UtenteModel>();
    const authUser = useAppSelector(state => state.authReducer.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    //get current user async
    async function getCurrentUser() {
        const user = await AuthService.getCurrentUser();
        setUser(user);
    }

    useEffect(() => {
        if (authUser) {
            setUser(authUser);
        } else {
            getCurrentUser();
        }
    }, [])

    const logout = () => {
        dispatch(AuthActions.logoutAction());
        navigate(RoutesPaths.LOGIN.toString())
    }

    return (
        <>
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <Link
                    className="dropdown-item"
                    onClick={logout}
                >
                    Logout
                </Link>
            </nav>
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">

                        <div className="profile-name">
                            <h2>{localUser?.id}</h2>
                            <p className="profile-email">{localUser?.email}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h1>Login effettuato con successo</h1>
                    <TestGrants/>
                </div>
            </div>
        </>

    );
};

export default HomePage;
