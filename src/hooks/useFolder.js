import { useEffect, useReducer } from 'react';
import { DATABASE } from '../firebaseSetup';
import { useAuth } from '../contexts/AuthContext';

export const ROOT = {
    name: 'root',
    id: null,
    path: [],
};

const ACTIONS = {
    SELECT_FOLDER: 'select-folder',
    UPDATE_FOLDER: 'update-folder',
    UPDATE_CHILD_FILES: 'update-child-files',
    UPDATE_CHILD_FOLDERS: 'update-child-folders',
};

const reducer = (state, { type, payload }) => {
    switch(type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folder: payload.folder,
                folderId: payload.folderId,
                childFiles: [],
                childFolders: [],
            }
        case ACTIONS.UPDATE_FOLDER:
            return {
                ...state,
                folder: payload.folder,
            }
        case ACTIONS.UPDATE_CHILD_FILES:
            return {
                ...state,
                childFiles: payload.childFiles,
            }
        case ACTIONS.UPDATE_CHILD_FOLDERS:
            return {
                ...state,
                childFolders: payload.childFolders,
            }
        default:
            return state;
    }
}

function useFolder(folder = null, folderId = null) {
    const [ state, dispatch ] = useReducer(reducer, {
        folder,
        folderId,
        childFiles: [],
        childFolders: [],
    });
    const { currentUser } = useAuth();

    useEffect(() => {
        dispatch({
            type: ACTIONS.SELECT_FOLDER,
            payload: {
                folder,
                folderId,
            },
        });
    }, [ folder, folderId ]);

    useEffect(() => {
        if(!folderId) {
            return dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: {
                    folder: ROOT,
                },
            });
        }
        
        return DATABASE.folders.doc(folderId).get()
            .then(doc => {
                dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    payload: {
                        folder: DATABASE.formatDoc(doc),
                    },
                });
            })
            .catch(error => {
                dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    payload: {
                        folder: ROOT,
                    },
                });

                console.error(error);
            });
    }, [ folderId ]);

    useEffect(() => {
        return DATABASE.files
            .where('parentFolderId', '==', folderId)
            .where('userId', '==', currentUser.uid)
            .orderBy('createdAt')
            .onSnapshot(snapshot => {
                dispatch({
                    type: ACTIONS.UPDATE_CHILD_FILES,
                    payload: {
                        childFiles: snapshot.docs.map(DATABASE.formatDoc), 
                    },
                });
            });
    }, [ folderId, currentUser ]);

    useEffect(() => {
        return DATABASE.folders
            .where('parentFolderId', '==', folderId)
            .where('userId', '==', currentUser.uid)
            .orderBy('createdAt')
            .onSnapshot(snapshot => {
                dispatch({
                    type: ACTIONS.UPDATE_CHILD_FOLDERS,
                    payload: {
                        childFolders: snapshot.docs.map(DATABASE.formatDoc), 
                    },
                });
            });
    }, [ folderId, currentUser ]);

    return state;
}

export default useFolder;
