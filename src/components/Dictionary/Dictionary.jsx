import React, { useContext, useState } from "react";
import { StoreContext } from "../../store/StoreProvider";
import styled, { css } from 'styled-components';
import Paginator from '../Paginator/Paginate'
//import PaginatedItems from '../Paginator/Paginate';
import Word from "./subcomponents/Word/Word";

const WordWrapper = styled.div`
    display: flex;
    background: gray;
`

const Dictionary = () => {
    const {user, setUser, words, setWords, editedWord, editedTranslation, testMode, setTestMode} = useContext(StoreContext);

    return (
        <>
            <Paginator howMany={4} words={words}/>
        </>
    )
}
export default Dictionary;