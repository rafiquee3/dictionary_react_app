import React, { useContext } from "react";
import { StoreContext } from "../../store/StoreProvider";
import styled, { css } from 'styled-components';
import Word from "./subcomponents/Word/Word";

const WordWrapper = styled.div`
    display: flex;
`

const Dictionary = () => {
    const {user, setUser, words, setWords, editedWord, editedTranslation} = useContext(StoreContext);

    
    const listOfAllWords = words !== null ? 
    (words.map(word => 
        <WordWrapper>
            <Word key={word._id} {...word}></Word>
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