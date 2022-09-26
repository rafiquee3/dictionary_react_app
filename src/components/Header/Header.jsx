import React from "react";
import AddWordForm from "../Dictionary/subcomponents/AddWordForm/AddWordForm";
import LoginForm from "../LoginForm/LoginForm";
import styled, { css } from 'styled-components';

const Wrapper = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    z-index: 10;
    background: #DB7193;
    color: white;
    font-size: 25px;
`

const Header = () => {
    return (
        <>
            <Wrapper>
                <p>Dictionary</p>
                <AddWordForm />
                <LoginForm />
            </Wrapper>
        </>
    )
}
export default Header;