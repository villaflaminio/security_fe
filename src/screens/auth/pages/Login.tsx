import React, {useEffect, useState} from "react";
import {LoginForm} from "../../../components/LoginForm";
import {RoutesPaths} from "../../../navigation/root.routes";
import {useAppDispatch, useAppSelector} from "../../../store/store.config";
import {useNavigate} from "react-router-dom";
import './Login.css';
import {Box, Button, Grid, Link, Paper, Typography} from '@mui/material';
import BoxedLayout from "../../../components/BoxedLayout";
import {SocialSignup} from "../../../components/SocialSignup";
const Login = () => {
    const user = useAppSelector(state => state.authReducer.user);
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    useEffect(() => {

        if (user) {
            navigate(RoutesPaths.HOME.toString())
        }
    }, [])

    return (
        <Grid container component="main" sx={{height: "100vh"}}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: "url(./img/startup.svg)",
                    backgroundRepeat: "no-repeat",
                    bgcolor: "background.default",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} square>
                <BoxedLayout>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box marginTop={3} >
                        <Box marginTop={5} >
                            <SocialSignup/>
                        </Box>
                        <LoginForm/>

                            <Button
                                onClick={() => navigate(RoutesPaths.SIGN_UP.toString())}
                                color="primary"
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Sign up!
                            </Button>
                        </Box>
                </BoxedLayout>
            </Grid>
        </Grid>
    );

    //         <div className="login-container">
    //             <div className="login-content">
    //                 <h1 className="login-title">Login to Spring Security Project</h1>
    //
    //                 <SocialSignup/>
    //                 <div className="or-separator">
    //                     <span className="or-text">OR</span>
    //                 </div>
    //
    //                 {/*form login email password*/}
    //                 <LoginForm/>
    //                 <div>
    //         <span className="signup-link">New user? <Link
    //             onClick={() => navigate(RoutesPaths.SIGN_UP.toString())}>Sign up!</Link></span>
    //                 </div>
    //
    //                 <div>
    //         <span className="signup-link">Password Lost? <Link
    //             onClick={() => setShowRecoveryPassword(true)}>Recovery password</Link></span>
    //                     <SendRecuperaPasswordModal isOpen={showRecoveryPassword}
    //                                                onClose={() => setShowRecoveryPassword(false)}/>
    //                 </div>
    //             </div>
    //
    //         </div>
    //         </Container>
    //
    //     </Grid>
    //
    // </Grid.Container>
};
export default Login;
