import React, { useContext, useRef, useState, useEffect } from "react";
import Modal from "../../Modal/Modal";
import useModal from "../../Modal/useModal";
import { StoreContext } from "../../../store/StoreProvider";
import styled, { css } from 'styled-components';

const Button = styled.button`
    background: ${props => props.bgcolor || 'white'};
    border-radius: 4px;
    border-color: #584894;
    padding: 15px;
    color: white;
`
const CloseButton = styled.button`
    display: block;
    width: 20px;
    background: transparent;
    border: none;
    color: white;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    background: #584894;
    border-radius: 4px;
    border-color: #584894;
    padding: 15px;
    color: white;
`
const Input = styled.input`
    background: 'white';
    border-radius: 4px;
    border-color: #584894;
    padding: 15px;
    color: black;
`

const SearchForm = () => {
    const [search, setSearch] = useState('');
    const [validateMessage, setValidateMessage] = useState('');
    const {isShowing: isSearchFormShowed, toggle: toggleSearchForm} = useModal();
    const modalRef = useRef(null);

    const {
        searchValue, 
        setSearchValue,
        searchMode, 
        setSearchMode,} = useContext(StoreContext);

    const searchHandler = event => {
        setSearch(event.target.value);
    }

    const clearInputField = () => {
        setSearch('');
        setValidateMessage('');
    }
    const openOrClosedModal = () => {
        clearInputField();
        toggleSearchForm();
    }

    const toggleSubmit = (event) => {
        event.preventDefault();
        setSearchValue(search);
        setSearchMode(true);
    }

    const handleCloseBttn = () => {
      setSearchMode(false);
      openOrClosedModal();
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            if(!search) {
              setSearchMode(false);
              openOrClosedModal();
            }
          }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true); // 3th arg listen on capturing phase instead off bubbling phase
        };
      }, [ toggleSearchForm ]);

    const handleKeypress = event => {
    
        if (event.code === 'Enter') {
          toggleSubmit(event);
        }
    };

    return (
        <>
        <Button onClick={() => openOrClosedModal()} bgcolor="#9583DB">Search</Button>
        <Modal  isShowing={isSearchFormShowed}>
            <Form ref={modalRef} onSubmit={toggleSubmit} method="post" onKeyPress={event => handleKeypress(event)}>       
                <CloseButton onClick={() => handleCloseBttn()}>X</CloseButton>
                {validateMessage}
                
                <Input type="text" placeholder="Search..." value={search} onChange={searchHandler}/>

                <Button type="submit" value="search" bgcolor="#584894">search</Button>
          
            </Form>
        </Modal>
        </>
    )
}
export default SearchForm;