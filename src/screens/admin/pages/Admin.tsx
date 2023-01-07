import React, {useEffect, useState} from "react";
import {Box} from "@mui/material";
import AdminDrawer from "../components/AdminDrawer";
import {useSettings} from "../../../providers/SettingsProvider";
import {useAppSelector} from "../../../store/store.config";
import {RoutesPaths} from "../../../navigation/root.routes";
import {useNavigate} from "react-router-dom";
import {UtenteModel} from "../../../models/utente.model";

const AdminLayout = () => {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const {user} = useAppSelector(state => state.authReducer);

    const isAuth = useAppSelector(state => state.authReducer.isAuth);
    const navigate = useNavigate();
    const {collapsed, open, toggleDrawer} = useSettings();

    const handleSettingsToggle = () => {
        setSettingsOpen(!settingsOpen);
    };

    useEffect(() => {
        if (!isAuth || !user) {
            navigate(RoutesPaths.LOGIN.toString())
        }
    }, [])

    return (
        <Box sx={{display: "flex"}}>
            <AdminDrawer
                collapsed={collapsed}
                mobileOpen={open}
                onDrawerToggle={toggleDrawer}
                onSettingsToggle={handleSettingsToggle}
                user={user as UtenteModel}
            />
            {/*<SettingsDrawer*/}
            {/*  onDrawerToggle={handleSettingsToggle}*/}
            {/*  open={settingsOpen}*/}
            {/*/>*/}
            {/*<Box component="main" sx={{ flexGrow: 1, pb: 3, px: { xs: 3, sm: 6 } }}>*/}
            {/*  <Toolbar />*/}
            {/*  <QueryWrapper>*/}
            {/*    <Outlet />*/}
            {/*  </QueryWrapper>*/}
            {/*</Box>*/}
        </Box>
    );
};

export default AdminLayout;
