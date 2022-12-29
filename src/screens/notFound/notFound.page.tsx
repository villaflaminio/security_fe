import React from 'react';
import {Button, Center, Text, VStack} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
            <Center h={'100vh'} overflowY={'hidden'}>
                <VStack>
                    <Text color={'titleColor'} fontSize={'large'}>{('common:ERRORS:404:DESCRIPTION')}</Text>
                    <Button color={'titleColor'} fontWeight={'bold'} onClick={()=>navigate(-1)} >{('common:BUTTONS:BACK_TO_PREVIOUS_PAGE')} </Button>
                </VStack>
            </Center>
    )
};

export default NotFoundPage
