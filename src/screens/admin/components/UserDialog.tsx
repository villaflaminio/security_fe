import React from "react";
import {
    Box,
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel, InputLabel, ListItemText, MenuItem, OutlinedInput,
    Select,
    TextField
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {SignupParams, UserDialogParams} from "../../../store/auth/types";
import {AuthActions} from "../../../store/auth/auth.action";
import {UtenteModel} from "../../../models/utente.model";
import {RoutesPaths} from "../../../navigation/root.routes";
import {useAppDispatch} from "../../../store/store.config";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import BoxedLayout from "../../../components/BoxedLayout";
import {UsersActions} from "../../../store/users/users.action";

const roles = ['ROLE_ADMIN', 'ROLE_USER'];

type UserDialogProps = {
    onClose: () => void;
    open: boolean;
    processing: boolean;

    user?: UtenteModel;
};

const UserDialog = ({
                        onClose,
                        open,
                        processing,
                        user,
                    }: UserDialogProps) => {

    const dispatch = useAppDispatch();
    const {
        register, handleSubmit, watch, formState: {errors, touchedFields},
    } = useForm<UserDialogParams>();
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<UserDialogParams> = data => handleDialog(data);
    const watchRoles = watch("roles"); // you can supply default value as second argument


    const handleDialog = async (params: UserDialogParams) => {
        console.log(params)
        params.id = user?.id
        if(!params.roles) params.roles = []
        await dispatch(UsersActions.alterUserAction(params)).then(async (result) => {
            if (!result) {
                console.log('errore durante la registrazione');
            } else {
              onClose()
            }
        })};

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="user-dialog-title">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <DialogTitle id="user-dialog-title">
                    Edit Mode
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="name"
                        autoFocus
                        error={Boolean(errors.name)}
                        defaultValue={user?.name}
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
                        autoFocus
                        defaultValue={user?.email}
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                        {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
                    />
                    <Box>
                        <InputLabel id="demo-simple-select-label">Roles</InputLabel>
                        {roles.map((role) => (
                            <MenuItem key={role} value={role}>
                                <Checkbox value={role} {...register("roles",)} />
                                <ListItemText primary={role.replace("ROLE_", "")}/>
                            </MenuItem>
                        ))}
                    </Box>
                    <FormControl component="fieldset" margin="normal">
                        <FormControlLabel
                            disabled={processing}
                            control={<Checkbox/>}
                            value={user?.enabled}
                            label="enabled"
                            {...register("enabled", {})}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <LoadingButton loading={processing} type="submit" variant="contained">
                        Edit
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UserDialog;
