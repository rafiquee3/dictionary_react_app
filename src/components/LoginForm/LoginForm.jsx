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
    display: flex;
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
    const {user, setUser} = useContext(StoreContext);
    const modalRef = useRef(null);

    const loginHandler = event => {
        setLogin(event.target.value);
    }
    const toggleLogout = event => {
        setUser(null);
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
    const toggleSubmit = async event => {
        event.preventDefault();
 
        const {data, status} = await request.post(
            '/users/find',
            {login, password}
        );
        if(status === 200) {
            console.log(data);
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
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            if(!login && !password) {
            console.log('poza')
            openOrClosedModal();
            }
          }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
      }, [ toggleLoginForm ]);
    
    const setButtonLabel = Boolean(user) ? (<Button onClick={toggleLogout} bgcolor="#9583DB">Wyloguj</Button>) : (<Button onClick={openOrClosedModal} bgcolor="#9583DB">Zaloguj sie</Button>);
    
    return(
        <>
        {setButtonLabel}
        <Modal  isShowing={isLoginFormShowed}>
            <Form ref={modalRef} onSubmit={toggleSubmit} method="post">       
                <CloseButton onClick={toggleLoginForm}>X</CloseButton>
                {validateMessage}
                
                <Input type="text" placeholder="Username" value={login} onChange={loginHandler}/>
                <Input type="password" placeholder="Password" value={password} onChange={passwordHandler}/>

                <Button type="submit" value="Login" bgcolor="#9583DB">Login</Button>
          
          </Form>
        </Modal>
        </>
    )
}
export default LoginForm;