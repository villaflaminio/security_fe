import {ToastPositionWithLogical} from '@chakra-ui/react'
export interface UiManagerState {
    toast?: ToastMessage;
}

export interface ToastMessage {
    title: string;
    description: string;
    isI18nKey?: boolean;
    duration?: number;
    position? : ToastPositionWithLogical,
    status: ToastMessageStatus;
    isClosable?: boolean;
}

export type ToastMessageStatus = "info" | "warning" | "success" | "error" | undefined
