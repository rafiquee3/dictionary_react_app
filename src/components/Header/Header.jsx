import React, { useContext } from "react";
import AddWordForm from "../Dictionary/subcomponents/AddWordForm/AddWordForm";
import LoginForm from "../LoginForm/LoginForm";
import MemoMode from "../Dictionary/subcomponents/MemoMode/MemoMode";
import SearchForm from "../Dictionary/subcomponents/SearchForm/SearchForm";
import styled from 'styled-components';
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
    const { 
        testMode, 
        setTestMode, 
        user, 
        showMemoMode, 
        setShowMemoMode, 
        showSearch, 
        setShowSearch,
        showAddWord, 
        setShowAddWord, 
    } = useContext(StoreContext);
    
    const handleOnClick = () => {
        setTestMode(!testMode);
    }
    const handleMemoClick = () => {
        setShowMemoMode(!showMemoMode);
    }
    const handleSearchClick = () => {
        setShowSearch(!showSearch);
    }
    const handleNewWordClick = () => {
        setShowAddWord(!showAddWord);
    }

    return (
        <>
            <Wrapper>
                <p>Dictionary</p>
                { user && !testMode && <Button onClick={ () => handleNewWordClick() }>New word</Button> }
                { user && !testMode && <Button onClick={ () => handleSearchClick() }> Search </Button> }
                { user && <Button onClick={ () => handleOnClick() }> { testMode ? 'results' : 'test' } </Button> }
                { user && !testMode && <AddWordForm/> }
                { user && !testMode && <Button onClick={ () => handleMemoClick() }>Memo mode</Button> }
                { user && showSearch && <SearchForm /> }
                { user && showMemoMode && <MemoMode /> }
                <LoginForm />
            </Wrapper>
        </>
    )
}
export default Header;