import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { StoreContext } from '../../../../store/StoreProvider';

const Button = styled.button`
background: ${props => props.bgcolor || 'white'};
border-radius: 4px;
border-color: #584894;
padding: 15px;
color: black;
`

const Wrapper = styled.div`
display: flex;
background: white;
border-radius: 4px;
border: 1px solid gray; 
padding: 15px;
width: 500px;
height: 50px;
`

const TestHelpBar = () => {
    const { testInverseMode, setTestInverseMode } = useContext(StoreContext);
    const handleOnClick = () => setTestInverseMode(prev => !prev);
    return (
        <>
            <Wrapper>
                <Button onClick={() => handleOnClick()}>{testInverseMode ? 'Normal' : 'Inverse'}</Button>
            </Wrapper>
        </>
    )
}

export default TestHelpBar;