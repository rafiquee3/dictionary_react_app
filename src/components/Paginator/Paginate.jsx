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
        setSearchMode,
        editedWordErrors, 
        setEditedWordErrors,
        sortByAz,
        setSortByAz,
        sortByDifficultyLvl, 
        setSortByDifficultyLvl } = useContext(StoreContext);

    const wordsLength = words.length;
    const numberOfPages = Math.ceil(wordsLength / howMany);
    let wordsArr = [...words];

    let wordElements = [...words];
    let prevPage = false;
    let searchPage = false;
    let searchNotFound = false;
    
    // Generate new array [start, ... , end]
    const range = (start, end) => {
        return Array(end - start + 1).fill().map((_, i) => start + i)
    }

    const showPage = (index) => {
        
        if (wordElements.length === 0) return 'Add a new word';

        const allSlice = [];

        if (sortByDifficultyLvl) {
            console.log('sort d lvl')
            wordElements.sort((a, b) => a.difficulty - b.difficulty);
            wordsArr = wordElements; 
        }

        if (sortByAz) {
            console.log('sort by az')
            wordElements.sort((a, b) => a.word < b.word ? 1 : -1);
            wordsArr = wordElements; 
        }

        console.log(wordElements)
        wordElements = wordElements.map((word, i) => word = Object.assign(word, {i}));
    
        for (let i = 0; i < numberOfPages; i++) {
            const slice = wordElements.splice(-howMany);
            allSlice.push(slice);
        }
        
        if (allSlice[index] === undefined) {
            prevPage = true;
            return null;
        }
       
        if(searchMode) {
            console.log('SEARCH MODE')
            // searchValue.i is a global variable with the index of the searched object
            if(searchValue !== undefined) {
                allSlice.forEach((element, i) => {
                    if(element.find(element => element.i === searchValue.i)) {
                        index = i;
                        searchPage = index;
                    }
                })
            } else {
                searchNotFound = true;
            }
        }
        console.log(allSlice)
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

    const clickedLinkFn = (page) => {
        if( page < 1) page = 0;
        if (page > numberOfPages - 1) page -= 1;
    
        setPage(page);
    }

    useEffect(() => {
        console.log('UseEffect 1 pagi')
        if (prevPage) {
            setPage(page - 1);
            prevPage = false;
        }
        
    }, [numberOfPages])
    
    useEffect(() => {
        console.log('UseEffect 2 pagi')
        if (searchPage !== false) {
            console.log('UseEffect 2 pagi w if searchPage')
            setPage(searchPage);
            searchPage = false;
            setSearchMode(false);
        }
        if (searchNotFound) {
            setSearchMode(false);
            
        }
    }, [searchMode])
    console.log('reneruje paginate')
    return (
        <>  
            {showPage(page)}
            <LinkPage clickedLinkFn={clickedLinkFn} numberOfPages={numberOfPages} />
        </>
    )
}

export default Paginator;