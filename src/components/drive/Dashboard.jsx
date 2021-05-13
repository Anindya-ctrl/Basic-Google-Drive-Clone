import React from 'react';
import Navbar from './Navbar';
import AddFile from './AddFile';
import AddFolder from './AddFolder';
import File from './File';
import Folder from './Folder';
import FolderBreadcrumbs from './FolderBreadcrumbs';
import useFolder from '../../hooks/useFolder';
import { useParams, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function Dashboard() {
    const { folderId } = useParams();
    const { state = {} } = useLocation();
    const { folder, childFiles, childFolders } = useFolder(state.folder, folderId);

    return (
        <>
            <Navbar />

            <Container fluid>
                <div className="d-flex align-items-center">
                    <FolderBreadcrumbs currentFolder={ folder } />
                    <AddFile currentFolder={ folder } />
                    <AddFolder currentFolder={ folder } />
                </div>

                {
                    childFolders.length > 0 && (
                        <div className="d-flex flex-wrap">
                            {
                                childFolders.map(childFolder => (
                                    <div key={ childFolder.id } className="p-2" style={{ maxWidth: '140px' }}>
                                        <Folder folder={ childFolder } />
                                    </div>
                                ))
                            }
                        </div>
                    )
                } {
                    childFiles.length > 0 && childFolders.length > 0 && <hr />
                } {
                    childFiles.length === 0 && childFolders.length === 0 && (
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                            fontSize: '120%',
                            opacity: '0.6',
                        }}>You currently do not have any files or folders.</div>
                    )
                } {
                    childFiles.length > 0 && (
                        <div className="d-flex flex-wrap">
                            {
                                childFiles.map(childFile => (
                                    <div key={ childFile.id } className="p-2" style={{ maxWidth: '140px' }}>
                                        <File file={ childFile } />
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </Container>
        </>
    );
}

export default Dashboard;
