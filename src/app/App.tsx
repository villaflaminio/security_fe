import React from 'react';
import Login from "../screens/login/login.page";
import {ToastProvider} from "../providers/toast.provider";
import {Route, Routes} from 'react-router-dom';
import {AppRoutes} from "../navigation/root.routes";

function App() {
    return (
        <>
            <ToastProvider>
                <Routes>
                    <Route {...AppRoutes.INDEX}/>
                    <Route {...AppRoutes.LOGIN}/>
                    <Route {...AppRoutes.HOME} />
                    <Route {...AppRoutes.NOT_FOUND}/>
                </Routes>
            </ToastProvider>
        </>
    );
}

export default App;
