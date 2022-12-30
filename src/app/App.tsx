import React from 'react';
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
                    <Route {...AppRoutes.OAUT2_REDIRECT}/>
                </Routes>
            </ToastProvider>

        </>
    );
}

export default App;
