import { useReducer, createContext } from "react";

const initialState = {
    databases: [],
    collections: [],
    instances: []
};

const actionTypes = {
    SET_DATABASES: "SET_DATABASES",
    SET_COLLECTIONS: "SET_COLLECTIONS",
    SET_INSTANCES: "SET_INSTANCES",
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_DATABASES: {
            return { ...state, databases: action.payload.databases };
        };
        case actionTypes.SET_COLLECTIONS: {
            return { ...state, collections: action.payload.collections };
        };
        case actionTypes.SET_INSTANCES: {
            return { ...state, instances: action.payload.instances };
        };
        default: {
            throw new Error('Unexpected action');
        };
    };
};

export const ThreadsContext = createContext(initialState);

export function ThreadsProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = {
        setDatabases: (newDatabases) => dispatch({
            type: actionTypes.SET_DATABASES,
            payload: {
                databases: newDatabases
            }
        }),
        setCollections: (newCollections) => dispatch({
            type: actionTypes.SET_COLLECTIONS,
            payload: {
                collections: newCollections
            }
        }),
        setInstances: (newInstances) => {
            dispatch({
                type: actionTypes.SET_INSTANCES,
                payload: {
                    instances: newInstances
                }
            })
        }
    };

    return (
        <ThreadsContext.Provider value={[state, actions]}>
            {children}
        </ThreadsContext.Provider>
    );
};