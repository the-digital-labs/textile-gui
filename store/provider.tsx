import { ThreadsProvider } from "./threads";

export function StoreProvider({ children }) {
    return (
        <ThreadsProvider>
            {children}
        </ThreadsProvider>
    )
}