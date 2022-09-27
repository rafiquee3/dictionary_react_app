import React, { useContext } from "react";
import request from '../../../../helpers/request'
import styled, { css } from 'styled-components';
import { StoreContext } from "../../../../store/StoreProvider";
import { setInitialValue } from '../Word/Word'
const Button = styled.button`
    height: 60px;
    padding: 0 20px;
    z-index: 10;
    background: #DB7193;
    color: white;
    font-size: 25px;
`
const WordFunctions = ({ _id, word, translation, setInitialValue }) => {
        
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
        callback
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
            setValidateMessage(data.message);
        }
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
            setValidateMessage(data.message);
        }
    }
    const changeInputValue = (word, translation) => {
            setEditedWord(word);
            setEditedTranslation(translation);
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
            setValidateMessage(data.message);
        }
    }
    const editWord = async (_id, word, translation) => {
        setEditMode(!editMode);
        setId(_id);
        changeInputValue(word, translation);
        setInitialValue(word, translation);
  
        if (id === _id && editMode) 
        await saveInToDb(id); 
    }

    const showBttnLabel = _id === id && editMode ? 'Save' : 'Edit';
    return (
        <>
            <Button onClick={() => deleteWord(user, _id)}>Delete</Button>
            <Button onClick={() => editWord(_id, word, translation)}>{showBttnLabel}</Button>
        </>
    )
}
export default WordFunctions;