import React, { useContext, useState } from "react";
import { StoreContext } from "../../store/StoreProvider";
import Paginator from '../Paginator/Paginate'
import TestHelpBar from "./subcomponents/TestHelpBar/TestHelpBar";

const Dictionary = () => {
    const {user, setUser, words, setWords, editedWord, editedTranslation, testMode, setTestMode} = useContext(StoreContext);

    return (
        <>
            { testMode && <TestHelpBar />}
            <Paginator howMany={4} words={words}/>
        </>
    )
}
export default Dictionary;