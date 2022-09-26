import React, { useContext } from "react";
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
const WordFunctions = ({ _id, word, translation }) => {
        
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
        setId
    
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
    const saveInToDb = async (id) => {
        const collectionName = user;

        const {data, status} = await request.put(
            `/words/${collectionName}/${id}/${editedWord}/${editedTranslation}`, {}
        );
        if(status === 200) {
            getNewListOfWords(collectionName);
            setEditMode(false);
            
        }
        if(data.message) {
            setValidateMessage(data.message);
        }
    }
    const editWord = async (id) => {
        if (id === _id && editMode) {
            await saveInToDb(id);
        }
        setEditMode(!editMode);
        setId(id);
    }
    //console.log(editedWord + "-" + editedTranslation);
    const showBttnLabel = _id === id && editMode ? 'Save' : 'Edit';
    return (
        <>
            <Button onClick={() => deleteWord(user, _id)}>Delete</Button>
            <Button onClick={() => editWord(_id)}>{showBttnLabel}</Button>
        </>
    )
}
export default WordFunctions;