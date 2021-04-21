import '../styles/globals.css';
import 'antd/dist/antd.css';
import { StoreProvider } from "../store/provider";

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
};
