import React, {useState} from "react";
import {LoginAuthenticateResponse, LoginParams} from "../store/auth/types";
import {AuthActions} from "../store/auth/auth.action";
import {useAppDispatch} from "../store/store.config";
import {SubmitHandler, useForm} from "react-hook-form";
import {RoutesPaths} from "../navigation/root.routes";
import {useNavigate} from 'react-router-dom';
import {Box, Link, TextField} from "@mui/material";
import SendRecuperaPasswordModal from "../screens/login/recuperaPassword/SendRecuperaPasswordModal";
import LoadingButton from '@mui/lab/LoadingButton';

export function LoginForm() {
    const dispatch = useAppDispatch();
    const {register, handleSubmit, watch, formState: {errors, touchedFields}} = useForm<LoginParams>();
    const navigate = useNavigate()
    const [errorLogin, errorLoginHandler] = useState(false);
    const [loading, loadingHandler] = useState(false);

    const onSubmit: SubmitHandler<LoginParams> = data => handleLogin(data);
    const handleLogin = async (params: LoginParams) => {
        loadingHandler(true);
        await dispatch(AuthActions.loginAction(params)).then((responseData) => {
            const response = responseData.payload as LoginAuthenticateResponse
            loadingHandler(false);
            if (!response.isAuth) {
                console.log('errore durante il login');
                errorLoginHandler(true);
            } else {
                console.log("Login effettuato con successo", response);
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
                sx={{width: '400px'}}
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    type="email"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="email"
                    autoComplete="email"
                    autoFocus
                    value={watch('email')}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
                />
                <TextField
                    margin="normal"
                    variant="filled"
                    required
                    fullWidth
                    label="password"
                    type="password"
                    id="password"
                    autoComplete="password"
                    value={watch('password')}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    {...register("password", {required: true})}
                />

                <Box sx={{ textAlign: "right" }}>
                    <Link
                        onClick={() => navigate(RoutesPaths.FORGOT_PASSWORD.toString())}
                    >
                       Forgot password?
                    </Link>
                </Box>

                <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    loading={loading}
                    sx={{ mt: 2 }}
                >
                    Login
                </LoadingButton>
                <Box alignContent={"center"}>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={() => navigate(RoutesPaths.SIGN_UP.toString())}
                    >
                    </Box>
                </Box>
            </Box>

            {/*<Box*/}
            {/*    component="form"*/}
            {/*    marginTop={3}*/}
            {/*    noValidate*/}
            {/*    onSubmit={handleSubmit(onSubmit)}*/}
            {/*>*/}
            {/*    <input className="form-item" type="email" placeholder="Email" {...register("email", {required : true })} />*/}
            {/*    <input className="form-item" type="password"*/}
            {/*           placeholder="Password" {...register("password", {required : true, minLength: 5 })} />*/}

            {/*    <Box sx={{textAlign: "right"}}>*/}
            {/*            <span className="signup-link">Password Lost? <Link*/}
            {/*                onClick={() => setShowRecoveryPassword(true)}>Recovery password</Link></span>*/}
            {/*        <SendRecuperaPasswordModal isOpen={showRecoveryPassword}*/}
            {/*                                   onClose={() => setShowRecoveryPassword(false)}/>*/}
            {/*    </Box>*/}

            {/*    <button type="submit" className="submit-btn">Login</button>*/}
            {/*</Box>*/}
        </>
    );
}