import React, {Component} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {LoginAuthenticateResponse, LoginParams, SignupParams} from "../../store/auth/types";
import {AuthActions} from "../../store/auth/auth.action";
import {RoutesPaths} from "../../navigation/root.routes";
import {useAppDispatch} from "../../store/store.config";
import {useNavigate} from "react-router-dom";
import {UtenteModel} from "../../models/utente.model";

export const SignupForm = () => {
    const dispatch = useAppDispatch();
    const {register, handleSubmit} = useForm<SignupParams>();
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<SignupParams> = data => handleSignUp(data);
    const handleSignUp = async (params: SignupParams) => {
        await dispatch(AuthActions.signUp(params)).then(async (responseData) => {
            const response = responseData.payload as UtenteModel
            if (!response.id) {
                console.log('errore durante la registrazione');
            } else {
                await dispatch(AuthActions.loginAction(params)).then((responseData) => {
                    navigate(RoutesPaths.LOGIN.toString())
                })
            }
        })
    }

    return (
        <>
            <form className="form-item" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-item">
                    <input className="form-control" type="text"
                           placeholder="name" {...register("name", {required: true})} />
                </div>
                <div className="form-item">
                    <input className="form-control" type="email"
                           placeholder="Email" {...register("email", {required: true})} />
                </div>

                <div className="form-item">
                    <input className="form-control" type="password"
                           placeholder="Password" {...register("password", {required: true, minLength: 5})} />
                </div>
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary">Sign Up</button>
                </div>
            </form>

        </>
    );
}
