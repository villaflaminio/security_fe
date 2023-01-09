import {Navigate, PathRouteProps, RouteProps} from 'react-router-dom';
import React from 'react';
import NotFoundPage from "../screens/notFound/notFound.page";
import HomePage from "../screens/home/home.page";
import OAuth2RedirectHandler from "../providers/oauth2/OAuth2RedirectHandler";
import {PrivateRoute} from "./customRouting/privateRoute";
import ResetPasswordPage from "../screens/auth/pages/resetPassword.page";
import ChangePasswordHandler from "../screens/auth/components/changePassword.handler";
import Login from "../screens/auth/pages/Login";
import {Signup} from "../screens/auth/pages/Signup";
import ForgotPassword from "../screens/auth/pages/ForgotPassword";
import AdminLayout from "../screens/admin/pages/Admin";
import {AdminRoute} from "./customRouting/adminRoute";
import UserManagement from "../screens/admin/pages/UserManagement";


export type AdminRoutes = 'DASHBOARD' | 'USERMANAGEMENT' | 'NOT_FOUND' ;

export const AdminPaths: Record<AdminRoutes, String> = {
    DASHBOARD: 'dashboard',
    USERMANAGEMENT: 'user-management',
    NOT_FOUND: '*',
}

export const AdminRoutes: Record<AdminRoutes, PathRouteProps> = {
    DASHBOARD: {
        path: AdminPaths.DASHBOARD.toString(),
        element: <ResetPasswordPage/>
    },
    USERMANAGEMENT: {
        path: AdminPaths.USERMANAGEMENT.toString(),
        element: <UserManagement/>
    },
    NOT_FOUND: {
        path: AdminPaths.NOT_FOUND.toString(),
        element: <NotFoundPage/>,
    },
}
