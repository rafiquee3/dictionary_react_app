import React, { useContext, useEffect, useState, useRef } from "react";
import styled, { css } from 'styled-components';
import WordFunctions from "../WordFunctions/WordFunctions";
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
const Word = ({ word: wordFromDb, translation: translationFromDb, _id }) => {

    const [word, setWord] = useState(wordFromDb);
    const [translation, setTranslation] = useState(translationFromDb);
    const [translationTestMode, setTranslationTestMode] = useState('')
    const [editModeInTestMode, setEditModeInTestMode] = useState(false);
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
        testMode,
        setTestMode, 
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
    
    const translationTestModeHandler = (event, translation) => {
        //setTranslationTestMode('')
        // ile  _
        //  slice
        const slice_ = event.target.value
            .split('')
            .slice(event.target.value.length)
            .join()

        const length = slice_.length;

        const temp = translation
            .split('')
            .slice(length)
            .map(letter => letter = '_')
            .join()
        console.log(temp)
        let result = slice_ + temp;
        event.target.selectionStart = length;
        setTranslationTestMode(result)
    }

    const setInitialValue = (word = wordFromDb, translation = translationFromDb) => {
        setEditedWord(word);
        setEditedTranslation(translation);
    }

    const handleClickEvent = (event, id, word, translation) => {
        console.log(event.detail)
        switch (event.detail) {
                case 1: {
                    if (testMode) {
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
    
    // click outside edit button 
    useEffect(() => {
        const handleClickOutside = (event) => {
            
            //if (wordFromDbRef.current && !wordFromDbRef.current.contains(event.target) ) {
            
            //}
  
            if (!testMode) {
                if (insideWordClick.current && !insideWordClick.current.contains(event.target) && !refEditBttn.current.ref.contains(event.target)) {
                    console.log('outside click')
                    setEditMode(false);
                    setOutsideEditBttnClick(true);
                    refEditBttn.current.setIsEditBttnClicked();
                }
            } else if (testMode && insideWordClick.current && !insideWordClick.current.contains(event.target)) {
                setEditModeInTestMode(false);
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true); 
        };
    }, [testMode]);


   //const runEffect = useRef(true);
/*     useEffect(() => {
        //if (runEffect.current) {
       // runEffect.current = false;
        console.log('useEffect double')
        const handleClickInside = (event) => {
           
            if (insideWordClick.current && insideWordClick.current.contains(event.target)) {

                handleClickEvent(event, insideWordClick.current.id, insideWordClick.current.dataset.word, insideWordClick.current.dataset.translation);
            }
        };
        document.addEventListener('click', () => handleClickInside, true);
        return () => {
            document.removeEventListener('click', handleClickInside, true); 
        }; 
      
    }, []); */

    const errorWord = typeof editedWordErrors !== 'string' ? editedWordErrors
    .filter(message => message.field === "word")
    .map(message => <p key={message.error}>{message.field}: {message.error}</p>) : '';

    const errorTranslation = typeof editedWordErrors !== 'string' ? editedWordErrors
    .filter(message => message.field === "translation")
    .map(message => <p key={message.error}>{message.field}: {message.error}</p>) : '';

    const otherErrors = typeof editedWordErrors !== 'string' ? '' : editedWordErrors;
    console.log('renderuje word')
    return (
        <>  
            { id === _id && editMode ?
           
            <Wrapper>
                <div>    
                    <WordFromDb ref={insideWordClick}>      
                        <Input value={editedWord} onChange={wordHandler}/>
                        <Input value={editedTranslation} onChange={translationHandler}/>
                    </WordFromDb>
                    <Error><p>{errorWord}</p><p>{errorTranslation}</p><p>{otherErrors}</p></Error>
                </div>   
                { testMode ? '' : <WordFunctions word={wordFromDb} translation={translationFromDb} _id={_id} ref={refEditBttn}/>} 
            </Wrapper>
                
            : testMode ?

            <Wrapper>
                <div>
                    <WordFromDb 
                        id={_id} 
                        data-word={wordFromDb} 
                        data-translation={translationFromDb} 
                        ref={insideWordClick} 
                        onClick={(event) => handleClickEvent(event, _id, wordFromDb, translationFromDb)} 
                        width={testMode ? "800px" : ''} 
                        spacing={testMode ? '10px' : ''}>

                            { editModeInTestMode ? 
                            <div>
                                {wordFromDb} 
                                <span className="translation" >
                                    &nbsp;-&nbsp;
                                    <Input value={translationTestMode} onChange={(event) => translationTestModeHandler(event, translationFromDb)}></Input>
                                </span>
                            </div>
                            :
                            <div>
                                {wordFromDb} 
                                <span className="translation" >
                                    &nbsp;-&nbsp;{generateTranslationFromDb(translationFromDb)}
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
                        id={_id} 
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