import React, { useContext, useRef, useState, useEffect } from "react";
import request from "../../helpers/request";
import Modal from "../Modal/Modal";
import useModal from "../Modal/useModal";
import { StoreContext } from "../../store/StoreProvider";
import styled, { css } from 'styled-components';

const Button = styled.button`
    background: ${props => props.bgcolor || 'white'};
    border-radius: 4px;
    border-color: #584894;
    padding: 15px;
    color: white;
`
const CloseButton = styled.button`
    display: block;
    width: 20px;
    background: transparent;
    border: none;
    color: white;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    background: #584894;
    border-radius: 4px;
    border-color: #584894;
    padding: 15px;
    color: white;
`
const Input = styled.input`
    background: 'white';
    border-radius: 4px;
    border-color: #584894;
    padding: 15px;
    color: black;
`

const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [validateMessage, setValidateMessage] = useState('');
    const {isShowing: isLoginFormShowed, toggle: toggleLoginForm} = useModal();
    const {user, setUser,  words, setWords} = useContext(StoreContext);
    const modalRef = useRef(null);

    const loginHandler = event => {
        setLogin(event.target.value);
    }
    const toggleLogout = event => {
        setUser(null);
        setWords('');
    }
    const passwordHandler = event => {
        setPassword(event.target.value);
    }
    const clearInputField = () => {
        setLogin('');
        setPassword('');
        setValidateMessage('');
    }
    const openOrClosedModal = () => {
        clearInputField();
        toggleLoginForm();
    }
    const fetchDataUser = async (login) => {
        const {data, status} = await request.post(
            '/words/',
            {collection: login}
        );
        if(status === 200) {
            setWords(data)
            console.log(data)
        }
        if(data.message) {
            setValidateMessage(data.message);
        }
    }
    const toggleSubmit = async (event) => {
        event.preventDefault();
        console.log(login)
        const {data, status} = await request.post(
            '/users/find',
            {login, password}
        );
        if(status === 200) {
            await fetchDataUser(login);
            setUser(data.login);
            toggleLoginForm();
            clearInputField();
        }
        if(data.message) {
            setValidateMessage(data.message);
        }
    }

    //click outside loginform close component 
    useEffect(() => {
        const handleClickOutside = (event) => {
            console.log('capturing')
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            if(!login && !password) {
            console.log('poza')
            openOrClosedModal();
            }
          }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true); // 3th arg listen on capturing phase instead off bubbling phase
        };
      }, [ toggleLoginForm ]);

    const handleKeypress = e => {
    
      if (e.code === 'Enter') {
        toggleSubmit(e);
      }
    };
    const setButtonLabel = Boolean(user) ? (<Button onClick={toggleLogout} bgcolor="#9583DB">Wyloguj</Button>) : (<Button onClick={openOrClosedModal} bgcolor="#9583DB">Zaloguj sie</Button>);
    
    return (
        <>
        {setButtonLabel}
        <Modal  isShowing={isLoginFormShowed}>
            <Form ref={modalRef} onSubmit={toggleSubmit} method="post" onKeyPress={e => handleKeypress(e)}>       
                <CloseButton onClick={openOrClosedModal}>X</CloseButton>
                {validateMessage}
                
                <Input type="text" placeholder="Username" value={login} onChange={loginHandler}/>
                <Input type="password" placeholder="Password" value={password} onChange={passwordHandler}/>

                <Button type="submit" value="Login" bgcolor="#584894">Login</Button>
          
          </Form>
        </Modal>
        </>
    )
}
export default LoginForm;