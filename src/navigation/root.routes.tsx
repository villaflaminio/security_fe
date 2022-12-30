import {Navigate, RouteProps} from 'react-router-dom';
import React from 'react';
import NotFoundPage from "../screens/notFound/notFound.page";
import LoginPage from "../screens/login/login.page";
import HomePage from "../screens/home/home.page";
import OAuth2RedirectHandler from "../screens/oauth2/OAuth2RedirectHandler";


export type RootRoutes = 'LOGIN' |  'NOT_FOUND' | 'HOME' | 'INDEX' | 'OAUT2_REDIRECT';

export const RoutesPaths: Record<RootRoutes, String> = {
    INDEX: '/',
    LOGIN: '/login',
    HOME: '/home',
    NOT_FOUND: '*',
    OAUT2_REDIRECT: '/oauth2/redirect'
}

export const AppRoutes: Record<RootRoutes, RouteProps> = {
    INDEX: {
        index: true,
        element: <Navigate to={RoutesPaths.LOGIN.toString()}/>
    },
    LOGIN: {
        path: RoutesPaths.LOGIN.toString(),
        element: <LoginPage/>,
    },
    NOT_FOUND: {
        path: RoutesPaths.NOT_FOUND.toString(),
        element: <NotFoundPage/>,
    },
    HOME: {
        path: RoutesPaths.HOME.toString(),
        element: <HomePage/>
    },
    OAUT2_REDIRECT: {
        path: RoutesPaths.OAUT2_REDIRECT.toString(),
        element: <OAuth2RedirectHandler/>
    }

}
