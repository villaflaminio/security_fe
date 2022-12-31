import React, {FC, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Center, Spinner} from '@chakra-ui/react';
import {useAppDispatch, useAppSelector} from "../store/store.config";
import {AuthActions} from "../store/auth/auth.action";
import {Props} from "./types";


export const AuthProvider: React.FC<Props> = ({children}) => {

    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.authReducer.isAuth);
    const initialized = useAppSelector(state => state.authReducer.initialized);
    // const {prenotazione} = useAppSelector(state => state.checkinReducer);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        handleAuth()
    }, [])


    const handleAuth = async () => {
        if (!isAuth && !initialized) {
            await dispatch(AuthActions.authenticateWithToken())
        }
        setIsLoading(false);
    }


    return (
        <>
            {isLoading || !initialized ?
                <Center h={'100vh'} w={'full'}>
                    <Spinner/>
                </Center>
                : children}
        </>
    );
};

