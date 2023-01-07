import React, {Component} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {LoginAuthenticateResponse, LoginParams, SignupParams} from "../store/auth/types";
import {AuthActions} from "../store/auth/auth.action";
import {RoutesPaths} from "../navigation/root.routes";
import {useAppDispatch} from "../store/store.config";
import {useNavigate} from "react-router-dom";
import {UtenteModel} from "../models/utente.model";
import {Box, Button, TextField} from '@mui/material';

export const SignupForm = () => {
    const dispatch = useAppDispatch();
    const {
        register, handleSubmit, watch, formState: {errors, touchedFields},
    } = useForm<SignupParams>();
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
            <Box
                component="form"
                marginTop={3}
                noValidate
                sx = {{width: '400px' }}
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="name"
                    autoComplete="family-name"
                    autoFocus
                    error={Boolean(errors.name)}

                    helperText={errors.name?.message}
                    {...register("name", {required: true})}
                />
                <TextField
                    type="email"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="email"
                    autoComplete="email"
                    autoFocus
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    {...register("email", {required: true , pattern: /^\S+@\S+$/i})}
                />
                <TextField
                    margin="normal"
                    variant="filled"
                    required
                    fullWidth
                    label="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={watch('password')}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    {...register("password", {required: true})}
                />
                <TextField
                    margin="normal"
                    variant="filled"
                    required
                    fullWidth
                    label="confirm password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-password"
                    value={watch('confirmPassword')}
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword?.message}
                    {...register("confirmPassword", {
                        validate: (val: string) => {
                            if (watch('password') != val) {
                                return "Your passwords do no match";
                            }
                        },
                        required: true, minLength: 5
                    })}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                   Register now
                </Button>
                {/*<Button*/}
                {/*    component={Link}*/}
                {/*    to={`/${process.env.PUBLIC_URL}/login`}*/}
                {/*    color="primary"*/}
                {/*    fullWidth*/}
                {/*    sx={{ mt: 2 }}*/}
                {/*>*/}
                {/*    {t("auth.register.back")}*/}
                {/*</Button>*/}
            </Box>

        </>
    );
}
