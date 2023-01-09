import {Navigate, PathRouteProps, RouteProps} from 'react-router-dom';
import React from 'react';
import NotFoundPage from "../screens/notFound/notFound.page";
import OAuth2RedirectHandler from "../providers/oauth2/OAuth2RedirectHandler";
import {PrivateRoute} from "./customRouting/privateRoute";
import ResetPasswordPage from "../screens/auth/pages/resetPassword.page";
import ChangePasswordHandler from "../screens/auth/components/changePassword.handler";
import Login from "../screens/auth/pages/Login";
import {Signup} from "../screens/auth/pages/Signup";
import ForgotPassword from "../screens/auth/pages/ForgotPassword";
import AdminLayout from "../screens/admin/pages/Admin";
const AdminPage = React.lazy(() => import('../screens/home/home.page'));


export type RootRoutes =
    'LOGIN'
    | 'NOT_FOUND'
    | 'ADMIN'
    | 'INDEX'
    | 'OAUT2_REDIRECT'
    | 'SIGN_UP'
    | 'RECUPERA_PASSWORD_ID'
    | 'CHANGE_PASSWORD'
    | 'FORGOT_PASSWORD';

export const RoutesPaths: Record<RootRoutes, String> = {
    INDEX: '/',
    LOGIN: '/login',
    ADMIN: '/admin',
    NOT_FOUND: '*',
    OAUT2_REDIRECT: '/oauth2/redirect',
    SIGN_UP: '/signup',
    RECUPERA_PASSWORD_ID: '/recupera-password/:id',
    CHANGE_PASSWORD: '/change-password',
    FORGOT_PASSWORD: '/forgot-password'

}

export const AppRoutes: Record<RootRoutes, PathRouteProps> = {
    INDEX: {
        path: RoutesPaths.INDEX.toString(),
        element: <Navigate to={RoutesPaths.LOGIN.toString()}/>
    },
    LOGIN: {
        path: RoutesPaths.LOGIN.toString(),
        element: <Login/>,
    },
    ADMIN: {
        path: RoutesPaths.ADMIN.toString(),
        element: <PrivateRoute component={AdminLayout}/>
    },
    NOT_FOUND: {
        path: RoutesPaths.NOT_FOUND.toString(),
        element: <NotFoundPage/>,
    },

    OAUT2_REDIRECT: {
        path: RoutesPaths.OAUT2_REDIRECT.toString(),
        element: <OAuth2RedirectHandler/>
    },
    SIGN_UP: {
        path: RoutesPaths.SIGN_UP.toString(),
        element: <Signup/>
    },
    RECUPERA_PASSWORD_ID: {
        path: RoutesPaths.RECUPERA_PASSWORD_ID.toString(),
        element: <ChangePasswordHandler/>,
    },
    CHANGE_PASSWORD: {
        path: RoutesPaths.CHANGE_PASSWORD.toString(),
        element: <ResetPasswordPage/>,
    },
    FORGOT_PASSWORD: {
        path: RoutesPaths.FORGOT_PASSWORD.toString(),
        element: <ForgotPassword/>,
    }

}
