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
    const [flag, setFlag] = useState(false);
    const [flagWasUpdated, setFlagWasUpdated] = useState(false);
  /*   const fetchData = async () => {
        const { data } = await request.get('/courses') //pobierz z Api o sciezce /courses

        setCourses(data.courses);
    }
    //wstrzykiwanie danych po zaladowaniu aplikacji
    useEffect(() => {
        fetchData();

    }, []); //pusta tablica oznacza pojedyncze wykonanie */
    
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
                flag, setFlag
            }
        }>
            {children}
        </StoreContext.Provider>
    );
};
export default StoreProvider;