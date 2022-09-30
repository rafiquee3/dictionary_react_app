import React, { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);

const StoreProvider = ({children}) => {
    const [words, setWords] = useState([]);
    const [user, setUser] = useState(null); //niezalogowany
    const [editMode, setEditMode] = useState(false);
    const [id, setId] = useState('');
    const [editedWord, setEditedWord] = useState('');
    const [editedTranslation, setEditedTranslation] = useState('');
    const [editedWordErrors, setEditedWordErrors] = useState('');
    const [outsideEditBttnClick, setOutsideEditBttnClick] = useState(false);
    const [isEditBttnClicked, setIsEditBttnClicked] = useState(false);

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
                editedWord,
                setEditedWord,
                editedTranslation, 
                setEditedTranslation,
                editedWordErrors, 
                setEditedWordErrors,
                outsideEditBttnClick, 
                setOutsideEditBttnClick,
                isEditBttnClicked, 
                setIsEditBttnClicked,
            }
        }>
            {children}
        </StoreContext.Provider>
    );
};
export default StoreProvider;