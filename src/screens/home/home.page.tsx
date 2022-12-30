import React, {useEffect} from 'react';
import {useAppSelector} from "../../store/store.config";
import './Profile.css';
const HomePage = () => {

    const authState = useAppSelector(state => state.authReducer);
    const {id, email, role} = authState;

    // useEffect(() => {
    //
    // }, [authState])

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
                            <h2>{id}</h2>
                            <p className="profile-email">{email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default HomePage;
