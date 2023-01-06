import {useNavigate} from "react-router-dom";
import {Box, Button, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {RoutesPaths} from "../../navigation/root.routes";
import BoxedLayout from "../../components/BoxedLayout";
import {useAppDispatch} from "../../store/store.config";
import {appAxios} from "../../service/axios.config";
import {uiManagerActions} from "../../store/uiManager/uiManager.action";
import LoadingButton from "@mui/lab/LoadingButton";
import {SubmitHandler, useForm} from "react-hook-form";
import {EmailParam, LoginParams} from "../../store/auth/types";


const ForgotPassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit, watch, formState: {errors, touchedFields}} = useForm<EmailParam>();
    const onSubmit: SubmitHandler<EmailParam> = data => handleSend(data);

    const [loading, loadingHandler] = useState(false);

    const handleSend = async (data :EmailParam ) => {
        loadingHandler(true);
        const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        if (emailRegex.test(data.email)) {
            await appAxios.post(`/api/auth/recoveryPassword`, {}, {
                params: {email: data.email}
            })
                .catch((error) => {
                    console.log(error);
                })
                .then((response) => {
                    loadingHandler(false);
                    if (response) {
                        dispatch(uiManagerActions.showToast({
                            title: 'Success',
                            description: 'La mail di reset password è stata inviata correttamente',
                            status: 'success',
                        }))
                        navigate(RoutesPaths.LOGIN.toString());
                    } else {
                        dispatch(uiManagerActions.showToast({
                            title: 'Error',
                            description: 'Si è verificato un errore',
                            status: 'error',
                        }))
                    }
                })

        } else {
            dispatch(uiManagerActions.showToast({
                title: 'Errore',
                description: 'Email non valida',
                status: 'error',
            }))
        }
    }

    return (
        <BoxedLayout>
            <Typography component="h1" variant="h5">
                Get recovery password email
            </Typography>
            <Typography component="h5" >
                Ti verrà inviata una mail per resettare la password
            </Typography>
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
                <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    loading={loading}
                    sx={{mt: 2}}
                >
                    Login
                </LoadingButton>
            </Box>
            <Button
                onClick={() => navigate(RoutesPaths.LOGIN.toString())}
                color="primary"
                fullWidth
                sx={{mt: 2}}
            >
                Back to login
            </Button>
        </BoxedLayout>
    );
};

export default ForgotPassword;
