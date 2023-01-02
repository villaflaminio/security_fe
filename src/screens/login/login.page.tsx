import React, {useEffect, useState} from 'react';
import './Login.css';
import {useAppDispatch, useAppSelector} from "../../store/store.config";
import {LoginForm} from "./LoginForm";
import {RoutesPaths} from "../../navigation/root.routes";
import {
    Link,
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {SocialSignup} from "./SocialSignup";
import SendRecuperaPasswordModal from "./recuperaPassword/SendRecuperaPasswordModal";

function LoginPage() {

    const user = useAppSelector(state => state.authReducer.user);
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    let [showRecoveryPassword, setShowRecoveryPassword] = useState(false)

    useEffect(() => {

        if (user) {
            navigate(RoutesPaths.HOME.toString())
        }
    }, [])


    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="login-title">Login to Spring Security Project</h1>

                <SocialSignup/>
                <div className="or-separator">
                    <span className="or-text">OR</span>
                </div>

                {/*form login email password*/}
                <LoginForm/>
                <div>
                <span className="signup-link">New user? <Link
                    onClick={() => navigate(RoutesPaths.SIGN_UP.toString())}>Sign up!</Link></span>
                </div>

                <div>
                <span className="signup-link">Password Lost? <Link
                    onClick={() => setShowRecoveryPassword(true)}>Recovery password</Link></span>
                    <SendRecuperaPasswordModal isOpen={showRecoveryPassword}
                                               onClose={() => setShowRecoveryPassword(false)}/>
                </div>
            </div>

        </div>

    );
}

export default LoginPage;
