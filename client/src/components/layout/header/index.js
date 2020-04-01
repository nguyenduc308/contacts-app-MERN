import React from "react";
import { Typography } from "antd";
import {
    HeaderStyled,
    HeaderContainerStyled,
    HeaderRow,
    LogoStyle
} from "./headerStyled";
import HeaderMenu from "./Menu";
import Search from './Search'
const { Title } = Typography;

const Header = () => {
    return (
        <HeaderStyled>
            <HeaderContainerStyled>
                <HeaderRow>
                    <LogoStyle>
                        <Title level={2}>
                            <span>My Contacts</span>
                        </Title>
                    </LogoStyle>
                    <Search />
                    <HeaderMenu />
                </HeaderRow>
            </HeaderContainerStyled>
        </HeaderStyled>
    );
};

export default Header;
