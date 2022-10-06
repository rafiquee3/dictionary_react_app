import React from "react";
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

const InputTest = ({ value }) => {

    return (
        
            <Input value={value}></Input>
        
    )
}
export default InputTest;