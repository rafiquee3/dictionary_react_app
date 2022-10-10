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
    border: 8px solid ${props => props.borderColor || "#7E5675"};
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
    display: ${props => props.display};
    align-items: center;
    
`
const Word = ({ word, translation, _id, initial, display }) => {
    
    const {

        id,
        setId,
        
        editMode,
        editedWord,
        setEditedWord,
        editedTranslation,
        setEditedTranslation,
        setEditMode,
        testMode,
        setTestMode, 
     
        page, 
        setPage,
    
    
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

    if (testMode) {
        word = initial.translation;
        translation = generateTranslationFromDb(initial.word);
    }

    const [wordState, setWordState] = useState(word);
    const [translationState, setTranslationState] = useState(translation);
    const [tempTranslation, setTempTranslation] = useState(translation);
    const [editModeInTestMode, setEditModeInTestMode] = useState(false);
    const [oneClickFnCalled, setOneClickFnCalled] = useState(false);
    const [borderColor, setBorderColor] = useState('');

    const wordFromDbRef = useRef(null);
    const insideWordClick = useRef(null);
    const refEditBttn = useRef(null);
    const inputEditModeRef = useRef(null);

    const wordHandler = event => {
        setWordState(event.target.value);
        setEditedWord(event.target.value);
    }

    const translationHandler = event => {
        setTranslationState(event.target.value);
        setEditedTranslation(event.target.value);
    }

    const setInitialValue = (word, translation) => {
        setWordState(word);
        setTranslationState(translation)
        setEditedWord(word);
        setEditedTranslation(translation);
    }

    const handleClickEvent = (event, id, word, translation) => {
       
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
                    if (!inputEditModeRef.current) {
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
    }
    
    // click outside edit button 
    useEffect(() => {
        
        const handleClickOutside = (event) => {
          
            if (!testMode) {
                if (wordFromDbRef.current && !wordFromDbRef.current.contains(event.target) && !refEditBttn.current.ref.contains(event.target)) {
                    setEditMode(false);
                    refEditBttn.current.setIsEditBttnClicked();
                }
            } else if (testMode && insideWordClick.current && !insideWordClick.current.contains(event.target)) {
                setEditModeInTestMode(false);
                setOneClickFnCalled(false);
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            console.log('odmontowuje word')
            document.removeEventListener('click', handleClickOutside, true); 
        };
    }, [testMode]);

    useEffect(() => {
        setTempTranslation(translation);
        setBorderColor('#7E5675');
    }, [testMode])

    const errorWord = typeof editedWordErrors !== 'string' ? editedWordErrors
    .filter(message => message.field === "word")
    .map(message => <p key={message.error}>{message.field}: {message.error}</p>) : '';

    const errorTranslation = typeof editedWordErrors !== 'string' ? editedWordErrors
    .filter(message => message.field === "translation")
    .map(message => <p key={message.error}>{message.field}: {message.error}</p>) : '';

    const otherErrors = typeof editedWordErrors !== 'string' ? '' : editedWordErrors;
    console.log('word rerender')
    return (
        <>  
            { id === _id && editMode ?
           
            <Wrapper display={display}>
                <div>    
                    <WordFromDb 
                        ref={wordFromDbRef}
                        onClick={(event) => handleClickEvent(event, _id, word, translation)} 
                    >      
                        <Input value={wordState} onChange={wordHandler} ref={inputEditModeRef}/>
                        <Input value={translationState} onChange={translationHandler} />
                    </WordFromDb>
                    <Error><p>{errorWord}</p><p>{errorTranslation}</p><p>{otherErrors}</p></Error>
                </div>   
                { testMode ? '' : <WordFunctions word={word} translation={translation} _id={_id} ref={refEditBttn}/>} 
            </Wrapper>
                
            : testMode ?

            <Wrapper display={display}>
                <div>
                    <WordFromDb                
                        ref={insideWordClick} 
                        onClick={(event) => handleClickEvent(event, _id, word, translation)} 
                        width={testMode ? "800px" : ''} 
                        spacing={testMode ? '10px' : ''}
                        borderColor={borderColor}
                        >

                            { editModeInTestMode ? 

                            <div>
                                {word} 
                                <span className="translation" >
                                    &nbsp;-&nbsp;
                                    <InputTest 
                                        setTempTranslation={setTempTranslation} 
                                        tempTranslation={tempTranslation} 
                                        inititalValue={translation}
                                        initialTranslation={initial.word}
                                        setBorderColor={setBorderColor}
                                    />
                                </span>
                            </div>

                            :

                            <div>
                                {word} 
                                <span className="translation" >
                                    &nbsp;-&nbsp;{tempTranslation}
                                </span>
                            </div>
                            }      
                    </WordFromDb> 
                </div>       
            </Wrapper>

            :

            <Wrapper display={display}>
                <div>
                    <WordFromDb       
                        ref={insideWordClick} 
                        onClick={(event) => handleClickEvent(event, _id, word, translation)} 
                    >
                            {word} 
                            <span className="translation" >
                                &nbsp;-&nbsp;{generateTranslationFromDb(translation)}
                            </span>

                    </WordFromDb> 
                </div>
                <WordFunctions word={word} translation={translation} _id={_id} ref={refEditBttn}/> 
            </Wrapper>

            }
        </>
    )
}

export default Word;