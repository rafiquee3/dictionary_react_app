import React, { createContext, useEffect, useState } from "react";
import request from "../helpers/request";
export const StoreContext = createContext(null);

const StoreProvider = ({children}) => {
    const [words, setWords] = useState([]);
    const [user, setUser] = useState(null); //niezalogowany

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
                setWords
            }
        }>
            {children}
        </StoreContext.Provider>
    );
};
export default StoreProvider;