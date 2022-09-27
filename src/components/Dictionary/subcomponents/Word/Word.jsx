import React, { forwardRef, useContext, useImperativeHandle, useEffect, useState } from "react";
import styled, { css } from 'styled-components';
import { StoreContext } from "../../../../store/StoreProvider";
export const setInitialValue = setInitialValue;

const WordFromDb = styled.div`
    display: flex;
    display-direction: rows;
    align-items: center;
    justify-content: center;
    width: 600px;
    height: 70px;
    background: #7E5675;
    color: white;
    font-size: 37px;
    border-radius: 12px;
    margin: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
const Input = styled.input`
    background: #9584DB;
    border: 1px solid white;
    color: black;
    font-size: 37px;
    border: none;
    text-align: center;
`
const Word = ({ word: wordFromDb, translation: translationFromDb, _id }, ref) => {

    const { editMode } = useContext(StoreContext);
    const [word, setWord] = useState(wordFromDb);
    const [translation, setTranslation] = useState(translationFromDb);
    const [validateMessage, setValidateMessage] = useState('');
    const {

        user,
        setUser,
        words,
        setWords,
        id,
        setId,
        editedWord, 
        setEditedWord,
        editedTranslation,
        setEditedTranslation,
        callback,
        setCallback

    } = useContext(StoreContext);

    const wordHandler = event => {
        setWord(event.target.value);
        setEditedWord(event.target.value);
    }
    const translationHandler = event => {
        setTranslation(event.target.value);
        setEditedTranslation(event.target.value);
    }
    const setInitialValue = (word, translation) => {
        setWord(word);
        setTranslation(translation);
    }

    useImperativeHandle(ref, () => ({
        setInitialValue
    }));

    return (
        <>  
            { id === _id && editMode ?
            <WordFromDb>
                <Input value={editedWord} onChange={wordHandler}/>
                <Input value={editedTranslation} onChange={translationHandler}/>
            </WordFromDb> 
            : 
            <WordFromDb>{wordFromDb + " - " + translationFromDb}</WordFromDb> 
            }
        </>
    )
}

export default forwardRef(Word);