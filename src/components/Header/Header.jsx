import React, { useContext } from "react";
import AddWordForm from "../Dictionary/subcomponents/AddWordForm/AddWordForm";
import LoginForm from "../LoginForm/LoginForm";
import SearchForm from "../Dictionary/SearchForm/SearchForm";
import styled, { css } from 'styled-components';
import { StoreContext } from "../../store/StoreProvider";

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
const Button = styled.button`
    background: ${props => props.bgcolor || 'white'};
    border-radius: 4px;
    border-color: #584894;
    padding: 15px;
    color: black;
`

const Header = () => {
    const { testMode, setTestMode, page, setPage} = useContext(StoreContext);
    
    const handleOnClick = () => {
        setTestMode(!testMode);
    }
    
    return (
        <>
            <Wrapper>
                <p>Dictionary</p>
                <AddWordForm />
                <SearchForm />
                <Button onClick={handleOnClick}> { testMode ? 'results' : 'test'} </Button>
                <LoginForm />
            </Wrapper>
        </>
    )
}
export default Header;