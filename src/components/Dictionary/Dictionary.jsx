import React, { useContext } from "react";
import { StoreContext } from "../../store/StoreProvider";
import styled, { css } from 'styled-components';
import Word from "./subcomponents/Word/Word";
import WordFunctions from "./subcomponents/WordFunctions/WordFunctions";

const WordWrapper = styled.div`
    display: flex;
`

const Dictionary = () => {
    const {user, setUser, words, setWords} = useContext(StoreContext);
    console.log(words)
    const listOfAllWords = words !== null ? (words
        .map(word => <WordWrapper><Word key={word._id} {...word}></Word><WordFunctions {...word}/></WordWrapper>)) : '';
    return (
        <>
            {listOfAllWords.reverse()}
        </>
    )
}
export default Dictionary;