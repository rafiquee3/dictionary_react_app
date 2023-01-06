import React, { useContext } from 'react';
import { renderToStaticMarkup } from "react-dom/server"
import styled from 'styled-components';
import { StoreContext } from '../../../../store/StoreProvider';
import ExportToPdf from '../ExportToPdf/ExportToPdf';
import html2pdf from 'html2pdf.js';

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
        testInverseMode, 
        setTestInverseMode,
        sortByAz,
        setSortByAz, 
        sortByDifficultyLvl, 
        setSortByDifficultyLvl,
        words,
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

    const exportToPdf = () => {
        const opt = {
            margin:       1,
            filename:     'dictionary_words.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        const staticElement = renderToStaticMarkup(<ExportToPdf words={words} sort={{sortByAz, sortByDifficultyLvl}}/>)
        if (words.length) {
            html2pdf(staticElement, opt);
        }
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
                <Button onClick={() => exportToPdf()}>To Pdf</Button>
            </Wrapper>
            }
        </>
    )
}

export default HelpBar;