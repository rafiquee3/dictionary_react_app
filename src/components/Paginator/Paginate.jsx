import React ,{ useContext, useEffect } from "react";
import { StoreContext } from "../../store/StoreProvider";
import LinkPage from "./LinkPage";
import styled, { css } from 'styled-components';
import Word from "../Dictionary/subcomponents/Word/Word";

const WordWrapper = styled.div`
    display: flex;
    background: gray;
`

const Paginator = ({ howMany, words}) => {
    const {page, setPage} = useContext(StoreContext);

    const wordsLength = words.length;
    const numberOfPages = Math.ceil(wordsLength / howMany);
    const wordsArr = [...words];
    let linkElements = [...words];
    let prevPage = false;

    const range = (start, end) => {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }

    const showPage = (index) => {
        
        if (linkElements.length === 0) return 'Add a new word';

        const allSlice = [];
        linkElements = linkElements.map((link, i) => link = Object.assign(link, {i}));

        for (let i = 0; i < numberOfPages; i++) {
            const slice = linkElements.splice(-howMany);
            allSlice.push(slice);
        }
        
        if (allSlice[index] === undefined) {
            prevPage = true;
            return null;
        }

        const leftScope = allSlice[index][0].i;
        const rightScope = allSlice[index][allSlice[index].length - 1].i;
        const scopeArr = range(leftScope, rightScope);

        const result = wordsArr.map((word) => {
            if(scopeArr.find(element => element === word.i) !== undefined) {
                return (
                    <WordWrapper key={word.word}>
                        <Word key={word.word} {...word} initial={{...word}} display={'flex'}></Word>
                    </WordWrapper> )
            } else {
                return (
                    <WordWrapper key={word.word}>
                        <Word key={word.word} {...word} initial={{...word}} display={'none'}></Word>
                    </WordWrapper> )
            }
        })
        return result.reverse();
    }

    const clickedLinkFn = (e, page) => {
        if( page < 1) page = 0;

        setPage(page);
    }

    useEffect(() => {
        if (prevPage) {
            setPage(page - 1);
            prevPage = false;
        }
        
    }, [numberOfPages])
    
    return (
        <>  
            {showPage(page)}
            <LinkPage clickedLinkFn={clickedLinkFn} numberOfPages={numberOfPages} />
        </>
    )
}

export default Paginator;