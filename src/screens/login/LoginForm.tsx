import React from "react";
import {LoginAuthenticateResponse, LoginParams} from "../../store/auth/types";
import {AuthActions} from "../../store/auth/auth.action";
import {useAppDispatch} from "../../store/store.config";
import {SubmitHandler, useForm} from "react-hook-form";

export function LoginForm() {
    const dispatch = useAppDispatch();
    const {register, handleSubmit} = useForm<LoginParams>();
    const onSubmit: SubmitHandler<LoginParams> = data => handleLogin(data);
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
        <>
            <form className="form-item" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-item">
                    <input className="form-control" type="email" placeholder="Email" {...register("email", {required : true })} />
                </div>
                <div className="form-item">
                    <input className="form-control" type="password"
                           placeholder="Password" {...register("password", {required : true, minLength: 5 })} />
                </div>
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary">Login</button>
                </div>
            </form>
        </>
    );
}