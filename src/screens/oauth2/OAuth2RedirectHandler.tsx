import React from 'react';
import {useNavigate} from 'react-router-dom';
import {RoutesPaths} from "../../navigation/root.routes";
import {Button, Center, Text, VStack} from "@chakra-ui/react";
import {useAppDispatch} from "../../store/store.config";
import {uiManagerActions} from "../../store/uiManager/uiManager.action";
import {AuthActions} from "../../store/auth/auth.action";
import {LoginAuthenticateResponse} from "../../store/auth/types";
import {AuthService} from "../../service/auth.service";

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    async function getUserMe(token: string) {
        try {
            AuthService.setAccessToken(token);
            const responseData = await dispatch(AuthActions.getCurrentUser())
            if (!responseData) {
                dispatch(uiManagerActions.showToast({
                    title: 'Error',
                    description: 'Invalid token',
                    status: 'error',
                    duration: 5000,
                }))
            } else {
                dispatch(uiManagerActions.showToast({
                    title: 'Login effettuato con successo',
                    description: 'Benvenuto',
                    status: 'success',
                }))

                navigate(RoutesPaths.HOME.toString())
            }
        } catch (e) {
            dispatch(uiManagerActions.showToast({
                title: 'Error',
                description: 'Invalid token',
                status: 'error',
                duration: 5000,
            }))
        }
    }

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        if (token) {
            getUserMe(token);
        } else {
            dispatch(uiManagerActions.showToast({
                title: 'Error',
                description: 'Invalid token',
                status: 'error',
                duration: 5000,
            }))
        }
    });

    // function getUrlParameter(token: string): string {
    //     const urlParams = new URLSearchParams(window.location.search);
    //     token = token.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    //     var regex = new RegExp('[\\?&]' + token + '=([^&#]*)');
    //
    //     var results = regex.exec(urlParams.toString());
    //     return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    // };


    return (
        <Center h={'100vh'} overflowY={'hidden'}>
            <VStack>
                <Text color={'titleColor'} fontSize={'large'}>{('Errore durante il login , riprova piu tardi')}</Text>
                <Button color={'titleColor'} fontWeight={'bold'}
                        onClick={() => navigate(-1)}>{('BACK_TO_PREVIOUS_PAGE')} </Button>
            </VStack>
        </Center>
    );
}

export default OAuth2RedirectHandler
