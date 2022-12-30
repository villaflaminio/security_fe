import React, {useEffect} from 'react';
import './style/Login.css';
import './style/Button.css';
import './style/Form.css';
import {useToast} from '@chakra-ui/react'

import {useForm, Resolver, SubmitHandler} from 'react-hook-form';
import {store, useAppDispatch, useAppSelector} from "../../store/store.config";
import {LoginAuthenticateResponse, LoginParams, LoginResponseDto} from "../../store/auth/types";
import {AxiosError, AxiosResponse} from "axios/index";
import {appAxios} from "../../service/axios.config";
import {uiManagerActions} from "../../store/uiManager/uiManager.action";


function TestGrants() {
    const {register, handleSubmit} = useForm<LoginParams>();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.authReducer.id);
    const toast = useToast()

    const testUserGrant = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response: AxiosResponse<LoginResponseDto> = await appAxios.get(`/api/user/testGrants`);

            if (response.status === 200) {
                dispatch(uiManagerActions.showToast({
                    title: "Success",
                    description: "You have the USER right to access this resource",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                }));
            }
        } catch (error) {
            const err = error as AxiosError
            console.log(err.response?.status)
            dispatch(uiManagerActions.showToast({
                title: "Error",
                description: "You don't have the USER right to access this resource",
                status: "error",
                duration: 3000,
                isClosable: true,
            }));

        }
    }

    const testAdminGrant = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response: AxiosResponse<LoginResponseDto> = await appAxios.get(`/api/admin/testGrants`);

            if (response.status === 200) {
                dispatch(uiManagerActions.showToast({
                    title: "Success",
                    description: "You have the ADMIN right to access this resource",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                }));
            }
        } catch (e) {
            console.log('Request [loginRequest] error', e);
            dispatch(uiManagerActions.showToast({
                title: "Error",
                description: "You don't have the ADMIN right to access this resource",
                status: "error",
                duration: 3000,
                isClosable: true,
            }));
        }
    }

    return (
        <div>
            <form className="form-item" onSubmit={testUserGrant}>

                <button type="submit" className="btn btn-block btn-primary">Test user grant</button>
            </form>

            <form className="form-item" onSubmit={testAdminGrant}>
                <button type="submit" className="btn btn-block btn-primary">Test admin grant</button>
            </form>
            {/*<span className="signup-link">New user? <Link to="/signup">Sign up!</Link></span>*/}

        </div>
    )
        ;
}

export default TestGrants;
