import React, { useState } from 'react';
import { DATABASE } from '../../firebaseSetup';
import { useAuth } from '../../contexts/AuthContext';
import { ROOT } from '../../hooks/useFolder';
import { Form, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';

function AddFolder({ currentFolder }) {
    const [ modalOpen, setModalOpen ] = useState(() => false);
    const [ folderName, setFolderName ] = useState(() => '');
    const { currentUser } = useAuth();

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const handleSubmit = event => {
        event.preventDefault();

        setFolderName('');
        closeModal();

        if(!currentFolder) return ;

        const path = [...currentFolder.path];

        if(currentFolder !== ROOT) {
            path.push({
                name: currentFolder.name,
                id: currentFolder.id,
            });
        }

        DATABASE.folders.add({
            name: folderName,
            userId: currentUser.uid,
            parentFolderId: currentFolder.id,
            path,
            createdAt: DATABASE.getCurrentTimeStamp(),
        });
    }

    return (
        <>
            <Button onClick={ openModal } variant="outline-success">
                <FontAwesomeIcon icon={ faFolderPlus } />
            </Button>

            <Modal show={ modalOpen } onHide={ closeModal }>
                <Form onSubmit={ handleSubmit }>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Folder Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={ folderName }
                                onChange={ event => setFolderName(event.target.value) }
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button onClick={ closeModal }  variant="secondary">Close</Button>
                        <Button type="submit" variant="success">Add Folder</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default AddFolder;
