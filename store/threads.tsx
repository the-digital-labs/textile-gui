import { useReducer, createContext } from "react";

const initialState = {
    databases: [],
    collections: [],
    instances: [],
    selectedThread: null,
    selectedCollection: null
};

const actionTypes = {
    SET_DATABASES: "SET_DATABASES",
    SET_COLLECTIONS: "SET_COLLECTIONS",
    SET_INSTANCES: "SET_INSTANCES",
    SET_SELECTED_THREAD: "SET_SELECTED_THREAD",
    SET_SELECTED_COLLECTION: "SET_SELECTED_COLLECTION"
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
        case actionTypes.SET_SELECTED_THREAD: {
            return { ...state, selectedThread: action.payload.selectedThread };
        };
        case actionTypes.SET_SELECTED_COLLECTION: {
            return { ...state, selectedCollection: action.payload.selectedCollection };
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
        },
        setSelectedThread: (thread) => {
            dispatch({
                type: actionTypes.SET_SELECTED_THREAD,
                payload: {
                    selectedThread: thread
                }
            })
        },
        setSelectedCollection: (collection) => {
            dispatch({
                type: actionTypes.SET_SELECTED_COLLECTION,
                payload: {
                    selectedCollection: collection
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