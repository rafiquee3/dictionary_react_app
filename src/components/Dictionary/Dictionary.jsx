import React, { useContext, useRef } from "react";
import { StoreContext } from "../../store/StoreProvider";
import styled, { css } from 'styled-components';
import Word from "./subcomponents/Word/Word";
import WordFunctions from "./subcomponents/WordFunctions/WordFunctions";

const WordWrapper = styled.div`
    display: flex;
`

const Dictionary = () => {
    const {user, setUser, words, setWords, editedWord, editedTranslation} = useContext(StoreContext);
    const wordRef = useRef(null);
    
    const listOfAllWords = words !== null ? 
    (words.map(word => 
        <WordWrapper>
            <Word key={word._id} {...word} ref={wordRef}></Word>
            <WordFunctions {...word} setInitialValue={() => wordRef.current.setInitialValue(editedWord, editedTranslation)} />
        </WordWrapper>)) 
    : 
        '';

    return (
        <>
            {listOfAllWords.reverse()}
        </>
    )
}
export default Dictionary;