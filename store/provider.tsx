import React from "react";
import { ThreadsProvider } from "./threads";
import { AppProvider } from "./app";

export function StoreProvider({ children }) {
    return (
        <AppProvider>
            <ThreadsProvider>
                {children}
            </ThreadsProvider>
        </AppProvider>
    )
}