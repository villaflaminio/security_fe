import React from 'react';
import {Navigate, Route, RouteProps} from 'react-router-dom';
import {useAppSelector} from "../../store/store.config";
import {RoutesPaths} from "../root.routes";

export const BaseRoute: React.FC<RouteProps> = (props) => {
    const isAuth = useAppSelector(state => state.authReducer.isAuth)

    return  !isAuth ?
        (<Route {...props}/>)
        :
        (<Navigate to={RoutesPaths.LOGIN.toString()}/>);
};

