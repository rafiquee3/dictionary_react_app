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
            <Paginator items={words} howMany={5}>
                {listOfAllWords}
            </Paginator>
        </>
    )
}
export default Dictionary;