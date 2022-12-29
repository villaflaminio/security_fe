import React, {useEffect} from 'react';
import './style/Login.css';
import './style/Button.css';
import './style/Form.css';

import {useForm, Resolver, SubmitHandler} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from "../../store/store.config";
import {LoginAuthenticateResponse, LoginParams} from "../../store/auth/types";
import {AuthActions} from "../../store/auth/auth.action";
import TestGrants from "./TestGrants";
import {LoginForm} from "./LoginForm";


function LoginPage() {

    const user = useAppSelector(state => state.authReducer.id);

    // useEffect(()=>{
    //     console.log("aaaaaoo",user);
    // },[user])


    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="login-title">Login to Spring Security Project</h1>
                {/*<SocialLogin />*/}

                <div className="or-separator">
                    <span className="or-text">OR</span>
                </div>

                {/*form login email password*/}
               <LoginForm />
                {/*<span className="signup-link">New user? <Link to="/signup">Sign up!</Link></span>*/}
            </div>

            <div>
                <h1>Login effettuato con successo</h1>
                <TestGrants/>
            </div>
        </div>

    );
}

export default LoginPage;
