import React, { useContext } from "react";
import styled, { css } from 'styled-components';

const WordFromDb = styled.div`
    display: flex;
    display-direction: column;
    align-items: center;
    justify-content: center;
    width: 600px;
    height: 70px;
    background: #7E5675;
    color: white;
    font-size: 37px;
    border-radius: 12px;
    margin: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const Word = ({ word, translation }) => {
    
    return (
        <>
            <WordFromDb>{word + " - " + translation}</WordFromDb>
        </>
    )
}
export default Word;