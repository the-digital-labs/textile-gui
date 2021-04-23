import '../styles/globals.css';
import 'antd/dist/antd.css';
import { StoreProvider } from "../store/provider";
import { DARK_MODE } from "../config.js";
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {

  useEffect(() => {
    if (DARK_MODE) {
      import("../styles/antd.dark.css");
    }
  }, [])

  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
};
