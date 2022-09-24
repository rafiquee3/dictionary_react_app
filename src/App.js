import React from "react";
import "./app.scss";
import Content from "./components/Content/Content";
import { HashRouter as Router} from "react-router-dom";
import Header from "./components/Header/Header";
import StoreProvider from "./store/StoreProvider";

const App = () => {
    return (
       <StoreProvider>
            <Header />
            <Router>
                <Content/>
            </Router>
       </StoreProvider>
    )
}

export default App;