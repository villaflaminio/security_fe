import React from 'react';
import Login from "../screens/login/LoginPage";
import {ToastProvider} from "../providers/toast.provider";

function App() {
    return (
        <>
            <ToastProvider>
                <Login/>
            </ToastProvider>
        </>
    );
}

export default App;
