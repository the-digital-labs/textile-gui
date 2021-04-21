import { useReducer, createContext } from "react";

const initialState = {
    threads: [],
    collections: [],
    instances: [],
    selectedThread: null,
    selectedCollection: null,
    treeData: []
};

const actionTypes = {
    SET_THREADS: "SET_THREADS",
    SET_COLLECTIONS: "SET_COLLECTIONS",
    SET_INSTANCES: "SET_INSTANCES",
    SET_SELECTED_THREAD: "SET_SELECTED_THREAD",
    SET_SELECTED_COLLECTION: "SET_SELECTED_COLLECTION",
    SET_TREE_DATA: "SET_TREE_DATA"
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_THREADS: {
            return { ...state, threads: action.payload.threads };
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
        case actionTypes.SET_TREE_DATA: {
            return { ...state, treeData: action.payload.treeData };
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
        setThreads: (threads) => dispatch({
            type: actionTypes.SET_THREADS,
            payload: {
                threads: threads
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
        },
        setTreeData: (treeData) => {
            dispatch({
                type: actionTypes.SET_TREE_DATA,
                payload: {
                    treeData: treeData
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