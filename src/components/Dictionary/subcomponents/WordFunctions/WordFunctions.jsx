import React, { useContext, useEffect, useState, useRef, forwardRef, useImperativeHandle} from "react";
import request from '../../../../helpers/request'
import styled, { css } from 'styled-components';
import { StoreContext } from "../../../../store/StoreProvider";
import useTimeout from "./useTimeout";

const Button = styled.button`
    height: 60px;
    padding: 0 20px;
    z-index: 10;
    background: #DB7193;
    color: white;
    font-size: 25px;
`
const WordFunctions = ({ _id, word, translation, setInitialValue }, ref) => {
const [isEditBttnClicked, setIsEditBttnClicked] = useState(false); 
const bttnRef = useRef();

let errorShowTime = '';
    const {

        user,
        setWords,
        editMode,
        setEditMode,
        editedWord,
        flagWasUpdated, 
        setEditedWord,
        editedTranslation,
        setEditedTranslation,
        id,
        setId,
        flag,
        setFlag,
        editedWordErrors,
        setEditedWordErrors,

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
            changeInputValue(editedWord, editedTranslation);
            setEditMode(true);
            setEditedWordErrors(data.message);
            setIsEditBttnClicked(true);
            
            //errorShowTime = setTimeout(() => setEditedWordErrors(''), 4000);
        }
    }
    const editWord = async (_id, word, translation) => {
        //setFlag(true);
        if(flag) {
            setFlag(false);
        }
        setId(_id);
        setEditMode(true);
        console.log('edit true')
        setEditedWordErrors('')
        changeInputValue(word, translation);

        if (isEditBttnClicked) {
            setEditMode(false);
            setIsEditBttnClicked(false);
            return saveInToDb(_id);
        }
        
        
        setIsEditBttnClicked(true);
    }

    useImperativeHandle(ref, () => ({
        ref: bttnRef.current,
        setIsEditBttnClicked: () => {
            setIsEditBttnClicked(false);
        }
    }));

    const showBttnLabel = _id === id && editMode ? 'Save' : 'Edit';
    return (
        <>
            <Button onClick={() => deleteWord(user, _id)}>Delete</Button>
            <Button ref={bttnRef} onClick={() => editWord(_id, word, translation)}>{showBttnLabel}</Button>
        </>
    )
}
export default forwardRef(WordFunctions);