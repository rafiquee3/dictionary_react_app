import React, {useContext, useEffect, useState, useRef} from "react";
import styled from 'styled-components';
import WordFunctions from "../WordFunctions/WordFunctions";
import InputTest from "./InputTest";
import {StoreContext} from "../../../../store/StoreProvider";
import OutSideClickHandler from "./OutSideClickHandler";
import request from "../../../../helpers/request"

// word detail mode with addnotation feature
// click wordDbRef focus on input
// print all word to pdf

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

const Button = styled.button`
    background: ${props => props.bgcolor || 'white'};
    border-radius: 4px;
    border-color: #584894;
    padding: 15px;
    color: black;
`

const Hint = styled.div`
    display: flex; 
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #DB9EA2;
    border-radius: 12px;
    font-size: 17px;
    color: #320306;
`

const Word = ({_id, display, initial, translation, word}) => {
    
    const {
        id,
        setId,
        searchMode,
        testMode,
        testInverseMode,
        searchValue, 
        isEditBttnClicked, 
        setIsEditBttnClicked,
        editedWordErrors,
        setEditedWordErrors,
        user,
        setWords,

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

    const [initialWordValue, setInitialWordValue] = useState(word);
    const [initialTranslationValue, setInitialTranslationValue] = useState(translation);
    const [wordState, setWordState] = useState(word);
    const [translationState, setTranslationState] = useState(translation);
    const [tempTranslation, setTempTranslation] = useState(translation);
    const [editMode, setEditMode] = useState(false);
    const [editModeInTestMode, setEditModeInTestMode] = useState(false);
    const [oneClickFnCalled, setOneClickFnCalled] = useState(false);
    const [outSideClickListener, setOutSideClickListener] = useState(false);
    const [borderColor, setBorderColor] = useState('');
    const [showHint, setShowHint] = useState(false);

    const wordFromDbRef = useRef(null);
    const insideWordClickRef = useRef(null);
    const editBttnRef = useRef(null);
    const inputEditModeRef = useRef(null);
    const inputTestModeRef = useRef(null);

    const DEFAULT_WORD_COLOR = "#7E5675";
    const FOUND_WORD_COLOR = 'blue';

    const getNewListOfWords = async (collectionName) => {
        const {data, status} = await request.post(
            '/words/',
            {collection: collectionName}
        );
        if(status === 200) {
            setWords(data)
        }
        if(data.message) {
            setEditedWordErrors(data.message);
        }
    }

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
        
    }, [testMode, testInverseMode])

    useEffect(() => {
        if(searchValue !== undefined) {
            if(searchValue.word === word) {
                setBorderColor(FOUND_WORD_COLOR);
                setOutSideClickListener(true);                

        } else if ( searchValue.word !== word) {
                setBorderColor(DEFAULT_WORD_COLOR); 
            }
        }
    }, [searchMode])

    // When the difficulty level changes make a word update
    useEffect(() => {
        if (testMode) {
            let collectionName = user;
            getNewListOfWords(collectionName);
        }
    }, [editModeInTestMode])

    useEffect(() => {
        if(testMode) {
            if (testInverseMode) {
                setInitialWordValue(initial.word);
                setInitialTranslationValue(initial.translation);
                setTempTranslation(generateTranslationFromDb(initial.translation));
        } else {
                setInitialWordValue(initial.translation);
                setInitialTranslationValue(initial.word);
                setTempTranslation(generateTranslationFromDb(initial.word));
        }
    }}, [testMode, testInverseMode])

    useEffect(() => {
        if(wordFromDbRef.current)
        wordFromDbRef.current.focus()
    }, [])

    const errorWord = typeof editedWordErrors !== 'string' ? editedWordErrors
    .filter(message => message.field === "word")
    .map(message => <p key={message.error}>{message.field}: {message.error}</p>) : '';

    const errorTranslation = typeof editedWordErrors !== 'string' ? editedWordErrors
    .filter(message => message.field === "translation")
    .map(message => <p key={message.error}>{message.field}: {message.error}</p>) : '';

    const otherErrors = typeof editedWordErrors !== 'string' ? '' : editedWordErrors;
    
    return (
        <>  
            {id === _id && editMode ?
           
            <Wrapper display={display}>
                <div>    
                    <WordFromDb 
                        ref={wordFromDbRef}
                        onClick={(event) => handleClickEvent(event, _id, word, translation)}
                        data-border={borderColor} 
                    >      
                        <Input value={wordState} onChange={wordHandler} ref={inputEditModeRef}  />
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

                            {editModeInTestMode ? 

                            <div>
                                {initialWordValue} 
                                <span className="translation" >
                                    &nbsp;-&nbsp;
                                    <InputTest 
                                        setTempTranslation={setTempTranslation} 
                                        tempTranslation={tempTranslation} 
                                        initialTranslation={initialTranslationValue}
                                        setBorderColor={setBorderColor}
                                        ref={inputEditModeRef}
                                        _id = {_id}
                                    />
                                </span>
                                <Button onClick={() => setShowHint((prev) => !prev)}>Help</Button>
                            </div>
                            
                            :

                            <div>
                                {initialWordValue} 
                                <span className="translation" >
                                    &nbsp;-&nbsp;{tempTranslation}
                                </span>
                            </div>
                        }      
                    </WordFromDb> 
                    {showHint &&  <Hint>{initialTranslationValue}</Hint>}
                   
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
            {outSideClickListener && 

            <OutSideClickHandler 
                wordFromDbRef={wordFromDbRef} 
                editBttnRef={editBttnRef}
                inputTestModeRef={inputTestModeRef}  
                insideWordClickRef={insideWordClickRef}
                setBorderColor={setBorderColor}
                colorPalette={{DEFAULT_WORD_COLOR, FOUND_WORD_COLOR}}
                editMode={editMode} 
                setEditMode={setEditMode}
                setEditModeInTestMode={setEditModeInTestMode}
                setOneClickFnCalled={setOneClickFnCalled}
                setOutSideClickListener={setOutSideClickListener}
                showHint={showHint} 
                setShowHint={setShowHint}
            /> 
        }
        </>
    )
}

export default Word;
