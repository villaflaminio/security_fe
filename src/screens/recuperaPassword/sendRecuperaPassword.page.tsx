import React, {useState} from 'react';
import {Box, Button, Center, Input, Text, VStack} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from "../../store/store.config";
import {AuthActions} from "../../store/auth/auth.action";
import {uiManagerActions} from "../../store/uiManager/uiManager.action";
import {RoutesPaths} from "../../navigation/root.routes";

const SendRecuperaPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const handleSend = () => {
        const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        if (emailRegex.test(email)) {
            setIsLoading(true);
            dispatch(AuthActions.sendResetPasswordAction(email)).then((response) => {
                if (response.payload) {
                    dispatch(uiManagerActions.showToast({
                        title: 'Success',
                        description: 'La mail di reset password è stata inviata correttamente',
                        status: 'success',
                    }))
                }
                navigate(RoutesPaths.LOGIN.toString())
            }).finally(() => {
                setIsLoading(false);
            });
        } else {
            dispatch(uiManagerActions.showToast({
                title: 'Ops...',
                description: 'Sembra che la mail inserita non sia valida!',
                status: 'error',
            }))
        }
    }

    return (
        <Box h={'20vh'} overflowY={'hidden'}>
            <Box h={5}/>
            <Center>
                <VStack align={'start'} justifyContent={'start'}>
                    <Text color={'titleColor'} fontWeight={'semibold'} fontSize={'large'}>Sembra che tu abbia problemi
                         ad accedere,</Text>
                    <Text color={'titleColor'} fontSize={'md'}>Procedi con il recupero della password!</Text>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)}
                           placeholder={'Inserisci la tua email'} type={'email'}/>
                    <Button color={'titleColor'} fontWeight={'bold'} isLoading={isLoading}
                            onClick={handleSend}>Invia il
                        link di recupero </Button>
                </VStack>
            </Center>
        </Box>
    )
};

export default SendRecuperaPasswordPage
