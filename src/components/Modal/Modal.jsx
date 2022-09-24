import React from "react";
import ReactDOM from "react-dom";
import styled, { css } from 'styled-components';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1040;
    background-color: rgba(0, 0, 0, 0.5);
`
const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
    display: flex;
    align-items: center;
`
const ModalContent = styled.div`
    z-index: 100;
    background: #fff;
    position: relative;
    margin: auto;
    border-radius: 5px;
    max-width: 500px;
    width: 80%;
`
const ModalButton = styled.button`
    font-size: 1.4rem;
    font-weight: 700;
    color: #000;
    cursor: pointer;
    border: none;
    background: transparent;
`
const Modal = ({ isShowing, children }) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
            <ModalOverlay>
                <ModalWrapper>
                    <ModalContent>
                        {children}
                    </ModalContent>
                </ModalWrapper>
            </ModalOverlay>
        </>,
        document.body
      )
    : null;

export default Modal;