import React from "react";
import { Routes, Route, Navigate} from "react-router";
import RegisterForm from "../RegisterForm/RegisterForm";
import styled, { css } from 'styled-components';

const Main = styled.main`
    display: flex;
    flex-direction: column;
`

const Content = () => {
    return (
        <>
            <Main>
                <Routes>
                    <Route path="/" element={<RegisterForm />} />
                </Routes>
            </Main>
        </>
    )
}
export default Content;
