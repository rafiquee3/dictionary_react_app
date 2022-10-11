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
    const {
        page, 
        setPage, 
        searchValue, 
        setSearchValue,
        searchMode, 
        setSearchMode,} = useContext(StoreContext);

    const wordsLength = words.length;
    const numberOfPages = Math.ceil(wordsLength / howMany);
    const wordsArr = [...words];
    let wordElements = [...words];
    let prevPage = false;
    let searchPage = false;

    const range = (start, end) => {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }

    const showPage = (index) => {
        
        if (wordElements.length === 0) return 'Add a new word';

        const allSlice = [];
        wordElements = wordElements.map((link, i) => link = Object.assign(link, {i}));
        const copyOfWordElements = [...wordElements];

        for (let i = 0; i < numberOfPages; i++) {
            const slice = wordElements.splice(-howMany);
            allSlice.push(slice);
        }
        
        if (allSlice[index] === undefined) {
            prevPage = true;
            return null;
        }
       
        // search item
        if(searchMode) {

            let findObj = copyOfWordElements.find(element => element.word === searchValue);
            if(findObj) {
                allSlice.forEach((element, i, arr) => {
                    if(element.find(element => element.i === findObj.i)) {
                        index = i;
                        searchPage = index;
                    }
                })

            } else {
                console.log('nie znalazlem')
            }
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
    
    useEffect(() => {
        if (searchPage) {
            setPage(searchPage);
            searchPage = false;
        }
        
    }, [searchMode])
    
    return (
        <>  
            {showPage(page)}
            <LinkPage clickedLinkFn={clickedLinkFn} numberOfPages={numberOfPages} />
        </>
    )
}

export default Paginator;