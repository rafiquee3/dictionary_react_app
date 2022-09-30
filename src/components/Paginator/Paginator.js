import React ,{ useContext, useState } from "react";
import { StoreContext } from "../../store/StoreProvider";
import styled, { css } from 'styled-components';

const Link = styled.div`
    display: flex;
    display-direction: rows;
    justify-content: center;
    background: #DB7193;
    color: white;
    font-size: 27px;

    .ul {
        display: flex;
        list-style: none;
    }

    .li {
        cursor: pointer;
        letter-spacing: 7px;
    }
`

const Paginator = ({items, howMany, children}) => {
    const {user, setUser, words, setWords, editedWord, editedTranslation} = useContext(StoreContext);
    const [page, setPage] = useState(0);

    const childrenLength = children.length;
    const numberOfPages = Math.ceil(childrenLength / howMany);
    let linkElements = [...children];

    const showPage = (i) => {
        const allSlice = [];

        for (let i = 0; i < numberOfPages; i++) {
            const slice = linkElements.splice(-howMany);
            allSlice.push(slice);
        }
        if (allSlice[i] !== undefined) allSlice[i].reverse();

        return allSlice[i];
    }

    const generateElements = () => {
        let reactElements = [];

        for (let i = 0; i < numberOfPages; i++) {
            reactElements.push(React.createElement('li', { onClick: () => setPage(i), className: "li" }, `${i + 1}`))
        }

        return reactElements;
    }

    const generateLinks = 
            React.createElement('div', {},
            React.createElement('ul', {className: "ul"},
                generateElements()
            )
    );

    
    const currentPage = page;
    const prevPage = page  === 0 ? 0 : page - 1;
    const currentElem = showPage(currentPage);
    
    
    console.log(showPage(1));

    return (
        <>
            { showPage(page) !== undefined ? currentElem : setPage(prevPage) }
            <Link>{generateLinks}</Link>
        </>
    )
}

export default Paginator;