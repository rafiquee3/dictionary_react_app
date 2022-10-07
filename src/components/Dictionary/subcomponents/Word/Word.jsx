import React, { useContext, useEffect, useState, useRef } from "react";
import styled, { css } from 'styled-components';
import WordFunctions from "../WordFunctions/WordFunctions";
import InputTest from "./InputTest";
import { StoreContext } from "../../../../store/StoreProvider";

const WordFromDb = styled.div`
    display: flex;
    display-direction: rows;
    align-items: center;
    justify-content: center;
    width: ${props => props.width || '600px'};
    height: 70px;
    background: #7E5675;
    color: white;
    font-size: 37px;
    border-radius: 12px;
    margin: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    .translation {
        letter-spacing: ${props => props.spacing}
    }
`
const Input = styled.input`
    background: #9584DB;
    border: 1px solid white;
    color: black;
    font-size: 37px;
    border: none;
    text-align: center;
    letter-spacing: 10px;
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
    align-items: center;
    
`
const Word = ({ word: wordFromDb, translation: translationFromDb, _id, all }) => {
    
    const hiddenValue = wordFromDb.replace(/[A-Za-z'\s]/gi,'*');
    
    const [tempTranslation, setTempTranslation] = useState(translationFromDb);
   
    const [editModeInTestMode, setEditModeInTestMode] = useState(false);
    const [oneClickFnCalled, setOneClickFnCalled] = useState(false);

    const wordFromDbRef = useRef(null);
    const insideWordClick = useRef(null);
    const refEditBttn = useRef(null);
   
  
    console.log('word: ' + wordFromDb )
    console.log('translation: ' + translationFromDb)
    console.log('translationTemp: ' + tempTranslation) 

    const {

            id,
            setId,
            editedWord,
            editMode,
            setEditMode,
            testMode,
            setTestMode, 
            setEditedWord,
            page, 
            setPage,
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
            tempTranslationTestInput, 

    } = useContext(StoreContext);

    if (tempTranslation === wordFromDb && testMode) {
        setTempTranslation(all.word);
    }

    const generateTranslationFromDb = (translation) => {

        if (testMode) {
        
            const result = translation
            .split('')
            .map(lettre => lettre = '_')
            .join('');

            return result;
        }

        return translation;
    }

    const wordHandler = event => {
        //setWord(event.target.value);
        setEditedWord(event.target.value);
    }

    const translationHandler = event => {
        //setTranslation(event.target.value);
        setEditedTranslation(event.target.value);
    }

    const setInitialValue = (word = wordFromDb, translation = translationFromDb) => {
        setEditedWord(word);
        setEditedTranslation(translation);
    }

    const handleClickEvent = (event, id, word, translation) => {
        console.log('handle click event')
        switch (event.detail) {
                case 1: {
                    if (testMode && !oneClickFnCalled) {
                        setOneClickFnCalled(true);
                        setEditModeInTestMode(true);
                        break;
                    }

                    break;
                }

                case 2: {
                    if (editedWordErrors && !isEditBttnClicked) setEditedWordErrors('');

                    if (!testMode) {
                        setId(id);
                        setEditMode(true);
                        setInitialValue(word, translation);
                        setIsEditBttnClicked(true);
                        break;
                    }
                    break;
                }     
          }
    }
    
    // click outside edit button 
    useEffect(() => {
        
        const handleClickOutside = (event) => {
            console.log('handleOutside Click')
            if (!testMode) {
                if (wordFromDbRef.current && !wordFromDbRef.current.contains(event.target) && !refEditBttn.current.ref.contains(event.target)) {
                    console.log('outside click')
                    console.log('translation in outsideClick: ' + wordFromDb)
                    setEditMode(false);
                    setOutsideEditBttnClick(true);
                    refEditBttn.current.setIsEditBttnClicked();
                }
            } else if (testMode && insideWordClick.current && !insideWordClick.current.contains(event.target)) {
                console.log('else clisk sajdhasdjh')
                setEditModeInTestMode(false);
                setOneClickFnCalled(false);
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true); 
        };
    }, [testMode]);

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
                    <WordFromDb 
                    ref={wordFromDbRef}
                    onClick={(event) => handleClickEvent(event, _id, wordFromDb, translationFromDb)} 
                    >      
                        <Input value={editedWord} onChange={wordHandler}/>
                        <Input value={editedTranslation} onChange={translationHandler} />
                    </WordFromDb>
                    <Error><p>{errorWord}</p><p>{errorTranslation}</p><p>{otherErrors}</p></Error>
                </div>   
                { testMode ? '' : <WordFunctions word={wordFromDb} translation={translationFromDb} _id={_id} ref={refEditBttn}/>} 
            </Wrapper>
                
            : testMode ?

            <Wrapper>
                <div>
                    <WordFromDb 
                       
                        ref={insideWordClick} 
                        onClick={(event) => handleClickEvent(event, _id, wordFromDb, translationFromDb)} 
                        width={testMode ? "800px" : ''} 
                        spacing={testMode ? '10px' : ''}
                        >

                            { editModeInTestMode ? 

                            <div>
                                {wordFromDb} 
                                <span className="translation" >
                                    &nbsp;-&nbsp;
                                    <InputTest setTempTranslation={setTempTranslation} tempTranslation={tempTranslation} inititalValue={translationFromDb} />
                                </span>
                            </div>

                            :

                            <div>
                                {wordFromDb} 
                                <span className="translation" >
                                    &nbsp;-&nbsp;{tempTranslation}
                                </span>
                            </div>
                            }      
                    </WordFromDb> 
                </div>       
            </Wrapper>

            :

            <Wrapper>
                <div>
                    <WordFromDb 
                      
                        data-word={wordFromDb} 
                        data-translation={translationFromDb} 
                        ref={insideWordClick} 
                        onClick={(event) => handleClickEvent(event, _id, wordFromDb, translationFromDb)} 
                    >
                            {wordFromDb} 
                            <span className="translation" >
                                &nbsp;-&nbsp;{generateTranslationFromDb(translationFromDb)}
                            </span>

                    </WordFromDb> 
                </div>
                <WordFunctions word={wordFromDb} translation={translationFromDb} _id={_id} ref={refEditBttn}/> 
            </Wrapper>

            }
        </>
    )
}

export default Word;