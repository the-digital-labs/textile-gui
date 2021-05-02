import { useReducer, createContext } from "react";

const initialState = {
    hubKey: null,
    hubSecret: null,
    isDarkMode: false,
    isTableLoading: false,
    isTreeLoading: false,
    isSettingsOpen: false
};

const actionTypes = {
    SET_HUB_KEY: "SET_HUB_KEY",
    SET_HUB_SECRET: "SET_HUB_SECRET",
    SET_DARK_MODE: "SET_DARK_MODE",
    SET_TABLE_LOADING: "SET_TABLE_LOADING",
    SET_TREE_LOADING: "SET_TREE_LOADING",
    SET_SETTINGS_OPEN: "SET_SETTINGS_OPEN"
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_HUB_KEY: {
            return { ...state, hubKey: action.payload.hubKey };
        };
        case actionTypes.SET_HUB_SECRET: {
            return { ...state, hubSecret: action.payload.hubSecret };
        };
        case actionTypes.SET_DARK_MODE: {
            return { ...state, isDarkMode: action.payload.isDarkMode };
        };
        case actionTypes.SET_TABLE_LOADING: {
            return { ...state, isTableLoading: action.payload.isTableLoading };
        };
        case actionTypes.SET_TREE_LOADING: {
            return { ...state, isTreeLoading: action.payload.isTreeLoading };
        };
        case actionTypes.SET_SETTINGS_OPEN: {
            return { ...state, isSettingsOpen: action.payload.isSettingsOpen };
        };
        default: {
            throw new Error('Unexpected action');
        };
    };
};

export const AppContext = createContext(initialState);

export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
        setHubKey: (hubKey: string) => dispatch({
            type: actionTypes.SET_HUB_KEY,
            payload: {
                hubKey: hubKey
            }
        }),
        setHubSecret: (hubSecret: string) => dispatch({
            type: actionTypes.SET_HUB_SECRET,
            payload: {
                hubSecret: hubSecret
            }
        }),
        setIsDarkMode: (isDarkMode: boolean) => dispatch({
            type: actionTypes.SET_DARK_MODE,
            payload: {
                isDarkMode: isDarkMode
            }
        }),
        setIsTableLoading: (isTableLoading: boolean) => dispatch({
            type: actionTypes.SET_TABLE_LOADING,
            payload: {
                isTableLoading: isTableLoading
            }
        }),
        setIsTreeLoading: (isTreeLoading: boolean) => dispatch({
            type: actionTypes.SET_TREE_LOADING,
            payload: {
                isTreeLoading: isTreeLoading
            }
        }),
        setIsSettingsOpen: (isOpen: boolean) => dispatch({
            type: actionTypes.SET_SETTINGS_OPEN,
            payload: {
                isSettingsOpen: isOpen
            }
        })
    };

    return (
        <AppContext.Provider value={[state, actions]}>
            {children}
        </AppContext.Provider>
    );
};