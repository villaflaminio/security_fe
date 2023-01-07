import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useAppDispatch} from "../../../store/store.config";
import {ChangePasswordParams} from "../../../store/auth/types";
import { AuthActions } from '../../../store/auth/auth.action';
import {uiManagerActions} from "../../../store/uiManager/uiManager.action";
import {RoutesPaths} from "../../../navigation/root.routes";
import {useNavigate} from "react-router-dom";

const ResetPasswordPage = () => {
        const dispatch = useAppDispatch();
        const {
            register, handleSubmit, watch, formState: {errors, touchedFields},
        } = useForm<ChangePasswordParams>();
        const navigate = useNavigate()
        const onSubmit: SubmitHandler<ChangePasswordParams> = data => formSubmit(data);
        const [canChange, setCanChange] = React.useState(false);


        const formSubmit = (data: ChangePasswordParams) => {
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
                    <form className="form-item" onSubmit={() => navigate(RoutesPaths.LOGIN.toString())}>
                        <button type="submit" className="btn btn-block btn-primary">Exit</button>
                    </form>
                </div>
            </div>

        )

    }
;

export default ResetPasswordPage
