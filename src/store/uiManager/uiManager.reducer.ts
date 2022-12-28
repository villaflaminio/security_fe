import {createReducer} from '@reduxjs/toolkit';
import {UiManagerState} from './types';
import {uiManagerActions} from "./uiManager.action";

const initialState: UiManagerState = {

};

export const uiManagerReducer = createReducer(initialState, (builder) => {
    builder.addCase(uiManagerActions.showToast, (state, action) => {
        const toastMessage = action.payload;
        return {
            ...state,
            toast : toastMessage
        }
    });
    builder.addDefaultCase((state, action) => {
        return state;
    });
});
