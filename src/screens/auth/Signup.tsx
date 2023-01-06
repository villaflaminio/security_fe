import React, {Component} from 'react';
import {Link} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import BoxedLayout from "../../components/BoxedLayout";
import {Box, Button, Typography} from "@mui/material";
import {SignupForm} from "../../components/SignupForm";
import {RoutesPaths} from "../../navigation/root.routes";
export const Signup = () => {

    const navigate = useNavigate();
    return (
        <BoxedLayout>
            <Typography component="h1" variant="h5">
               Sign up
            </Typography>
            <SignupForm/>
            <Button
                onClick={() => navigate(RoutesPaths.LOGIN.toString())}
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
            >
                Back to login
            </Button>
        </BoxedLayout>
    );

}
