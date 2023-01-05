import React, {Component} from 'react';
import {SocialSignup} from "../login/SocialSignup";
import {SignupForm} from "../../components/SignupForm";
import {RoutesPaths} from "../../navigation/root.routes";
import {Link} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
export const Signuppp = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="signup-container">
                <div className="signup-content">
                    <h1 className="signup-title">Signup Spring Security Project</h1>
                    <SocialSignup/>
                    <div className="or-separator">
                        <span className="or-text">OR</span>
                    </div>
                    <SignupForm/>

                    <span className="login-link">Already have an account? <Link
                        onClick={() => navigate(RoutesPaths.LOGIN.toString())}>Login!</Link></span>
                </div>
            </div>
        </>
    );

}
