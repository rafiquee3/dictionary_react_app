import React, {useContext, useState, useEffect, useRef} from "react";
import Modal from "../../../Modal/Modal";
import MemoItem from "./MemoItem";
import useModal from "../../../Modal/useModal";
import { StoreContext } from "../../../../store/StoreProvider";
import styled from 'styled-components';

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

const MemoMode = () => {
    const {
        editedWordErrors, 
        setEditedWordErrors,
        words 
    
    } = useContext(StoreContext);

    const length = words.length - 1;
    const [allWords, setAllWords] = useState(words);
    const [currentIndex, setCurrentIndex] = useState(length)
    const [currentWord, setCurrentWord] = useState(words[currentIndex]);
   
    const {isShowing: isMemoModeShowed, toggle: toggleMemoMode} = useModal();
    const modalRef = useRef(null);

    const clearInputField = () => {
        setEditedWordErrors('');
    }

    const openOrClosedModal = () => {
        clearInputField();
        toggleMemoMode();
    }

    const toggleSubmit = (event) => {
        event.preventDefault();
    }

    const handleCloseBttn = () => {
      openOrClosedModal();
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                openOrClosedModal();
            
          }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true); // 3th arg listen on capturing phase instead off bubbling phase
        };
      }, [ toggleMemoMode ]);

    const handleKeypress = event => {
    
        if (event.code === 'Enter') {
            toggleSubmit(event);
        }
    };
    console.log(currentWord)
    console.log(words[0])
    return (
        <>
        <Button onClick={() => openOrClosedModal()} bgcolor="#9583DB">Memo</Button>
        <Modal  isShowing={isMemoModeShowed}>
            <Form ref={modalRef} onSubmit={toggleSubmit} method="post" onKeyPress={event => handleKeypress(event)}>       
                <CloseButton onClick={() => handleCloseBttn()}>X</CloseButton>
                <MemoItem currentWord={currentWord} setCurrentWord={setCurrentWord} index={{currentIndex, setCurrentIndex}} words={allWords}/>
            </Form>
        </Modal>
        </>
    )
}
export default MemoMode;