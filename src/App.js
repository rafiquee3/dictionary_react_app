import React from "react";
import "./app.scss";
import Header from "./components/Header/Header";
import StoreProvider from "./store/StoreProvider";

const App = () => {
    return (
       <StoreProvider>
            <Header />
       </StoreProvider>
    )
}

export default App;