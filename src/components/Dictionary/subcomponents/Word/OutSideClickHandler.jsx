import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../../../store/StoreProvider";

const OutSideClickHandler = (
    {
        colorPalette,
        setBorderColor, 
        editBttnRef,
        editMode,
        setEditMode, 
        setEditModeInTestMode, 
        setOneClickFnCalled,  
        setOutSideClickListener,
        setShowHint,
        inputTestModeRef, 
        insideWordClickRef, 
        wordFromDbRef, 
    }) => {

    const {
        testMode,
        setIsEditBttnClicked,
    } = useContext(StoreContext);

    useEffect(() => {
        const handleClickOutside = (event) => {

            if (testMode && insideWordClickRef.current.contains(event.target)) {
                if(inputTestModeRef.current)
                inputTestModeRef.current.focus()
            }

            // Click beyond the current word object closes the edition mode
            if (wordFromDbRef.current && !wordFromDbRef.current.contains(event.target) && !editBttnRef.current.ref.contains(event.target)) {
                setEditMode(false);
                setIsEditBttnClicked(false);
                setOutSideClickListener(false);
            
            // Click beyond the current word object closes the test mode
            } else if (testMode && insideWordClickRef.current && !insideWordClickRef.current.contains(event.target)) {
                setEditModeInTestMode(false);
                setOneClickFnCalled(false);
                setOutSideClickListener(false);
                setShowHint(false);

            // Click beyond the found object word restore its default border color
            } else if (!testMode && !editMode && event.target.dataset?.border !== colorPalette.FOUND_WORD_COLOR) {
                setBorderColor(colorPalette.DEFAULT_WORD_COLOR);
                setOutSideClickListener(false);
            }
        }
        document.addEventListener('click', handleClickOutside, true); 

        return () => {
            document.removeEventListener('click', handleClickOutside, true); 
        };
    }, []);

    return (
        <>
        </>
    )
}
export default OutSideClickHandler;