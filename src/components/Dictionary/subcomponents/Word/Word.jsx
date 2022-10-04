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
const Word = ({ word: wordFromDb, translation: translationFromDb, _id }) => {

    const hashedValue = wordFromDb.replace(/[A-Za-z'\s]/gi,'_');
  
    const [word, setWord] = useState(wordFromDb);
    const [translation, setTranslation] = useState(translationFromDb);
    const [translationTestMode, setTranslationTestMode] = useState('')
    const [editModeInTestMode, setEditModeInTestMode] = useState(false);
    const [oneClickFnCalled, setOneClickFnCalled] = useState(false);
    const [tempTranslation, setTempTranslation] = useState(hashedValue);
    const wordFromDbRef = useRef(null);
    const insideWordClick = useRef();
    const refEditBttn = useRef(null);
    const inputRef = useRef(null);
   
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
        setWord(event.target.value);
        setEditedWord(event.target.value);
    }

    const translationHandler = event => {
        setTranslation(event.target.value);
        setEditedTranslation(event.target.value);
    }
    
    const translationTestModeHandler = (event, translation) => {
        const prevStateInput = translationTestMode;
        
        console.log(translationTestMode);
        const initialValueFromInput = event.target.value;
        let valueFromInput = initialValueFromInput;
        let result = '';

        console.log('valueFromInput: ' + valueFromInput )
        const lastLetter = valueFromInput[valueFromInput.length - 1];

        // remove last letter
        valueFromInput = valueFromInput.slice(0, -1);

        console.log('valueFromInputApresSlice: ' + valueFromInput )

        const howManyHideChars = valueFromInput
            .split('')
            .filter(lettre => lettre === '*')
            .length;

        console.log('ile _' + howManyHideChars)

        const inputValueWithout_ = valueFromInput
            .split('')
            .slice(0, initialValueFromInput.length - 1 - howManyHideChars)
            .join('');

            console.log('wartosc po ucieciu _ : ' + inputValueWithout_)

        let length = inputValueWithout_.length + 1;
       
        if (valueFromInput.length === 0){ 
            length = 1;
        }

        console.log('length: ' + length)

        const hiddenChars = translation
            .split('')
            .slice(length)
            .map(letter => letter = '*')
            .join('')

        console.log( 'hiddenChars: ' + hiddenChars)

        
       
        result = inputValueWithout_ + lastLetter + hiddenChars;
      
        console.log('result: ' + result)
       console.log(/^[A-Za-z'\s]*$/.test(result));

       const validator = /^[A-Za-z'\s]*$/.test(result);

         // caret position check
         const currentCaretPos = inputValueWithout_ .length;
       
         console.log('curr caret pos: ' + currentCaretPos)

        // reverse mode for delete
        if (prevStateInput.length > valueFromInput.length) {
            console.log('reverse mode')
            console.log('reverse mode input: ' + valueFromInput)
            const valueFromInputCut = valueFromInput.slice(0, -1);
            const result = valueFromInputCut + translation.split('').slice(valueFromInput.length).map(letter => letter = '*').join('')
            console.log(result)
            setTranslationTestMode(result)
        return;
        }
        //setTranslationTestMode('')
        // ile  _
        //  slice
        console.log('validator: ' + validator)
        if(event.target.value.length + 1> translation.length  && validator) {
            console.log('return')
            console.log(event.target.value)
            if(valueFromInput[valueFromInput.length - 1] === "*") {
                setTranslationTestMode(result);
                
                console.log('deep')
            }
            
            return;
        }

        if (validator && event.target.value.length > 1)
        result = event.target.value
        
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
                    if (testMode && !oneClickFnCalled) {
                        setOneClickFnCalled(true);
                        setTranslationTestMode(generateTranslationFromDb(translation));
                        setEditModeInTestMode(true);
                       
                        //console.log(inputRef.current.selectionStart)
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
                setOneClickFnCalled(false);
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
    console.log(inputRef)
    const caretPosition = (event) => {
        event.target.selectionStart = 0;
        event.target.selectionEnd = 0;
        console.log(event.target.selectionStart)
    }

    console.log(tempTranslation)
    return (
        <>  
            { id === _id && editMode ?
           
            <Wrapper>
                <div>    
                    <WordFromDb ref={insideWordClick}>      
                        <Input value={editedWord} onChange={wordHandler}/>
                        <Input value={editedTranslation} onChange={translationHandler} autoFocus/>
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
                                    <Input value={tempTranslation} 

                                        onClick={addEventListener('keyup', e => {
                                            //e.target.selectionStart = 0
                                            console.log('Caret at: ', e.target.selectionStart)
                                            
                                            //e.target.selectionStart = ++indexTest;
                                        })} 
                                        onChange={(event) => translationTestModeHandler(event, translationFromDb)}
                                        ref={inputRef}
                                        onFocus={caretPosition}
                                        autoFocus
                                        >
                                        
                                    </Input>
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