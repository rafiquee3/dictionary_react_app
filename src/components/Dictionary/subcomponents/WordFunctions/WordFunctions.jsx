import React, { useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle} from "react";
import request from '../../../../helpers/request'
import styled, { css } from 'styled-components';
import { StoreContext } from "../../../../store/StoreProvider";

const Button = styled.button`
    height: 60px;
    padding: 0 20px;
    z-index: 10;
    background: #DB7193;
    color: white;
    font-size: 25px;
`
const WordFunctions = ({ _id, word, translation }, ref) => {
//const [isEditBttnClicked, setIsEditBttnClicked] = useState(false); 
const editBttnRef = useRef();

const {

        user,
        setWords,
        editMode,
        setEditMode,
        editedWord,
        setEditedWord,
        editedTranslation,
        setEditedTranslation,
        id,
        setId,
        outsideEditBttnClick,
        setOutsideEditBttnClick,
        editedWordErrors,
        setEditedWordErrors,
        isEditBttnClicked, 
        setIsEditBttnClicked

    } = useContext(StoreContext);

    const getNewListOfWords = async (collectionName) => {
        const {data, status} = await request.post(
            '/words/',
            {collection: collectionName}
        );
        if(status === 200) {
            setWords(data)
        }
        if(data.message) {
            setEditedWordErrors(data.message);
        }
    }

    const changeInputValue = (word, translation) => {
        setEditedWord(word);
        setEditedTranslation(translation);
}

    const deleteWord = async (user, id) => {
        const collectionName = user;
    
        const {data, status} = await request.delete(
            `/words/${user}/${id}`,
            {}
        );
        if(status === 200) {
            getNewListOfWords(collectionName);
        }
        if(data.message) {
            setEditedWordErrors(data.message);
        }
    }

    const saveInToDb = async (id) => {
        const collectionName = user;

        const {data, status} = await request.put(
            `/words/${collectionName}/${id}/${editedWord}/${editedTranslation}`, {}
        );
        if(status === 200) {
            getNewListOfWords(collectionName);
            setEditMode(false);
            changeInputValue('', '');
        }
        if(data.message) {
            changeInputValue(editedWord, editedTranslation);
            setEditMode(true);
            setEditedWordErrors(data.message);
            setIsEditBttnClicked(true);
        }
    }

    const editWord = async (_id, word, translation) => {
  
        if (outsideEditBttnClick) {
            setOutsideEditBttnClick(false);
        }
        setId(_id);
        setEditMode(true);

        if (editedWordErrors && !isEditBttnClicked) setEditedWordErrors('');
        
        if (isEditBttnClicked) {
            setIsEditBttnClicked(false);
            return saveInToDb(_id);
        }
        
        changeInputValue(word, translation);
        setIsEditBttnClicked(true);
    }

    useImperativeHandle(ref, () => ({
        ref: editBttnRef.current,
        setIsEditBttnClicked: () => {
            setIsEditBttnClicked(false);
        }
    }));

    const showBttnLabel = _id === id && editMode ? 'Save' : 'Edit';
    return (
        <>
            <Button onClick={() => deleteWord(user, _id)}>Delete</Button>
            <Button ref={editBttnRef} onClick={() => editWord(_id, word, translation)}>{showBttnLabel}</Button>
        </>
    )
}

export default forwardRef(WordFunctions);