import React from "react";
import {
  Button, Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel, MenuItem,
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

const genders = [
  { label: "userManagement.form.gender.options.f", value: "F" },
  { label: "userManagement.form.gender.options.m", value: "M" },
  { label: "userManagement.form.gender.options.n", value: "NC" },
];
const roles = ["Admin", "User"];

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


  const handleDialog = async (params: UserDialogParams) => {
   console.log(params)
    dispatch()
  }

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
              {...register("email", {required: true , pattern: /^\S+@\S+$/i})}
          />
          <TextField
            margin="normal"
            required
            id="role"
            disabled={processing}
            fullWidth
            select
            label="role"
            error={Boolean(errors.role)}
            helperText={errors.role?.message}
            {...register("role", { required: true })}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
          <FormControl component="fieldset" margin="normal">
            <FormControlLabel
              disabled={processing}
              control={<Checkbox />}
              label="Disabled"
              {...register("disabled", {})}
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
