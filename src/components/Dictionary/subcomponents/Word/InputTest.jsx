import React, { useContext, useEffect, forwardRef, useState } from "react";
import styled, { css } from 'styled-components';
import InputMask from 'react-input-mask';
import { StoreContext } from "../../../../store/StoreProvider";

const Input = styled.div`
    display: inline-block;
    .inputTest {
        background: #9584DB;
        border: 1px solid white;
        color: ${props => props.color};
        font-size: 37px;
        border: none;
        text-align: center;
        letter-spacing: 10px;
    }
`

const InputTest = ({ inititalValue, tempTranslation, setTempTranslation, initialTranslation, setBorderColor }) => {
    const [txtColor, setTxtColor] = useState('black');
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
            tempTranslationTestInput, 
            setTempTranslationTestInput,

    } = useContext(StoreContext);
    
    const inputHandler = (event) => {

        const typedInput = event.target.value;
        
        if(typedInput)
        setTempTranslation(typedInput);
      
        if(typedInput === initialTranslation){
            setTxtColor('green');
            setBorderColor('green');
        } else {
            setTxtColor('black');
            setBorderColor('#7E5675');
        }

    }

    const mask = [];
    inititalValue.split('').map(value => mask.push('c'));
    
    return (
            <Input color={txtColor}>
                <InputMask 
                    className="inputTest" 
                    mask={mask.join('')} 
                    formatChars={{'c': '[a-z\']'}} 
                    value={tempTranslation} 
                    onChange={inputHandler} 
                    autoFocus>
                </InputMask>
            </Input>
        
    )
}
export default React.memo(InputTest);