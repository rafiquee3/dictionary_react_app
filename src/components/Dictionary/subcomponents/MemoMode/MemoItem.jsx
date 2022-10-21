import React from "react";

const MemoItem = ({currentWord, setCurrentWord}) => {

    console.log(currentWord)
    return (
        <>
            <p>{currentWord.word}</p>
            <p>{currentWord.translation}</p>
        </>
    )
}

export default MemoItem;