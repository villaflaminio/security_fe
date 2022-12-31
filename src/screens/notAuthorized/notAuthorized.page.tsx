import React from 'react';
import {Center, Text, VStack} from '@chakra-ui/react';
import {ReactComponent as NotFound} from 'assets/general/not_found.svg';
import {useNavigate} from 'react-router-dom';

export const NotAuthorizedPage = () => {
    const navigate = useNavigate();

    return (
        <Center h={'100vh'} overflowY={'hidden'}>
            <VStack>

                <NotFound width={'300px'} height={'300px'}/>
                <Text color={'titleColor'} fontSize={'large'}>Non sei autorizzato a vedere questa pagina</Text>
                <button  color={'titleColor'}  onClick={()=>navigate(-1)} >{'back'} </button>
            </VStack>
        </Center>
    );
};
