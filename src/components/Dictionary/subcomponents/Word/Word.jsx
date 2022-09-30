import React, { useContext, useEffect, useState, useRef } from "react";
import styled, { css } from 'styled-components';
import WordFunctions from "../WordFunctions/WordFunctions";
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
const Error = styled.div`
    display: flex; 
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #DB9EA2;
    border-radius: 12px;
    font-size: 17px;
    color: #320306;
`
const Wrapper = styled.div`
    display: flex;
    
`
const Word = ({ word: wordFromDb, translation: translationFromDb, _id }) => {

    const [word, setWord] = useState(wordFromDb);
    const [translation, setTranslation] = useState(translationFromDb);
    const wordFromDbRef = useRef(null);
    const insideWordClick = useRef();
    const refEditBttn = useRef(null);

    const {

        user,
        setUser,
        words,
        setWords,
        id,
        setId,
        editedWord,
        editMode,
        setEditMode, 
        setEditedWord,
        editedTranslation,
        setEditedTranslation,
        outsideEditBttnClick,
        setOutsideEditBttnClick,
        isEditBttnClicked, 
        setIsEditBttnClicked,
        callback,
        setCallback,
        editedWordErrors,
        setEditedWordErrors,

    } = useContext(StoreContext);

    const wordHandler = event => {
        setWord(event.target.value);
        setEditedWord(event.target.value);
    }

    const translationHandler = event => {
        setTranslation(event.target.value);
        setEditedTranslation(event.target.value);
    }

    const setInitialValue = (word = wordFromDb, translation = translationFromDb) => {
        setEditedWord(word);
        setEditedTranslation(translation);
    }

    const dubleClickEditMode = (event, id, word, translation) => {
       // console.log(ref)
        switch (event.detail) {

                case 2: {
                    if (editedWordErrors && !isEditBttnClicked) setEditedWordErrors('');

                    setId(id);
                    setEditMode(true);
                    setInitialValue(word, translation);
                    setIsEditBttnClicked(true);
                    break;
                }
          }
    }

    // click outside edit button 
    useEffect(() => {
        const handleClickOutside = (event) => {

            if (wordFromDbRef.current && !wordFromDbRef.current.contains(event.target) && !refEditBttn.current.ref.contains(event.target)) {
            
                setEditMode(false);
                setOutsideEditBttnClick(true);
                refEditBttn.current.setIsEditBttnClicked();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true); 
        };
    });

    useEffect(() => {
        const handleClickInside = (event) => {
           
            console.log(insideWordClick)
            if (insideWordClick.current && insideWordClick.current.contains(event.target)) {
                //console.log(insideWordClick.current.dataset.word)
                //console.log('double click')
                dubleClickEditMode(event, insideWordClick.current.id, insideWordClick.current.dataset.word, insideWordClick.current.dataset.translation);
            }
        };
        document.addEventListener('click', handleClickInside, true);
        return () => {
            document.removeEventListener('click', handleClickInside, true); 
        };
    });

    const errorWord = typeof editedWordErrors !== 'string' ? editedWordErrors
    .filter(message => message.field === "word")
    .map(message => <p key={message.error}>{message.field}: {message.error}</p>) : '';

    const errorTranslation = typeof editedWordErrors !== 'string' ? editedWordErrors
    .filter(message => message.field === "translation")
    .map(message => <p key={message.error}>{message.field}: {message.error}</p>) : '';

    const otherErrors = typeof editedWordErrors !== 'string' ? '' : editedWordErrors;

    return (
        <>  
            { id === _id && editMode ?
           
            <Wrapper>
                <div>    
                    <WordFromDb ref={wordFromDbRef}>      
                        <Input value={editedWord} onChange={wordHandler}/>
                        <Input value={editedTranslation} onChange={translationHandler}/>
                    </WordFromDb>
                    <Error><p>{errorWord}</p><p>{errorTranslation}</p><p>{otherErrors}</p></Error>
                </div>   
                <WordFunctions word={wordFromDb} translation={translationFromDb} _id={_id} ref={refEditBttn}/> 
            </Wrapper>
                
            : 

            <Wrapper>
                <div>
                    <WordFromDb id={_id} data-word={wordFromDb} data-translation={translationFromDb} ref={insideWordClick} onClick={(event) => dubleClickEditMode(event)}>{wordFromDb + " - " + translationFromDb}</WordFromDb> 
                </div>
                <WordFunctions word={wordFromDb} translation={translationFromDb} _id={_id} />
            </Wrapper>
            }
        </>
    )
}

export default Word;