import React, {FC} from 'react';
import {useAppSelector} from "../../store/store.config";
import {NotAuthorizedPage} from "../../screens/notAuthorized/notAuthorized.page";

interface Props {
    component: React.ComponentType
}

export const AdminRoute:FC<Props> = ({ component: RouteComponent }) => {
    const currentRole = useAppSelector(state => state.authReducer.role)

    if (currentRole === 'ROLE_ADMIN') {
        return <RouteComponent />
    }

    return <NotAuthorizedPage/>
};
