import React, { useContext, useState } from "react";
import styled, { css } from 'styled-components';
import {StoreContext} from "../../../../store/StoreProvider";
import {increaseLvlDifficulty, decreaseLvlDifficulty} from "../../../../helpers/dbCallFunctions"
import InputMask from 'react-input-mask';

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

const InputTest = ({ 
    tempTranslation, 
    setTempTranslation, 
    initialTranslation, 
    setBorderColor, 
    _id 
    }) => {
   
    const [txtColor, setTxtColor] = useState('black');
    const [blockLvlChange, setBlockLvlChange] = useState(false);
    const { user } = useContext(StoreContext);

    const inputHandler = (event) => {

        const typedInput = event.target.value;
   
        if(typedInput)
        setTempTranslation(typedInput);

        // Typed word incorrect, border color red
        if(typedInput.split('').find(element => element === '_') === undefined && typedInput !== initialTranslation && typedInput.length) {
            setBorderColor('#B65656');
            
            if(typedInput != blockLvlChange) {
                setBlockLvlChange(typedInput)
                increaseLvlDifficulty(user, _id);
            }

            return;
        }

        if(typedInput === initialTranslation){
            setTxtColor('green');
            setBorderColor('green');

            if(typedInput != blockLvlChange) {
                setBlockLvlChange(typedInput)
                decreaseLvlDifficulty(user, _id);
            }

        } else {
            setTxtColor('black');
            setBorderColor('#7E5675');
        }
    }

    const mask = [];
    tempTranslation.split('').map(value => mask.push('c'));
    
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
export default InputTest;