import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { STORAGE, DATABASE } from '../../firebaseSetup';
import { useAuth } from '../../contexts/AuthContext';
import { ROOT } from '../../hooks/useFolder';
import { v4 } from 'uuid';
import { Toast, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

function AddFile({ currentFolder }) {
    const [ uploading, setUploading ] = useState(() => []);
    const { currentUser } = useAuth();

    const handleUpload = event => {
        const targetFile = event.target.files[0];

        if(!currentFolder || !targetFile) return ;

        const id = v4();
        setUploading(prevFiles => [
            ...prevFiles,
            {
                id,
                name: targetFile.name,
                progress: 0,
                error: false,
            }
        ]);

        const pathNames = currentFolder && currentFolder.path.map(file => file.name);
        const filePath = currentFolder === ROOT
            ? `${ pathNames.join('/') }/${ targetFile.name }`
            : `${ pathNames.join('/') }/${ currentFolder.name }/${ targetFile.name }`;

        const uploadFile = STORAGE.ref(`/files/${ currentUser.uid }/${ filePath }`).put(targetFile);

        uploadFile.on('state_changed', snapshot => {
            const progress = snapshot.bytesTransferred / snapshot.totalBytes;

            setUploading(prevFiles => (
                prevFiles.map(file => {
                    if(file.id === id) return { ...file, progress };

                    return file;
                })
            ));
        }, err => {
            setUploading(prevFiles => (
                prevFiles.map(file => {
                    if(file.id === id) return { ...file, error: true };

                    return file;
                })
            ));
        }, () => {
            setUploading(prevFiles => prevFiles.filter(file => file.id !== id));
            
            uploadFile.snapshot.ref.getDownloadURL().then(url => {
                DATABASE.files
                    .where('name', '==', targetFile.name)
                    .where('userId', '==', currentUser.uid)
                    .where('parentFolderId', '==', currentFolder.id)
                    .get()
                    .then(files => {
                        const existingFile = files.docs[0];

                        if(existingFile) {
                            existingFile.ref.update({ url });
                        } else {
                            DATABASE.files.add({
                                url,
                                name: targetFile.name,
                                userId: currentUser.uid,
                                parentFolderId: currentFolder.id,
                                createdAt: DATABASE.getCurrentTimeStamp(),
                            });
                        }
                    });
            }).catch(err => console.log(err));

        });
    }

    return (
        <>
            <label className="btn btn-outline-success mt-2 mr-2">
                <input
                    type="file"
                    onChange={ handleUpload }
                    style={{ display: 'none' }}
                />

                <FontAwesomeIcon icon={ faFileUpload } />
            </label>

            {
                uploading.length > 0 && (
                    ReactDOM.createPortal(
                        <div
                            style={{
                                position: 'absolute',
                                right: '1rem',
                                bottom: '1rem',
                                maxWidth: '200px',
                            }}
                        >
                            {
                                uploading.map(file => (
                                    <Toast key={ file.id } onClose={ () => setUploading(prevFiles => prevFiles.filter(File => File.id !== file.id)) }>
                                        <Toast.Header
                                            className="d-block w-100 text-truncate"
                                            closeButton={ file.error }
                                        >{ file.name }</Toast.Header>

                                        <Toast.Body>
                                            <ProgressBar
                                                animated={ !file.error }
                                                variant={ file.error ? 'danger' : 'primary' }
                                                now={ file.error ? 100 : file.progress * 100 }
                                                label={
                                                    file.error ? 'Error' : `${ Math.round(file.progress * 100) }%`
                                                }
                                            />
                                        </Toast.Body>
                                    </Toast>
                                ))
                            }
                        </div>

                        , document.body
                    )
                )
            }
        </>
    );
}

export default AddFile;
