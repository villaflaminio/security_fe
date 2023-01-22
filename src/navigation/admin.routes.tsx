import {Navigate, PathRouteProps, RouteProps} from 'react-router-dom';
import React from 'react';
import NotFoundPage from "../screens/notFound/notFound.page";
import ResetPasswordPage from "../screens/auth/pages/resetPassword.page";
import ChangePasswordHandler from "../screens/auth/components/changePassword.handler";
import UserManagement from "../screens/admin/pages/UserManagement";
import ProfileAdmin from "../screens/admin/pages/Profile";


export type AdminRoutes = 'DASHBOARD' | 'USERMANAGEMENT' | 'NOT_FOUND' | 'PROFILE' ;

export const AdminPaths: Record<AdminRoutes, String> = {
    DASHBOARD: 'dashboard',
    USERMANAGEMENT: 'user-management',
    PROFILE: 'profile',
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
    PROFILE: {
        path: AdminPaths.PROFILE.toString(),
        element: <ProfileAdmin/>
    },

}
