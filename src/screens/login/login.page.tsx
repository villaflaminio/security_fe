import React, {useEffect} from 'react';
import './style/Login.css';
import './style/Button.css';
import './style/Form.css';
import {useAppDispatch, useAppSelector} from "../../store/store.config";
import {LoginForm} from "./LoginForm";
import {RoutesPaths} from "../../navigation/root.routes";
import {FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL} from "../../constants";
import {Link} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {SocialSignup} from "./SocialSignup";


function LoginPage() {

    const user = useAppSelector(state => state.authReducer.user);
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

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
                <span className="signup-link">New user? <Link
                    onClick={() => navigate(RoutesPaths.SIGN_UP.toString())}>Sign up!</Link></span>
            </div>

        </div>

    );
}

export default LoginPage;
