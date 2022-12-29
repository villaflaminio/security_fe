import {ToastPosition} from "@chakra-ui/toast/dist/toast.placement";
export interface UiManagerState {
    toast?: ToastMessage;
}

export interface ToastMessage {
    title: string;
    description: string;
    isI18nKey?: boolean;
    duration?: number;
    position? : ToastPosition,
    status: ToastMessageStatus;
    isClosable?: boolean;
}

export type ToastMessageStatus = "info" | "warning" | "success" | "error" | undefined
