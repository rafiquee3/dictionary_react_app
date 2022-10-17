import Dictionary from "../Dictionary/Dictionary";
import React, { useContext } from "react";
import { Routes, Route, Navigate} from "react-router";
import RegisterForm from "../RegisterForm/RegisterForm";
import { StoreContext } from "../../store/StoreProvider";
import styled, { css } from 'styled-components';

const Main = styled.main`
    display: flex;
    margin-top: 60px;
    flex-direction: column;
    align-items: center;
`

const Content = () => {
    const {user, setUser, words, setWords, testMode, editMode} = useContext(StoreContext);
    const isUserLogged = Boolean(user); 

    return (
        <>
            <Main>
                <Routes>
                    { !isUserLogged && <Route path="/" element={<RegisterForm />} />}
                    { isUserLogged && <Route path="/" element={<Dictionary />} />}
                </Routes>
            </Main>
        </>
    )
}
export default Content;
