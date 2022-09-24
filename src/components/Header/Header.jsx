import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import styled, { css } from 'styled-components';
import Modal from "../Modal/Modal";
import useModal from "../Modal/useModal";

const Wrapper = styled.header`
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
                <LoginForm />
            </Wrapper>
        </>
    )
}
export default Header;