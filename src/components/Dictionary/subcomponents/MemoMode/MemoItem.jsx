import React, { useContext, useState } from "react";
import styled from 'styled-components';
import { StoreContext } from "../../../../store/StoreProvider";
import {increaseLvlDifficulty, decreaseLvlDifficulty} from "../../../../helpers/dbCallFunctions"

const Button = styled.button`
    width: 90px;
    background: ${props => props.bgcolor || 'blue'};
    border-radius: 4px;
    border-color: #584894;
    padding: 15px;
    margin: 10px;
    color: white;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 600px;
    height: 500px;
    align-items: center;
    justify-content: center;
`

const WordWrapper = styled.p`
    margin: 50px;
    font-size: 47px;
    color: ${props => props.color || 'white'}
`

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const MemoItem = ({currentWord, setCurrentWord, index, words}) => {
    const [answerDone, setAnswerDone] = useState(false);
    const {user} = useContext(StoreContext);
    const toggleAnswerBttn = () => setAnswerDone(true);
    const toggleEasyBttn = () => {
        setAnswerDone(false);
        index.setCurrentIndex(prev => prev - 1);
        setCurrentWord(words[index.currentIndex - 1]);
        decreaseLvlDifficulty(user, currentWord._id);
    }
    const toggleCorrectBttn = () => {
        setAnswerDone(false);
        index.setCurrentIndex(prev => prev - 1);
        setCurrentWord(words[index.currentIndex - 1]);
    }
    const toggleHardBttn = () => {
        setAnswerDone(false);
        index.setCurrentIndex(prev => prev - 1);
        setCurrentWord(words[index.currentIndex - 1]);
        increaseLvlDifficulty(user, currentWord._id)
    }

    return (
        <>
            <Wrapper>
                <WordWrapper>{currentWord.translation}</WordWrapper>
                {answerDone && <p>{currentWord.translation.split('').map(item => item = '-').join('')}</p>}
                {answerDone && <WordWrapper color="#16BEBB">{currentWord.word}</WordWrapper>}
            </Wrapper>
            <ButtonWrapper>
                {!answerDone && <Button onClick={() => toggleAnswerBttn()}>Answer</Button>}
                {answerDone && <Button bgcolor="green" onClick={() => toggleEasyBttn()}>easy</Button>}
                {answerDone && <Button onClick={() => toggleCorrectBttn()}>correct</Button>}
                {answerDone && <Button bgcolor="red" onClick={() => toggleHardBttn()}>hard</Button>}
            </ButtonWrapper>
        </>
    )
}

export default MemoItem;