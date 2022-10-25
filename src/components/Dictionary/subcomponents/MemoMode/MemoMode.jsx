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
const Wrapper = styled.div`
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
        sortByAz,
        sortByDifficultyLvl, 
        setEditedWordErrors,
        showMemoMode, 
        setShowMemoMode,
        words,
        setWords, 
    
    } = useContext(StoreContext);

    const length = words.length - 1;
    const [allWords, setAllWords] = useState(words);
    const [currentIndex, setCurrentIndex] = useState(length)
    const [currentWord, setCurrentWord] = useState(words[currentIndex]);
    const modalRef = useRef(null);

    const handleCloseBttn = () => {
        setShowMemoMode(false);    
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowMemoMode(false); 
            
          }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true); // 3th arg listen on capturing phase instead off bubbling phase
        };
      }, []);
 
    useEffect(() => {
        if (sortByDifficultyLvl) {
            let temp = [...words];
            setAllWords(temp.sort((a, b) => a.difficulty - b.difficulty));
            setCurrentIndex(temp.length - 1);
            setCurrentWord(temp.sort((a, b) => a.difficulty - b.difficulty)[words.length - 1]);

        } else if (sortByAz) {
            let temp = [...words];
            setAllWords(temp.sort((a, b) => a.word < b.word ? 1 : -1));
            setCurrentIndex(temp.length - 1);
            setCurrentWord(temp.sort((a, b) => a.word < b.word ? 1 : -1)[words.length - 1]);
        
        } else if (!sortByDifficultyLvl && !sortByAz) {
            let temp = [...words];
            setAllWords(temp);
            setCurrentIndex(temp.length - 1);
            setCurrentWord(temp[words.length - 1]);
        }  
    }, [sortByAz, sortByDifficultyLvl]); 
    

    return (
        <>
            <Modal  isShowing={showMemoMode}>
                <Wrapper ref={modalRef}>       
                    <CloseButton onClick={() => handleCloseBttn()}>X</CloseButton>
                    <MemoItem 
                        currentWord={currentWord} 
                        setCurrentWord={setCurrentWord} 
                        index={{currentIndex, setCurrentIndex}} 
                        words={allWords} 
                    />
                </Wrapper>
            </Modal>
        </>
    )
}
export default MemoMode;