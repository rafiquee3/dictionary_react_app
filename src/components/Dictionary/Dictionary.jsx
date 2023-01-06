import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/StoreProvider";
import Paginator from '../Paginator/Paginate'
import HelpBar from "./subcomponents/HelpBar/HelpBar";
import styled from 'styled-components';

const LoadPageStatus = styled.div`
    display: flex;
    background: #D9D6D5;
    width: 100%;
    height: 10px;
`

const LoadProgress = styled.div`
    display: flex;
    background: #BE1622;
    width: ${props => props.width};
    height: 10px;
`

const Dictionary = () => {
    const {
        words,
        page,
        showSize, 

    } = useContext(StoreContext);

    const calculateProgress = () => {
        const howManyPages = Math.ceil(words.length / showSize);
        const progress = Math.ceil(((page + 1)/ howManyPages) * 100);
       
        return progress + '%';
    }

    const [loadProgress, setLoadProgress] = useState(calculateProgress());
    
    useEffect(() => {
        setLoadProgress(calculateProgress());

    }, [page])
    
    return (
        <>  
            <LoadPageStatus><LoadProgress width={loadProgress}/></LoadPageStatus>
            <HelpBar/>
            <Paginator howMany={showSize} words={words}/>
        </>
    )
}

export default Dictionary;