import React, { useContext, useState } from "react";
import request from "../../helpers/request";
import styled, { css } from 'styled-components';

const Button = styled.button`
    background: ${props => props.bgcolor || 'white'};
    border-radius: 4px;
    border-color: #584894;
    padding: 15px;
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

const RegisterForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [validateMessage, setValidateMessage] = useState('');

    const loginHandler = event => {
        setLogin(event.target.value);
    }
    const passwordHandler = event => {
        setPassword(event.target.value);
    }
    const clearInputField = () => {
        setLogin('');
        setPassword('');
        setValidateMessage('');
    }
    const toggleSubmit = async event => {
        event.preventDefault();
        const {data, status} = await request.post(
            '/users/add',
            {login, password}
        );
        if(status === 200) {
            clearInputField();
            console.log(data);
        }
        if(data.message) {
            console.log(data.message)
            setValidateMessage(data.message);
        }
    }
    //const errorHandler = typeof validateMessage !== 'string' ? validateMessage.map(message => <p key={message.error}>{message.field}: {message.error}</p>) : validateMessage;
   
    const errorLogin = typeof validateMessage !== 'string' ? validateMessage
    .filter(message => message.field === "login")
    .map(message => <p key={message.error}>{message.field}: {message.error}</p>) : '';

    const errorPassword = typeof validateMessage !== 'string' ? validateMessage
    .filter(message => message.field === "password")
    .map(message => <p key={message.error}>{message.field}: {message.error}</p>) : '';

    const otherErrors = typeof validateMessage !== 'string' ? '' : validateMessage;
   
    return (
        <>
            <Form onSubmit={toggleSubmit} method="post">
                
                <Input type="text" placeholder="Username" value={login} onChange={loginHandler}/>
                {errorLogin}
                <Input type="password" placeholder="Password" value={password} onChange={passwordHandler}/>
                {errorPassword}
                <Button type="submit" value="Login" bgcolor="#9583DB">Sign in</Button>
                {otherErrors}

            </Form>
        </>
    )
}
export default RegisterForm;