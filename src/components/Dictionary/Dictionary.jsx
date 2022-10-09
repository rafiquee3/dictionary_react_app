import React, { useContext } from "react";
import { StoreContext } from "../../store/StoreProvider";
import styled, { css } from 'styled-components';
import Paginator from '../Paginator/Paginator'
//import PaginatedItems from '../Paginator/Paginate';
import Word from "./subcomponents/Word/Word";

const WordWrapper = styled.div`
    display: flex;
    background: gray;
`

const Dictionary = () => {
    const {user, setUser, words, setWords, editedWord, editedTranslation, testMode, setTestMode} = useContext(StoreContext);
    
    const listOfAllWords = words !== null ? 

    (words.map(word => 
        <WordWrapper>
            <Word key={word.word} {...word} initial={{...word}}></Word>
        </WordWrapper>)) 
    : 
        '';

    return (
        <>
            <Paginator howMany={5}>
                { listOfAllWords }
            </Paginator>
        </>
    )
}
export default Dictionary;