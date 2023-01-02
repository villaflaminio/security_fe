import React, {useState} from 'react';
import {
    Button,
    Input, Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from "../../../store/store.config";
import {AuthActions} from "../../../store/auth/auth.action";
import {uiManagerActions} from "../../../store/uiManager/uiManager.action";
import {RoutesPaths} from "../../../navigation/root.routes";
import {AuthService} from "../../../service/auth.service";
import {AxiosResponse} from "axios/index";
import {appAxios} from "../../../service/axios.config";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const SendRecuperaPasswordModal = (props: Props) => {
    const [email, setEmail] = useState('');
    const dispatch = useAppDispatch();

    const handleSend = async () => {
        const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        if (emailRegex.test(email)) {
             await appAxios.post(`/api/auth/recoveryPassword`, {}, {
                params: {email: email}
            })
                .catch((error) => {
                    console.log(error);
                })
                .then((response) => {
                    if (response) {
                        dispatch(uiManagerActions.showToast({
                            title: 'Success',
                            description: 'La mail di reset password è stata inviata correttamente',
                            status: 'success',
                        }))
                        props.onClose();
                    } else {
                        dispatch(uiManagerActions.showToast({
                            title: 'Error',
                            description: 'Si è verificato un errore',
                            status: 'error',
                        }))
                    }
                })

        } else {
            dispatch(uiManagerActions.showToast({
                title: 'Errore',
                description: 'Email non valida',
                status: 'error',
            }))
        }
    }

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Recovery password</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    Procedi con il recupero della password!
                    <Input value={email} onChange={(e) => setEmail(e.target.value)}
                           placeholder={'Inserisci la tua email'} type={'email'}/>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={props.onClose}>
                        Close
                    </Button>
                    <Button variant='ghost' onClick={handleSend}>Invia email</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
};

export default SendRecuperaPasswordModal
