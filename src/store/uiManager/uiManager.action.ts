import {createAction} from '@reduxjs/toolkit';
import {ToastMessage} from "./types";


export const enum UI_MANAGER_ACTION {
    SHOW_TOAST = 'settings/SET_LANGUAGE',
}

const showToast = createAction(UI_MANAGER_ACTION.SHOW_TOAST, (params:ToastMessage) => {
    return { payload: params };
})


export const uiManagerActions = {
    showToast,
}
