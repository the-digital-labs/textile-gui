import React, { useEffect } from "react";
import '../styles/globals.css';
import 'antd/dist/antd.min.css';
import { StoreProvider } from "../store/provider";
import { DARK_MODE } from "../config.js";
import Home from "./index";

export default function App() {

  useEffect(() => {
    if (DARK_MODE) {
      import("antd/dist/antd.dark.min.css");
    }
  }, [])

  return (
    <StoreProvider>
      <Home />
    </StoreProvider>
  );
};
