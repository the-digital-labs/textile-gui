import React from "react";
import '../styles/globals.css';
import 'antd/dist/antd.css';
import { StoreProvider } from "../store/provider";
import { DARK_MODE } from "../config.js";
import { useEffect } from 'react';

export default function App() {

  useEffect(() => {
    if (DARK_MODE) {
      import("../styles/antd.dark.min.css");
    }
  }, [])

  return (
    <StoreProvider>
      <Index />
    </StoreProvider>
  );
};
