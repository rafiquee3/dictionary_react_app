import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/StoreProvider";
import Paginator from '../Paginator/Paginate'
import HelpBar from "./subcomponents/HelpBar/HelpBar";

const Dictionary = () => {
    const {
        user, 
        setUser, 
        words,
        setWords,
        page,
        setPage,
        testMode, 
        setTestMode, 
        searchByDifficultyLvl, 
        setsearchByDifficultyLvl } = useContext(StoreContext);


    return (
        <>
            <HelpBar />
            <Paginator howMany={4} words={words}/>
        </>
    )
}
export default Dictionary;