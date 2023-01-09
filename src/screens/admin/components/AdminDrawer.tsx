import {Avatar, Box, Drawer, Icon, List, ListItem, ListItemAvatar, ListItemButton, ListItemText} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Logo from "../../../components/Logo";
import {NavLink, useNavigate} from "react-router-dom";
import React from "react";
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {RoutesPaths} from "../../../navigation/root.routes";
import {UtenteModel} from "../../../models/utente.model";
import LogoutIcon from '@mui/icons-material/Logout';
import {AuthActions} from "../../../store/auth/auth.action";
import {useAppDispatch} from "../../../store/store.config";
import {AdminPaths, AdminRoutes} from "../../../navigation/admin.routes";

type AdminDrawerProps = {
    collapsed: boolean;
    mobileOpen: boolean;
    onDrawerToggle: () => void;
    onSettingsToggle: () => void;

    user?: UtenteModel;
};

export const menuItems = [
    {
        icon: HomeIcon,
        key: "home",
        path: "/admin",
    },
    {
        icon: BarChartIcon,
        key: "dashboard",
        path: "/admin/dashboard",
    },
    {
        icon: PeopleIcon,
        key: "userManagement",
        path: "/admin/user-management",
    }
];

const AdminDrawer = ({
                         collapsed,
                         mobileOpen,
                         onDrawerToggle,
                         onSettingsToggle,
                         user,
                     }: AdminDrawerProps) => {

    const navigate = useNavigate()
    const width = collapsed ? 104 : 280;
    const dispatch = useAppDispatch();

    const logout = () => {
        dispatch(AuthActions.logoutAction());
        navigate(RoutesPaths.LOGIN.toString())
    }
    const drawer = (
        // eslint-disable-next-line react/jsx-no-undef
        <Box sx={{display: "flex", flexDirection: "column", minHeight: "100%"}}>
            <Logo sx={{display: "flex", p: 4}}/>
            <List component="nav" sx={{px: 2}}>
                {menuItems.map((item) => (
                    <ListItemButton
                        onClick={() => navigate(AdminPaths.DASHBOARD.toString())}
                        key={(item.key)}
                    >
                        <ListItemAvatar>
                            <Avatar sx={{color: "inherit", bgcolor: "transparent"}}>
                                <item.icon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={(item.key)}
                            sx={{
                                display: collapsed ? "none" : "block",
                            }}
                        />
                    </ListItemButton>
                ))}
            </List>
            <Box sx={{flexGrow: 1}}/>
            <List component="nav" sx={{p: 2}}>
                <ListItemButton
                    onClick={() => navigate(RoutesPaths.SIGN_UP.toString())}
                >
                    <ListItemAvatar>

                        {user && (
                            <Avatar alt="user" src={user?.imageUrl}/>
                        )}
                        {!user && (
                            <Avatar>
                                <AccountCircleIcon/>
                            </Avatar>
                        )}

                    </ListItemAvatar>
                    {user && (
                        <ListItemText
                            primary={`${user.name}`}
                            sx={{
                                display: collapsed ? "none" : "block",
                            }}
                        />
                    )}
                </ListItemButton>

                <ListItemButton
                    onClick={logout}
                >
                    <ListItemAvatar>
                        <Avatar sx={{color: "inherit", bgcolor: "transparent"}}>
                            <LogoutIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Logout"
                        sx={{
                            display: collapsed ? "none" : "block",
                        }}
                    />
                </ListItemButton>

            </List>
        </Box>
    );

    return (
        <Box
            aria-label="Admin drawer"
            component="nav"
            sx={{
                width: {lg: width},
                flexShrink: {lg: 0},
            }}
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: {xs: "block", lg: "none"},
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: width,
                    },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                open
                sx={{
                    display: {xs: "none", lg: "block"},
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: width,
                    },
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

export default AdminDrawer;
