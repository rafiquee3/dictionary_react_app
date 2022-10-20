import React, { createContext, useState } from "react";
export const StoreContext = createContext(null);

const StoreProvider = ({children}) => {

    const [words, setWords] = useState([]);
    const [user, setUser] = useState(null);
    const [id, setId] = useState('');
    const [editedWordErrors, setEditedWordErrors] = useState('');
    const [isEditBttnClicked, setIsEditBttnClicked] = useState(false);
    const [page, setPage] = useState(0);
    const [testMode, setTestMode] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchMode, setSearchMode] = useState(false);
    const [testInverseMode, setTestInverseMode] = useState(false);
    const [sortByDifficultyLvl, setSortByDifficultyLvl] = useState(false);
    const [sortByLastAdded, setSortByLastAdded] = useState(false);
    const [sortByAz, setSortByAz] = useState(false);

    return (
        <StoreContext.Provider value={
            {
                user,
                setUser,
                words,
                setWords,
                id, 
                setId,
                editedWordErrors, 
                setEditedWordErrors,
                isEditBttnClicked, 
                setIsEditBttnClicked,
                page, 
                setPage,
                testMode, 
                setTestMode,
                searchValue, 
                setSearchValue,
                searchMode, 
                setSearchMode,
                sortByAz,
                setSortByAz,
                sortByDifficultyLvl, 
                setSortByDifficultyLvl,
                testInverseMode, 
                setTestInverseMode
            }
        }>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;