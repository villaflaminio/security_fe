import React, {useState} from "react";
import {LoginAuthenticateResponse, LoginParams} from "../../../store/auth/types";
import {AuthActions} from "../../../store/auth/auth.action";
import {useAppDispatch} from "../../../store/store.config";
import {SubmitHandler, useForm} from "react-hook-form";
import {RoutesPaths} from "../../../navigation/root.routes";
import {useNavigate} from 'react-router-dom';
import {Box, Link, TextField} from "@mui/material";
import SendRecuperaPasswordModal from "../../login/recuperaPassword/SendRecuperaPasswordModal";

export function LoginForm() {
    const dispatch = useAppDispatch();
    const {register, handleSubmit} = useForm<LoginParams>();
    const navigate = useNavigate()
    const [errorLogin , errorLoginHandler] = useState(false);
    let [showRecoveryPassword, setShowRecoveryPassword] = useState(false)

    const onSubmit: SubmitHandler<LoginParams> = data => handleLogin(data);
    const handleLogin = async (params: LoginParams) => {
        await dispatch(AuthActions.loginAction(params)).then((responseData) => {
            const response = responseData.payload as LoginAuthenticateResponse
            if (!response.isAuth) {
                console.log('errore durante il login');
                errorLoginHandler(true);
            }else{
                console.log("Login effettuato con successo" , response);
                navigate(RoutesPaths.HOME.toString())
            }
        })
    }


    return (
        <>
                <Box
                    component="form"
                    marginTop={3}
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input className="form-item" type="email" placeholder="Email" {...register("email", {required : true })} />
                    <input className="form-item" type="password"
                           placeholder="Password" {...register("password", {required : true, minLength: 5 })} />

                    <Box sx={{textAlign: "right"}}>
                            <span className="signup-link">Password Lost? <Link
                                onClick={() => setShowRecoveryPassword(true)}>Recovery password</Link></span>
                        <SendRecuperaPasswordModal isOpen={showRecoveryPassword}
                                                   onClose={() => setShowRecoveryPassword(false)}/>
                    </Box>

                    <button type="submit" className="submit-btn">Login</button>
                </Box>
        </>
    );
}