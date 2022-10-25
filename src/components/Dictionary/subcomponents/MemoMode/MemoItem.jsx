import React, { useContext, useEffect, useState } from "react";
import HelpBar from "../HelpBar/HelpBar";
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
    const [trainingDone, setTrainingDone] = useState(false);
    const [goodAnswer, setGoodAnswer] = useState(0);
    const [badAnswer, setBadAnswer] = useState(0);
    const {
        user, 
        sortByAz,
        sortByDifficultyLvl,
        setShowMemoMode, 
    } = useContext(StoreContext);

    const changeWord = () => {
        if(index.currentIndex > 0) {
            index.setCurrentIndex(prev => prev - 1);
            setCurrentWord(words[index.currentIndex - 1]);
        } else {
            setTrainingDone(true);
        }
    }
    const toggleAnswerBttn = () => setAnswerDone(true);
    const toggleAgainBttn = () => {
        index.setCurrentIndex(words.length - 1);
        setCurrentWord(words[words.length - 1]);
        setBadAnswer(0);
        setGoodAnswer(0);  
        setTrainingDone(false);
    }
    const toggleEasyBttn = () => {   
        changeWord();
        setAnswerDone(false);
        setGoodAnswer(prev => prev + 1);
        decreaseLvlDifficulty(user, currentWord._id);
    }
    const toggleCorrectBttn = () => {
        changeWord();
        setGoodAnswer(prev => prev + 1);
        setAnswerDone(false);
    }
    const toggleHardBttn = () => {
        changeWord();
        setBadAnswer(prev => prev + 1);
        setAnswerDone(false);
        increaseLvlDifficulty(user, currentWord._id)
    }
    const toggleExitBttn = () => {
        setShowMemoMode(false);
    }

    useEffect(() => {
        if (!trainingDone) {
            index.setCurrentIndex(words.length - 1);
            setCurrentWord(words[index.currentIndex]);
        }
        return () => {
            index.setCurrentIndex(words.length - 1);
            setCurrentWord(words[index.currentIndex]);
        }
    }, [sortByAz, sortByDifficultyLvl])

    return (
        <>  
            {!trainingDone && <HelpBar />}
            {!trainingDone ?
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
            :
            <>
                <Wrapper>
                    <WordWrapper color="green">Good answer: {goodAnswer}</WordWrapper>
                    <WordWrapper color="red">Bad answer: {badAnswer}</WordWrapper>
                </Wrapper>
                <ButtonWrapper>
                    <Button  onClick={() => toggleAgainBttn()}>again</Button>
                    <Button bgcolor="red" onClick={() => toggleExitBttn()}>exit</Button>
                </ButtonWrapper>
            </>
            }
        </>
    )
}

export default MemoItem;