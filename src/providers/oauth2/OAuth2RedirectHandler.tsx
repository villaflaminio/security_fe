import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {RoutesPaths} from "../../navigation/root.routes";
import {Button, Center, Text, VStack} from "@chakra-ui/react";
import {useAppDispatch} from "../../store/store.config";
import {uiManagerActions} from "../../store/uiManager/uiManager.action";
import {AuthActions} from "../../store/auth/auth.action";
import {LoginAuthenticateResponse} from "../../store/auth/types";
import {AuthService} from "../../service/auth.service";
import {authReducer} from "../../store/auth/auth.reducer";

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);

    async function finalizeLogin(token: string) {
        await dispatch(AuthActions.loginWithOAuth2(token))
    }

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
            finalizeLogin(token).then(() => {
                navigate(RoutesPaths.ADMIN.toString())
            });
        } else {
            dispatch(uiManagerActions.showToast({
                title: 'Error',
                description: 'Invalid token',
                status: 'error',
                duration: 5000,
            }))
        }
    });

    return (
        <Center h={'100vh'} overflowY={'hidden'}>
            <VStack>
                <Text color={'titleColor'} fontSize={'large'}>{('Errore durante il login , riprova piu tardi')}</Text>
                <Button color={'titleColor'} fontWeight={'bold'}
                        onClick={() => navigate(RoutesPaths.LOGIN.toString())}>{('BACK_TO_PREVIOUS_PAGE')} </Button>
            </VStack>
        </Center>
    );
}

export default OAuth2RedirectHandler
