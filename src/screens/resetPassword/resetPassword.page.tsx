import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useAppDispatch} from "../../store/store.config";
import {ChangePasswordParams, SignupParams} from "../../store/auth/types";
import {useNavigate, useParams} from "react-router-dom";
import {AuthActions} from "../../store/auth/auth.action";
import {RoutesPaths} from "../../navigation/root.routes";
import {uiManagerActions} from "../../store/uiManager/uiManager.action";


const ResetPasswordPage = () => {
        const dispatch = useAppDispatch();
        const {
            register, handleSubmit, watch, formState: {errors, touchedFields},
        } = useForm<ChangePasswordParams>();
        const navigate = useNavigate()
        const onSubmit: SubmitHandler<ChangePasswordParams> = data => formSubmit(data);
        const params = useParams();

        const getJWT = async () => {
            if (params.id) {
                await dispatch(AuthActions.getJwtFromResetPasswordTokenAction(params.id)).then((response) => {
                    if (!response.payload) {

                        dispatch(uiManagerActions.showToast({
                            title: 'Error',
                            description: 'Si è verificato un errore',
                            status: 'error',
                        }))
                    }
                }).catch((error) => {
                    console.log(error);
                    dispatch(uiManagerActions.showToast({
                        title: 'Error',
                        description: 'Error during JWT request',
                        status: 'error',
                    }))
                })
            } else {
                dispatch(uiManagerActions.showToast({
                    title: 'Error',
                    description: 'Link corrotto',
                    status: 'error',
                }))
            }
        }


        useEffect(() => {
            getJWT();
        }, [])

        const formSubmit = (data: ChangePasswordParams) => {
            if (params.id) {
                dispatch(AuthActions.changePasswordAction(data
                )).then((response) => {
                    if (response.payload) {
                        dispatch(uiManagerActions.showToast({
                            title: 'Success',
                            description: 'Il salvataggio della password è avvenuto con successo',
                            status: 'success',
                        }))
                    }
                    navigate(RoutesPaths.LOGIN.toString())
                })
            } else {
                dispatch(uiManagerActions.showToast({
                    title: 'Error',
                    description: 'Nessun token di recupero presente',
                    status: 'error',
                }))
            }
        }

        return (
            <div className="login-container">
                <div className="login-content">
                    <h1 className="form-item"> Digitare una nuova password </h1>

                    <form className="form-item" onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-item">
                            <input className="form-control" type="password"
                                   placeholder="Password" {...register("password", {required: true, minLength: 5})} />
                        </div>
                        <div className="form-item">
                            <input className="form-control" type="password"
                                   placeholder="Confirm Password" {...register("confirmPassword", {
                                validate: (val: string) => {
                                    if (watch('password') != val) {
                                        return "Your passwords do no match";
                                    }
                                },
                                required: true, minLength: 5
                            })} />
                            {errors.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}

                        </div>

                        <div className="form-item">
                            <button type="submit" className="btn btn-block btn-primary">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
;

export default ResetPasswordPage
