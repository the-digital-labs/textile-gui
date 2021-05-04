import React, { useEffect } from "react";
import ReactDOM from 'react-dom'
import './styles/globals.css';
import 'antd/dist/antd.min.css';
import { StoreProvider } from "./store/provider";
import { DARK_MODE } from "./config.js";
import Main from "./Main";

function App() {

  useEffect(() => {
    if (DARK_MODE) {
      import("antd/dist/antd.dark.min.css");
    }
  }, [])

  return (
    <StoreProvider>
      <Main />
    </StoreProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('react-container'))