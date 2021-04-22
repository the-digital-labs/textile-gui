import { useReducer, createContext } from "react";

const initialState = {
    isTableLoading: false,
    isTreeLoading: false
};

const actionTypes = {
    SET_TABLE_LOADING: "SET_TABLE_LOADING",
    SET_TREE_LOADING: "SET_TREE_LOADING"
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_TABLE_LOADING: {
            return { ...state, isTableLoading: action.payload.isTableLoading };
        };
        case actionTypes.SET_TREE_LOADING: {
            return { ...state, isTreeLoading: action.payload.isTreeLoading };
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
        setIsTableLoading: (isTableLoading) => dispatch({
            type: actionTypes.SET_TABLE_LOADING,
            payload: {
                isTableLoading: isTableLoading
            }
        }),
        setIsTreeLoading: (isTreeLoading) => dispatch({
            type: actionTypes.SET_TREE_LOADING,
            payload: {
                isTreeLoading: isTreeLoading
            }
        })
    };

    return (
        <AppContext.Provider value={[state, actions]}>
            {children}
        </AppContext.Provider>
    );
};