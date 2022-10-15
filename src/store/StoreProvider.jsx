import React, { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);

const StoreProvider = ({children}) => {
    const [words, setWords] = useState([]);
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [id, setId] = useState('');
    const [editedWordErrors, setEditedWordErrors] = useState('');
    const [isEditBttnClicked, setIsEditBttnClicked] = useState(false);
    const [page, setPage] = useState(0);
    const [testMode, setTestMode] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchMode, setSearchMode] = useState(false);
    const [wordComponentIsMounted, setWordComponentIsMounted] = useState(false);
    return (
        <StoreContext.Provider value={
            {
                user,
                setUser,
                words,
                setWords,
                editMode, 
                setEditMode,
                id, 
                setId,
                editedWordErrors, 
                setEditedWordErrors,
                isEditBttnClicked, 
                setIsEditBttnClicked,
                wordComponentIsMounted,
                setWordComponentIsMounted,
                page, 
                setPage,
                testMode, 
                setTestMode,
                searchValue, 
                setSearchValue,
                searchMode, 
                setSearchMode,
            }
        }>
            {children}
        </StoreContext.Provider>
    );
};
export default StoreProvider;