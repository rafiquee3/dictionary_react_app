import React, { useContext } from "react";
import styled, { css } from 'styled-components';
import { StoreContext } from "../../store/StoreProvider";

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
        &:hover {
            color: black;
          }
    }
    .active {
        color: black;
    }
    .desactive {
        color: white;
    }
    .nextPrevBttnDesactive {
        color: gray;
    }
    
`

const LinkPage = ({ clickedLinkFn, numberOfPages }) => {
    const {page, setPage} = useContext(StoreContext);

    const generateElements = () => {
        let reactElements = [];

        reactElements.push(React.createElement('li', { onClick: (event) => clickedLinkFn(event, page - 1), className: `li ${ page === 0 ? 'nextPrevBttnDesactive' : ''}` }, `<`))

        for (let i = 0; i < numberOfPages; i++) {
            reactElements.push(React.createElement('li', { onClick: (event) => clickedLinkFn(event, i), className: `li ${i === page ? 'active' : 'desactive'}` }, `${i + 1}`))
        }

        const length = reactElements.length - 2; 

        reactElements.push(React.createElement('li', { onClick: (event) => clickedLinkFn(event, page + 1), className: `li ${ page === length ? 'nextPrevBttnDesactive' : ''}` }, `>`))

        return reactElements;
    }

    const generateLinks = 
            React.createElement('div', {},
            React.createElement('ul', {className: "ul"},
                generateElements()
            )
    );

    return (
        <>
            <Link>{generateLinks}</Link>
        </>
    )

}
export default LinkPage;