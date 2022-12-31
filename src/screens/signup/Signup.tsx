import React, {Component} from 'react';
import {SocialSignup} from "../login/SocialSignup";
import {SignupForm} from "./SignupForm";
import {RoutesPaths} from "../../navigation/root.routes";
import {Link} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import './Signup.css';
export const Signup = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="signup-container">
                <div className="signup-content">
                    <h1 className="signup-title">Signup with SpringSocial</h1>
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
