import React, { useEffect, forwardRef, useState } from "react";
import styled, { css } from 'styled-components';

const Input = styled.input`
    background: #9584DB;
    border: 1px solid white;
    color: black;
    font-size: 37px;
    border: none;
    text-align: center;
    letter-spacing: 10px;
`

const InputTest = ({ caret, inititalValue, setCaret, translationTestMode, translationTestModeHandler, value, focus }, ref) => {
    const [leftScope, setLeftScope] = useState(0);
    const [rightScope, setRightScope] = useState(0);

    const setScope = () => {
        const length = value.length;
        let right_scope = value.split('').slice(caret).length;
        const left_scope = length - right_scope;
        
        setLeftScope(left_scope);
        setRightScope(right_scope);
    }
    
    const keyUpHandler = (event) => {
        event.target.selectionStart = caret;
        event.target.selectionEnd = caret;
        console.log('fromOnClick tar: ' + event.target.value)
        console.log('fromOnClick temp: ' + translationTestMode)

        if (event.code === 'ArrowLeft') {
            if(leftScope > 0) {
                setCaret(caret - 1);
            // ++scope;
                event.target.selectionStart = caret - 1;
                event.target.selectionEnd = caret - 1;
            }
        }

        if (event.code === 'ArrowRight') {
            if(rightScope > 0) {
                setCaret(caret + 1);
                event.target.selectionStart = caret + 1;
                event.target.selectionEnd = caret + 1;
            }
        }
        //console.log('montuje inputa')
    }

    useEffect(() => {
        setScope();
    }, [caret]);

    return (
        
            <Input value={value}
                onChange={(event) => translationTestModeHandler(event, inititalValue)}
                ref={ref} 
                onFocus={focus}
                onKeyUp={(event) => keyUpHandler(event)}
                autoFocus
            ></Input>
        
    )
}
export default forwardRef(InputTest);