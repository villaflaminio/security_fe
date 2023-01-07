import React, {useEffect} from "react";
import {AuthActions} from "../../../store/auth/auth.action";
import {uiManagerActions} from "../../../store/uiManager/uiManager.action";
import {RoutesPaths} from "../../../navigation/root.routes";
import {useAppDispatch} from "../../../store/store.config";
import {useNavigate, useParams} from "react-router-dom";
import ResetPasswordPage from "../pages/resetPassword.page";

const ChangePasswordHandler = () => {

    const dispatch = useAppDispatch();
    const params = useParams();
    const [canChange, setCanChange] = React.useState(false);
    const navigate = useNavigate()

    const getJWT = async () => {
        if (params.id) {
            await dispatch(AuthActions.getJwtFromResetPasswordTokenAction(params.id)).then((response) => {
                if (!response.payload) {

                    dispatch(uiManagerActions.showToast({
                        title: 'Error',
                        description: 'Link scaduto, ripetere la procedura di reset password',
                        status: 'error',
                    }))
                    navigate(RoutesPaths.LOGIN.toString())
                } else {
                    setCanChange(true);
                }
            }).catch((error) => {
                console.log(error);
                dispatch(uiManagerActions.showToast({
                    title: 'Error',
                    description: 'Error during JWT request',
                    status: 'error',
                }))
            })
        } else {
            dispatch(uiManagerActions.showToast({
                title: 'Error',
                description: 'Link recupero password corrotto',
                status: 'error',
            }))
        }
    }


    useEffect(() => {
        getJWT();
    }, [])

    if (canChange) {
        return <ResetPasswordPage/>
    } else {
        return (
            <div className="login-container">
                <div className="login-content">
                    <h1 className="form-item"> Loading... </h1>
                </div>
            </div>
        )
    }
}
export default ChangePasswordHandler