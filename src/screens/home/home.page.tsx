import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/store.config";
import './Profile.css';
import {uiManagerActions} from "../../store/uiManager/uiManager.action";
import {AuthService} from "../../service/auth.service";
import {AuthActions} from "../../store/auth/auth.action";
import {RoutesPaths} from "../../navigation/root.routes";
import {UtenteModel} from "../../models/utente.model";

const HomePage = () => {
    const [localUser, setUser] = React.useState<UtenteModel>();
    const authState = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();

    async function getUserMe() {
        try {
            const responseData = await dispatch(AuthActions.getCurrentUser())

        } catch (e) {
            dispatch(uiManagerActions.showToast({
                title: 'Error',
                description: 'Invalid token',
                status: 'error',
                duration: 5000,
            }))
        }

    }

    useEffect(() => {
        getUserMe();
        const {user} = authState;
        setUser(localUser);
        console.log("aaaaaoo", user);
    }, [localUser])
    return (
        <>
            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        {/*<div className="profile-avatar">*/}
                        {/*    {*/}
                        {/*        this.props.currentUser.imageUrl ? (*/}
                        {/*            <img src={currentUser.imageUrl} alt={this.props.currentUser.name}/>*/}
                        {/*        ) : (*/}
                        {/*            <div className="text-avatar">*/}
                        {/*                <span>{email}</span>*/}
                        {/*            </div>*/}
                        {/*        )*/}
                        {/*    }*/}
                        {/*</div>*/}
                        <div className="profile-name">
                            <h2>{localUser?.id}</h2>
                            <p className="profile-email">{localUser?.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default HomePage;
