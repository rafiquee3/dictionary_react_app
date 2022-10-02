import React, { useContext, useRef, useState, useEffect } from "react";
import request from '../../../../helpers/request'
import Modal from "../../../Modal/Modal";
import useModal from "../../../Modal/useModal";
import { StoreContext } from "../../../../store/StoreProvider";
import styled, { css } from 'styled-components';

const Button = styled.button`
    background: ${props => props.bgcolor || 'white'};
    border-radius: 4px;
    border-color: #584894;
    padding: 15px;
    color: black;
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

const AddWordForm = () => {
    const [word, setWord] = useState('');
    const [translation, setTranslation] = useState('');
    const [validateMessage, setValidateMessage] = useState('');
    const {isShowing: iswordFormShowed, toggle: toggleWordForm} = useModal();
    const {user, setUser,  words, setWords, page, setPage} = useContext(StoreContext);
    const modalRef = useRef(null);

    const wordHandler = event => {
        setWord(event.target.value);
    }
    const toggleLogout = event => {
        setUser(null);
        setWords(null);
    }
    const translationHandler = event => {
        setTranslation(event.target.value);
    }
    const clearInputField = () => {
        setWord('');
        setTranslation('');
        setValidateMessage('');
    }
    const openOrClosedModal = () => {
        clearInputField();
        toggleWordForm();
    }
    const getNewListOfWords = async (collectionName) => {
        const {data, status} = await request.post(
            '/words/',
            {collection: collectionName}
        );
        if(status === 200) {
            setWords(data)
        }
        if(data.message) {
            setValidateMessage(data.message);
        }
    }
    const toggleSubmit = async (event) => {
        event.preventDefault();
        const collectionName = user;

        const {data, status} = await request.post(
            '/words/add',
            {word, translation, collection: collectionName}
        );
        if(status === 200) {
            console.log(data)
            toggleWordForm();
            clearInputField();
            setPage(0);
            getNewListOfWords(collectionName);
            
        }
        if(data.message) {
            setValidateMessage(data.message);
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {

          if (modalRef.current && !modalRef.current.contains(event.target)) {
            if(!word && !translation) {

            openOrClosedModal();
            }
          }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true); // 3th arg listen on capturing phase instead off bubbling phase
        };
      }, [ toggleWordForm ]);

    const handleKeypress = e => {
    
      if (e.code === 'Enter') {
        toggleSubmit(e);
      }
    };

    const errorWord = typeof validateMessage !== 'string' ? validateMessage
    .filter(message => message.field === "word")
    .map(message => <p key={message.error}>{message.field}: {message.error}</p>) : '';

    const errorTranslation = typeof validateMessage !== 'string' ? validateMessage
    .filter(message => message.field === "translation")
    .map(message => <p key={message.error}>{message.field}: {message.error}</p>) : '';

    const otherErrors = typeof validateMessage !== 'string' ? '' : validateMessage;

    return (
        <>
        <Button onClick={openOrClosedModal} bgcolor="#9583DB">New word</Button>
        <Modal  isShowing={iswordFormShowed}>
            <Form ref={modalRef} onSubmit={toggleSubmit} method="post" onKeyPress={e => handleKeypress(e)}>       
                <CloseButton onClick={openOrClosedModal}>X</CloseButton>
                
                <Input type="text" placeholder="word" value={word} onChange={wordHandler}/>
                {errorWord}
                <Input type="translation" placeholder="translation" value={translation} onChange={translationHandler}/>
                {errorTranslation}
                <Button type="submit" value="word" bgcolor="#584894">word</Button>
                {otherErrors}
        </Form>
        </Modal>
        </>
    )
}
export default AddWordForm;