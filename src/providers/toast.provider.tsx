import React, {FC, useEffect} from 'react';
import {useToast} from '@chakra-ui/react';
import {useAppSelector} from "../store/store.config";
import {ToastMessage} from "../store/uiManager/types";
import {Props} from "./types";


export const ToastProvider: React.FC<Props> = ({children}) => {
    const {toast} = useAppSelector(state => state.uiManagerReducer)
    const chakraToast = useToast()
    const TOAST_DURATION = 3000;

    useEffect(() => {
        if(toast?.description) {
            showToast(toast)
        }
    }, [toast])


    const showToast = (toastMessage:ToastMessage) => {
        chakraToast({
            title:  toastMessage.title,
            description:  toastMessage.description,
            duration:  TOAST_DURATION, //
            status: toastMessage.status,
            isClosable: toastMessage.isClosable,
            position: toastMessage.position? toastMessage.position : 'top-right'
        })
    }

    return (
        <>
            {children}
        </>
    );
};
