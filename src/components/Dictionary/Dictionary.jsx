import React, { useContext } from "react";
import { StoreContext } from "../../store/StoreProvider";
import Word from "./subcomponents/Word/Word";

const Dictionary = () => {
    const {user, setUser, words, setWords} = useContext(StoreContext);

    const listOfAllWords = words !== null ? (words
        .map(word => <Word key={word._id} {...word}></Word>)) : '';
    return (
        <>
            {listOfAllWords.reverse()}
        </>
    )
}
export default Dictionary;