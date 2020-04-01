import React, { useContext } from "react";
import {
    AppstoreOutlined,
    AccountBookOutlined,
    LoginOutlined,
    UserAddOutlined,
    UserOutlined
} from "@ant-design/icons";
import AuthContext from "../../../context/auth/authContext";
import { NavLink } from 'react-router-dom'
const HeaderMenu = () => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, logout, user } = authContext;
    const userLink = (<>
        <li className="user"> 
            <UserOutlined /> 
            {' '}Hi,<strong> {user && user.email.split("@")[0]}</strong>
            {' '} <a 
                    href="#!"
                    onClick={()=> logout()}
                    >Logout</a>
        </li>
    </>)
    const guessLink =(<>
                <li>
                    <LoginOutlined />
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                    <UserAddOutlined/>
                    <NavLink to="/register">Register</NavLink>
                </li>
    </>)
    return (
        <>
            <ul>
                <li>
                    <AppstoreOutlined />
                    <NavLink exact to="/">Home</NavLink>
                </li>
                <li>
                    <AccountBookOutlined />
                    <NavLink to="/about">About</NavLink>
                </li>
                {
                    isAuthenticated ? userLink : guessLink
                }
            </ul>
        </>
    );
};

export default HeaderMenu;
