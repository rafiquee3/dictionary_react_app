import React, { useContext } from "react";
import { StoreContext } from "../../store/StoreProvider";
import styled, { css } from 'styled-components';
import Word from "./subcomponents/Word/Word";
import Paginator from "../Paginator/Paginator";

const WordWrapper = styled.div`
    display: flex;
    background: gray;
`

const Dictionary = () => {
    const {user, setUser, words, setWords, editedWord, editedTranslation, testMode, setTestMode} = useContext(StoreContext);
    
    const listOfAllWords = words !== null ? 

    (words.map(word => 
        <WordWrapper>
            <Word key={word.word} {...word}></Word>
        </WordWrapper>)) 
    : 
        '';
    
    const listOfAllWordsTestMode = words !== null ? 

    (words.map(word => 
        <WordWrapper>
            <Word key={word.word} word={word.translation} translation={word.word} _id={word._id} all={{...word}}></Word>
        </WordWrapper>)) 
    : 
        '';
    
    console.log('Dictionary renderind') 
    //console.log(words)     
    return (
        <>
            <Paginator howMany={5}>
                { testMode ? listOfAllWordsTestMode : listOfAllWords }
            </Paginator>
        </>
    )
}
export default Dictionary;