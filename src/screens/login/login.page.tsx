import React, {useEffect} from 'react';
import './style/Login.css';
import './style/Button.css';
import './style/Form.css';
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import githubLogo from '../../img/github-logo.png';
import {useForm, Resolver, SubmitHandler} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from "../../store/store.config";
import {LoginAuthenticateResponse, LoginParams, LoginResponseDto} from "../../store/auth/types";
import {AuthActions} from "../../store/auth/auth.action";
import TestGrants from "../home/TestGrants";
import {LoginForm} from "./LoginForm";
import {Button} from "@chakra-ui/react";
import {AxiosResponse} from "axios";
import {appAxios} from "../../service/axios.config";
import {RoutesPaths} from "../../navigation/root.routes";
import {useNavigate} from "react-router-dom";
import {FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL} from "../../constants";


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
                <div className="social-login">
                    <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                        <img src={googleLogo} alt="Google"/> Log in with Google</a>
                    <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                        <img src={fbLogo} alt="Facebook"/> Log in with Facebook</a>
                    <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
                        <img src={githubLogo} alt="Github"/> Log in with Github</a>
                </div>

                <div className="or-separator">
                    <span className="or-text">OR</span>
                </div>

                {/*form login email password*/}
                <LoginForm/>
                {/*<span className="signup-link">New user? <Link to="/signup">Sign up!</Link></span>*/}
            </div>

        </div>

    );
}

export default LoginPage;
