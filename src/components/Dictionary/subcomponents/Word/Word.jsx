import React, { useContext, useCallback, useEffect, useState, useRef } from "react";
import styled, { css } from 'styled-components';
import WordFunctions from "../WordFunctions/WordFunctions";
import InputTest from "./InputTest";
import { StoreContext } from "../../../../store/StoreProvider";
import OutSideClickHandler from "./OutSideClickHandler";

// hard to learn mode
// change side in test mode
// indicator advise in test mode
// word detail mode with addnotation feature
// loading page progress bar css

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
const Word = ({ _id, display, initial, translation, word }) => {
    
    const {

        id,
        setId,
        searchMode,
        testMode,
        setTestMode, 
        searchValue, 
        setSearchValue,
        isEditBttnClicked, 
        setIsEditBttnClicked,
        editedWordErrors,
        setEditedWordErrors,

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

        // if (reverseTestMode)
    }

    const [wordState, setWordState] = useState(word);
    const [translationState, setTranslationState] = useState(translation);
    const [tempTranslation, setTempTranslation] = useState(translation);
    const [editMode, setEditMode] = useState(false);
    const [editModeInTestMode, setEditModeInTestMode] = useState(false);
    const [oneClickFnCalled, setOneClickFnCalled] = useState(false);
    const [outSideClickListener, setOutSideClickListener] = useState(false);
    const [borderColor, setBorderColor] = useState('');

    const wordFromDbRef = useRef(null);
    const insideWordClickRef = useRef(null);
    const editBttnRef = useRef(null);
    const inputEditModeRef = useRef(null);

    const DEFAULT_WORD_COLOR = "#7E5675";
    const FOUND_WORD_COLOR = 'blue';

    const wordHandler = event => {
        setWordState(event.target.value);
    }

    const translationHandler = event => {
        setTranslationState(event.target.value);
    }

    const setInitialValue = (word, translation) => {
        setWordState(word);
        setTranslationState(translation)
    }

    const handleClickEvent = (event, id, word, translation) => {
        
        switch (event.detail) {
                // Test mode
                case 1: {
                    if (testMode && !oneClickFnCalled) {
                        setOutSideClickListener(true)
                        setOneClickFnCalled(true);
                        setEditModeInTestMode(true);
                        break;
                    }

                    break;
                } 
                // Edit mode
                case 2: {
                    if (!inputEditModeRef.current) {
                        if (editedWordErrors && !isEditBttnClicked) setEditedWordErrors('');

                        if (!testMode) {
                            setOutSideClickListener(true)
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
    
    useEffect(() => {
        setTempTranslation(translation);
        setBorderColor(DEFAULT_WORD_COLOR);
        
    }, [testMode])

    useEffect(() => {
        console.log('useEffect word')
        if(searchValue !== undefined) {
            if(searchValue.word === word) {
                setBorderColor(FOUND_WORD_COLOR);
                setOutSideClickListener(true);                

            }else if( searchValue.word !== word) {
                setBorderColor(DEFAULT_WORD_COLOR); 
            }
        }
    }, [searchMode])

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
                        data-border={borderColor} 
                    >      
                        <Input value={wordState} onChange={wordHandler} ref={inputEditModeRef} />
                        <Input value={translationState} onChange={translationHandler} />
                    </WordFromDb>
                    <Error>{errorWord}{errorTranslation}{otherErrors}</Error>
                </div>   
                <WordFunctions 
                    word={wordState} 
                    translation={translationState} 
                    initialValue={{word, translation}}
                    editMode={editMode}
                    setEditMode={setEditMode} 
                    setInitialValue={setInitialValue} 
                    setOutSideClickListener={setOutSideClickListener}
                    _id={_id} 
                    ref={editBttnRef}
                /> 
            </Wrapper>
                
            : testMode ?

            <Wrapper display={display}>
                <div>
                    <WordFromDb                
                        ref={insideWordClickRef} 
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
                        ref={insideWordClickRef} 
                        onClick={(event) => handleClickEvent(event, _id, word, translation)} 
                        borderColor={borderColor}
                        data-border={borderColor}
                    >
                            {word} 
                            <span className="translation" >
                                &nbsp;-&nbsp;{generateTranslationFromDb(translation)}
                            </span>
                    </WordFromDb> 
                </div>
                <WordFunctions 
                    word={word} 
                    translation={translation} 
                    initialValue={{word, translation}} 
                    editMode={editMode}
                    setEditMode={setEditMode} 
                    setInitialValue={setInitialValue} 
                    setOutSideClickListener={setOutSideClickListener}
                    _id={_id} 
                    ref={editBttnRef}
                /> 
            </Wrapper>
            }
            { outSideClickListener && 

            <OutSideClickHandler 
                wordFromDbRef={wordFromDbRef} 
                editBttnRef={editBttnRef} 
                insideWordClickRef={insideWordClickRef}
                setBorderColor={setBorderColor}
                colorPalette={{DEFAULT_WORD_COLOR, FOUND_WORD_COLOR}}
                editMode={editMode}
                setEditMode={setEditMode}
                setEditModeInTestMode={setEditModeInTestMode}
                setOneClickFnCalled={setOneClickFnCalled}
                setOutSideClickListener={setOutSideClickListener}
            /> 
            }
        </>
    )
}

export default Word;
