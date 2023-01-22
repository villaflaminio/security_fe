import {AdminPaths} from "../../../navigation/admin.routes";
import React from "react";
import {
    Avatar,
    Box, Button,
    Card, CardActions,
    CardContent, CardHeader, Checkbox, DialogActions, DialogContent, DialogTitle,
    Divider, FormControl, FormControlLabel,
    Grid, InputLabel,
    ListItemAvatar, ListItemText, MenuItem,
    Stack,
    Tab,
    Tabs, TextField,
    Typography
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {useAppDispatch, useAppSelector} from "../../../store/store.config";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import {SubmitHandler, useForm} from "react-hook-form";
import {UserDialogParams} from "../../../store/auth/types";
import {UsersActions} from "../../../store/users/users.action";
import {Spacer} from "@chakra-ui/react";
import {AuthActions} from "../../../store/auth/auth.action";

const ProfileAdmin = () => {
    const {user} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    const {
        register, handleSubmit, watch, formState: {errors, touchedFields},
    } = useForm<UserDialogParams>();
    const onSubmit: SubmitHandler<UserDialogParams> = data => handleDialog(data);
    const roles = ['ROLE_ADMIN', 'ROLE_USER'];
 const [processing, setProcessing] = React.useState(false);

    const handleDialog = async (params: UserDialogParams) => {
        console.log(params)
        setProcessing(true)
        params.id = user?.id
        if (!params.roles) params.roles = []
        await dispatch(AuthActions.alterUserAction(params)).then(async (result) => {
            if (!result) {
                console.log('errore durante la registrazione');
            }
            setProcessing(false)
        })
    };

    return (
        <React.Fragment>
            <Grid container spacing={2} marginTop={10}>
                <Grid item xs={12} md={5}>
                    <Card>
                        <CardContent>
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <Avatar
                                    src={user?.imageUrl}
                                    sx={{
                                        height: 64,
                                        mb: 2,
                                        width: 64
                                    }}
                                />
                                <Typography
                                    color="textPrimary"
                                    gutterBottom
                                    variant="h5"
                                >
                                    {user?.name}
                                </Typography>
                            </Box>
                        </CardContent>
                        <Divider/>
                        <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="h5"
                        >
                            Roles
                        </Typography>
                        {user?.roles.map((role) => (
                            <Typography  variant="body2">
                                {role.name}
                            </Typography>
                        ))}
                        <Divider/>

                        <CardActions>
                            <Button
                                color="primary"
                                fullWidth
                                variant="text"
                            >
                                Upload picture
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} md={7}>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Card>
                            <CardHeader
                                subheader="The information can be edited"
                                title="Profile"
                            />
                            <Divider/>
                            <CardContent>
                                <Grid
                                    container
                                >
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        label="name"
                                        autoFocus
                                        error={Boolean(errors.name)}
                                        defaultValue={user?.name}
                                        helperText={ "Please specify the first name"  + errors.name?.message}
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

                                    <FormControl component="fieldset"  margin={"none"}>
                                        <FormControlLabel
                                            control={<Checkbox/>}
                                            value={user?.enabled}
                                            label="enabled"
                                            {...register("enabled", {})}
                                        />
                                    </FormControl>

                                   <Spacer/>
                                        <InputLabel id="demo-simple-select-label">Roles</InputLabel>
                                        {roles.map((role) => (
                                            <MenuItem key={role} value={role}>
                                                <Checkbox value={role} {...register("roles",)} />
                                                <ListItemText primary={role.replace("ROLE_", "")}/>
                                            </MenuItem>
                                        ))}
                                </Grid>
                                <LoadingButton loading={processing} type="submit" variant="contained">
                                    Edit
                                </LoadingButton>
                            </CardContent>
                        </Card>
                    </form>
                </Grid>
            </Grid>
        </React.Fragment>
    )
        ;
};

export default ProfileAdmin;
