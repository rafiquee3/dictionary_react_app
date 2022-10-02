import React ,{ useContext, useState } from "react";
import { StoreContext } from "../../store/StoreProvider";
import LinkPage from "./LinkPage";

const Paginator = ({items, howMany, children}) => {
    const {user, setUser, words, setWords, editedWord, editedTranslation, page, setPage} = useContext(StoreContext);

    const childrenLength = children.length;
    const numberOfPages = Math.ceil(childrenLength / howMany);
    let linkElements = [...children];

    const showPage = (i) => {
        const allSlice = [];

        for (let i = 0; i < numberOfPages; i++) {
            const slice = linkElements.splice(-howMany);
            allSlice.push(slice);
        }
        if (allSlice[i] !== undefined) allSlice[i].reverse();

        return allSlice[i];
    }

    const clickedLinkFn = (e, i) => {
        setPage(i);
    }

    const currentPage = page;
    const currentElem = showPage(currentPage);

    return (
        <>
            { showPage(page) !== undefined ? currentElem : page === 0 ? 'Add new word' : setPage(page - 1) }
            <LinkPage clickedLinkFn={clickedLinkFn} numberOfPages={numberOfPages} />
        </>
    )
}

export default Paginator;