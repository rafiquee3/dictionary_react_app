import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    font-size: 18px;
    font-family: Arial;
`

const ExportToPdf = ({ sort, words }) => {
    let temp = [...words];
    if (sort.sortByDifficultyLvl) temp.sort((a, b) => a.difficulty - b.difficulty)   
    else if (sort.sortByAz) temp.sort((a, b) => a.word < b.word ? 1 : -1)

    const PrintAllWords = temp?.map(word => <p key={word.word}><b>{word.word}</b> - {word.translation}</p>);

    return (
        <>
            <Wrapper>
                <h3>Dictionary - words list:</h3>
                <hr/>
                <br/>
                {PrintAllWords}
            </Wrapper>
        </>
    )
}

export default ExportToPdf;