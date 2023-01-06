import React, {Component} from 'react';
import {GOOGLE_AUTH_URL} from "../constants";
import googleLogo from "../assets/google-logo.png";

export const SocialSignup = () => {

    return (
        <>
            <div className="social-signup">
                <img className="login-container" src={googleLogo} alt="A grey image showing text 60 x 60"/>
                <a className="google" href={GOOGLE_AUTH_URL}>  Log in with Google</a>
            </div>


        </>
    );

}
