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

const HelpBar = () => {
    const { 
        testMode, 
        editMode, 
        testInverseMode, 
        setTestInverseMode,
        sortByAz,
        setSortByAz, 
        sortByDifficultyLvl, 
        setSortByDifficultyLvl,
    } = useContext(StoreContext);

    const inverseMode = () => setTestInverseMode(prev => !prev);
    
    const sortByDiffLvl = () => {
        setSortByAz(false);
        setSortByDifficultyLvl(true);
    }

    const sort_ByLastAdded = () => {
        setSortByDifficultyLvl(false);
        setSortByAz(false);
    }

    const sort_ByAz = () => {
        setSortByDifficultyLvl(false);
        setSortByAz(true);
    }

    return (
        <>
            { testMode ?
            <Wrapper>
                <Button onClick={() => inverseMode()}>{testInverseMode ? 'Normal' : 'Inverse'}</Button>
            </Wrapper>

            :

            <Wrapper>
                <Button onClick={() => sortByDiffLvl()}>difficulty lvl</Button>
                <Button onClick={() => sort_ByLastAdded()}>last added</Button>
                <Button onClick={() => sort_ByAz()}>A - Z</Button>
            </Wrapper>
            }
        </>
    )
}

export default HelpBar;