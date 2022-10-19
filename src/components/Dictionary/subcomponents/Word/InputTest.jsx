import React, { useContext, useEffect, forwardRef, useState } from "react";
import styled, { css } from 'styled-components';
import {StoreContext} from "../../../../store/StoreProvider";
import InputMask from 'react-input-mask';
import request from '../../../../helpers/request'

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

const InputTest = ({ tempTranslation, setTempTranslation, initialTranslation, setBorderColor, _id }) => {
   
    const [txtColor, setTxtColor] = useState('black');
    const [blockLvlChange, setBlockLvlChange] = useState(false);
    const { user } = useContext(StoreContext);

    const increaseLvlDifficulty = async (collectionName) => {
        const {data, status} = await request.put(
            `/words/${user}/${_id}`
        );
        if(status === 200) {
            console.log('difficulty level increase');
        }
        if(data.message) {
            //setValidateMessage(data.message);
        }
    }

    const decreaseLvlDifficulty = async (collectionName) => {
        const {data, status} = await request.put(
            `/words/dec/${user}/${_id}`
        );
        if(status === 200) {
            console.log('difficulty level decrease');
        }
        if(data.message) {
            //setValidateMessage(data.message);
        }
    }

    const inputHandler = (event) => {

        const typedInput = event.target.value;
        console.log(typedInput)
        console.log(blockLvlChange)
        if(typedInput)
        setTempTranslation(typedInput);

        // Typed word incorrect, border color red
        if(typedInput.split('').find(element => element === '_') === undefined && typedInput !== initialTranslation && typedInput.length) {
            setBorderColor('#B65656');
            
            if(typedInput != blockLvlChange) {
                setBlockLvlChange(typedInput)
                increaseLvlDifficulty();
            }

            return;
        }

        if(typedInput === initialTranslation){
            setTxtColor('green');
            setBorderColor('green');

            if(typedInput != blockLvlChange) {
                setBlockLvlChange(typedInput)
                decreaseLvlDifficulty();
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