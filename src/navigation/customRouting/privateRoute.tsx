import React, {FC} from 'react';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from "../../store/store.config";
import {RoutesPaths} from "../root.routes";

interface Props {
    component: React.ComponentType
}

export const PrivateRoute:FC<Props> = ({ component: RouteComponent }) => {
    const isAuth = useAppSelector(state => state.authReducer.isAuth)

    if (isAuth) {
        return <RouteComponent />
    }

    return <Navigate to={RoutesPaths.LOGIN.toString()} />
};
