import React, {useEffect} from 'react';
import './style/Login.css';
import './style/Button.css';
import './style/Form.css';

import {useForm, Resolver, SubmitHandler} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from "../../store/store.config";
import {LoginAuthenticateResponse, LoginParams} from "../../store/auth/types";
import {AuthActions} from "../../store/auth/auth.action";
import TestGrants from "./TestGrants";


function Login() {
    const {register, handleSubmit} = useForm<LoginParams>();
    const onSubmit: SubmitHandler<LoginParams> = data => handleLogin(data);
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.authReducer.id);

    // useEffect(()=>{
    //     console.log("aaaaaoo",user);
    // },[user])

    const handleLogin = async (params: LoginParams) => {
        await dispatch(AuthActions.loginAction(params)).then((responseData) => {
            const response = responseData.payload as LoginAuthenticateResponse
            if (!response.isAuth) {
                console.log('errore durante il login');
            }else{
                console.log("Login effettuato con successo" , response);
            }

        })
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="login-title">Login to Spring Security Project</h1>
                {/*<SocialLogin />*/}

                <div className="or-separator">
                    <span className="or-text">OR</span>
                </div>

                {/*form login email password*/}
                <form className="form-item" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-item">
                        <input className="form-control" type="email" placeholder="Email" {...register("email", {})} />
                    </div>
                    <div className="form-item">
                        <input className="form-control" type="password"
                               placeholder="Password" {...register("password", {})} />
                    </div>
                    <div className="form-item">
                        <button type="submit" className="btn btn-block btn-primary">Login</button>
                    </div>
                </form>
                {/*<span className="signup-link">New user? <Link to="/signup">Sign up!</Link></span>*/}
            </div>

            <div>
                <h1>Login effettuato con successo</h1>
                <TestGrants/>
            </div>
        </div>

    );
}

export default Login;
