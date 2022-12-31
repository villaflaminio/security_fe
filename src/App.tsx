import React, {Suspense} from 'react';
import {ToastProvider} from "./providers/toast.provider";
import {Route, Routes} from 'react-router-dom';
import {AppRoutes} from "./navigation/root.routes";
import {Center, Spinner} from "@chakra-ui/react";

function App() {
    return (
        <>
            <Suspense fallback={
                <Center h={'100vh'} w={'full'}>
                    <Spinner/>
                </Center>
            }>
                <ToastProvider>
                    <Routes>
                        <Route {...AppRoutes.INDEX}/>
                        <Route {...AppRoutes.LOGIN}/>
                        <Route {...AppRoutes.HOME} />
                        <Route {...AppRoutes.NOT_FOUND}/>
                        <Route {...AppRoutes.OAUT2_REDIRECT}/>
                    </Routes>
                </ToastProvider>
            </Suspense>
        </>
    );
}

export default App;
