import React from 'react';
import './style/Login.css';
import './style/Button.css';
import './style/Form.css';

import {useForm, Resolver, SubmitHandler} from 'react-hook-form';
import {useAppDispatch} from "../../store/store.config";
import {LoginAuthenticateResponse, LoginParams} from "../../store/auth/types";
import {AuthActions} from "../../store/auth/auth.action";

type FormValues = {
    email: string;
    password: string;
};

function Login() {
    const {register, handleSubmit} = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = data => console.log(data);
    const dispatch = useAppDispatch();

    const handleLogin = async (params: LoginParams) => {
        await dispatch(AuthActions.loginAction(params)).then((responseData) => {
            const response = responseData.payload as LoginAuthenticateResponse
            if (!response.isAuth) {
                console.log('errore durante il login');
            }else{
                console.log("Login effettuato con successo")
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
        </div>

    );
}

export default Login;
