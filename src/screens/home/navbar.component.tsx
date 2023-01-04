import {Props} from "../../providers/types";
import {Avatar, Dropdown, Link, Navbar, Text} from "@nextui-org/react";
import React, {useEffect} from "react";
import {UtenteModel} from "../../models/utente.model";
import {AuthService} from "../../service/auth.service";
import {useAppDispatch, useAppSelector} from "../../store/store.config";
import {Logo} from "./Logo";
import {RoutesPaths} from "../../navigation/root.routes";
import {AuthActions} from "../../store/auth/auth.action";
import {useNavigate} from "react-router-dom";
import {DropdownProvider} from "@nextui-org/react/types/dropdown/dropdown-context";

const NavbarComponent: React.FC<Props> = ({children}) => {
    const [localUser, setUser] = React.useState<UtenteModel>();
    const authUser = useAppSelector(state => state.authReducer.user);
    const isAuth = useAppSelector(state => state.authReducer.isAuth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const collapseItems = [
        "Profile",
        "Dashboard",
        "Log Out",
    ];

    async function getCurrentUser() {
        const user = await AuthService.getCurrentUser();
        setUser(user);
    }

    useEffect(() => {
        if (authUser && isAuth) {
            setUser(authUser);
        } else {
            getCurrentUser();
        }
    }, [])
    const logout = () => {
        dispatch(AuthActions.logoutAction());
        navigate(RoutesPaths.LOGIN.toString())
    }

    const handleDropdownClick = (actionKey: string) => {

        //switch case
        switch (actionKey) {
            case "logout":
                logout();
                break;
            case "change_password":
                navigate(RoutesPaths.CHANGE_PASSWORD.toString());
                break;
        }

    }

    return (
        <>
            <Navbar isBordered variant="sticky">
                <Navbar.Toggle showIn="xs"/>
                <Navbar.Brand
                    css={{
                        "@xs": {
                            w: "12%",
                        },
                    }}
                >
                    <Text b color="inherit" hideIn="xs">
                        SONO UN LOGO
                    </Text>
                </Navbar.Brand>
                <Navbar.Content
                    enableCursorHighlight
                    activeColor="secondary"
                    hideIn="xs"
                    variant="highlight-rounded">
                    <Navbar.Link href="#">Features</Navbar.Link>
                    <Navbar.Link isActive href="#">
                        Customers
                    </Navbar.Link>
                    <Navbar.Link href="#">Pricing</Navbar.Link>
                    <Navbar.Link href="#">Company</Navbar.Link>
                </Navbar.Content>
                <Navbar.Content
                    css={{
                        "@xs": {
                            w: "12%",
                            jc: "flex-end",
                        },
                    }}
                >
                    <Dropdown placement="bottom-right">
                        <Navbar.Item>
                            <Dropdown.Trigger>
                                <Avatar
                                    bordered
                                    as="button"
                                    color="secondary"
                                    size="md"
                                    src={localUser?.imageUrl}
                                />
                            </Dropdown.Trigger>
                        </Navbar.Item>
                        <Dropdown.Menu
                            aria-label="User menu actions"
                            color="secondary"
                            onAction={(actionKey) => handleDropdownClick(actionKey.toString())}
                        >
                            <Dropdown.Item key="profile" css={{height: "$18"}}>
                                <Text b color="inherit" css={{d: "flex"}}>
                                    Signed in as {localUser?.name}

                                </Text>
                                <Text b color="inherit" css={{d: "flex"}}>
                                    {localUser?.email}
                                </Text>
                            </Dropdown.Item>
                            <Dropdown.Item key="settings" withDivider>Profile Settings</Dropdown.Item>
                            <Dropdown.Item key="change_password">Change password</Dropdown.Item>
                            <Dropdown.Item key="logout" withDivider color="error">
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Content>
                <Navbar.Collapse>
                    {collapseItems.map((item, index) => (
                        <Navbar.CollapseItem
                            key={item}
                            activeColor="secondary"
                            css={{
                                color: index === collapseItems.length - 1 ? "$error" : "",
                            }}
                            isActive={index === 2}
                        >
                            <Link
                                color="inherit"
                                css={{
                                    minWidth: "100%",
                                }}
                                href="#"
                            >
                                {item}
                            </Link>
                        </Navbar.CollapseItem>
                    ))}
                </Navbar.Collapse>
            </Navbar>
            {children}
        </>
    );
};

export default NavbarComponent;
