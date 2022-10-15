import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../../../store/StoreProvider";

const OutSideClickHandler = (
    {
        borderColor, 
        setBorderColor, 
        editBttnRef, 
        setEditModeInTestMode, 
        setOneClickFnCalled,  
        setOutSideClickListener, 
        insideWordClickRef, 
        wordFromDbRef, 
        colorPalette}) => {

    const {
        setEditMode,
        testMode,
        setIsEditBttnClicked,
    } = useContext(StoreContext);

    useEffect(() => {
        const handleClickOutside = (event) => {
            console.log('click outside')
         
            if (!testMode) {
                console.log('from handle click out edit mode')
                // Click beyond the found object word restore its default value
                if (!wordFromDbRef.current) {
                    if (borderColor === colorPalette.FOUND_WORD_COLOR) {
                        setBorderColor(colorPalette.DEFAULT_WORD_COLOR);
                        setOutSideClickListener(false);
                    }
                }
                // Click beyond the current word object closes the edition mode
                if (wordFromDbRef.current && !wordFromDbRef.current.contains(event.target) && !editBttnRef.current.ref.contains(event.target)) {
                    setEditMode(false);
                    setIsEditBttnClicked(false);
                    setOutSideClickListener(false);
                }
    
            } else if (testMode && insideWordClickRef.current && !insideWordClickRef.current.contains(event.target)) {
                setEditModeInTestMode(false);
                setOneClickFnCalled(false);
                setOutSideClickListener(false);
            } 
        };
        document.addEventListener('click', handleClickOutside, true); 

        return () => {
            document.removeEventListener('click', handleClickOutside, true); 
        };
    }, [])

    return (
        <>
        </>
    )
}
export default OutSideClickHandler;