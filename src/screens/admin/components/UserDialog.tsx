import {Box, Button, Dialog, DialogContent, DialogTitle, TextField} from "@mui/material";
import React from "react";
import {ModifyUserParams, SignupParams} from "../../../store/auth/types";
import {AuthActions} from "../../../store/auth/auth.action";
import {UtenteModel} from "../../../models/utente.model";
import {RoutesPaths} from "../../../navigation/root.routes";
import {useAppDispatch} from "../../../store/store.config";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";


const genders = [
    {label: "userManagement.form.gender.options.f", value: "F"},
    {label: "userManagement.form.gender.options.m", value: "M"},
    {label: "userManagement.form.gender.options.n", value: "NC"},
];
const roles = ["Admin", "Member"];

// type UserDialogProps = {
//     onAdd: (user: Partial<User>) => void;
//     onClose: () => void;
//     onUpdate: (user: User) => void;
//     open: boolean;
//     processing: boolean;
//     user?: UtenteModel;
// };

const UserDialog = ({
                        onAdd,
                        onClose,
                        onUpdate,
                        open,
                        processing,
                        user,
                    }: UserDialogProps) => {
    const editMode = Boolean(user && user.id);
    const dispatch = useAppDispatch();
    const {
        register, handleSubmit, watch, formState: {errors, touchedFields},
    } = useForm<ModifyUserParams>();
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<ModifyUserParams> = data => handleModifyUser(data);


    const handleModifyUser = async (params: ModifyUserParams) => {
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
        <Dialog open={open} onClose={onClose} aria-labelledby="user-dialog-title">
            <form onSubmit={handleSubmit(onSubmit)}
                  noValidate>
                <DialogTitle id="user-dialog-title">
                    {/*{editMode*/}
                    {/*    ? t("userManagement.modal.edit.title")*/}
                    {/*    : t("userManagement.modal.add.title")}*/}
                  Edit user
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        marginTop={3}
                        noValidate
                        sx={{width: '400px'}}
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
                            {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{mt: 2}}
                        >
                            Register now
                        </Button>


                        <TextField
                            margin="normal"
                            required
                            id="role"
                            disabled={processing}
                            fullWidth
                            select
                            label="role"
                            name="role"
                            value={user.}
                            onChange={formik.handleChange}
                            error={formik.touched.role && Boolean(formik.errors.role)}
                            helperText={formik.touched.role && formik.errors.role}
                        >
                            {roles.map((role) => (
                                <MenuItem key={role} value={role}>
                                    {role}
                                </MenuItem>
                            ))}
                        </TextField>
                        <FormControl component="fieldset" margin="normal">
                            <FormControlLabel
                                name="disabled"
                                disabled={processing}
                                onChange={formik.handleChange}
                                checked={formik.values.disabled}
                                control={<Checkbox/>}
                                label={t("userManagement.form.disabled.label")}
                            />
                        </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>{t("common.cancel")}</Button>
                    <LoadingButton loading={processing} type="submit" variant="contained">
                        {editMode
                            ? t("userManagement.modal.edit.action")
                            : t("userManagement.modal.add.action")}
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
);
};

export default UserDialog;
