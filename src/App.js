import React from "react";
import "./app.scss";
import Content from "./components/Content/Content";
import { HashRouter as Router} from "react-router-dom";
import Header from "./components/Header/Header";
import StoreProvider from "./store/StoreProvider";
import styled, { css } from 'styled-components';

const Container = styled.div`
    height: 100vh;
    background: gray; 
`
const App = () => {
    return (
       <StoreProvider>
            <Container>
                <Header />
                <Router>
                    <Content/>
                </Router>
            </Container>
       </StoreProvider>
    )
}

export default App;