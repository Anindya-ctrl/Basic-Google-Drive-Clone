import React from 'react';
import { ROOT } from '../../hooks/useFolder';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

function FolderBreadcrumbs({ currentFolder }) {
    let path = currentFolder === ROOT ? [] : [ROOT];
    if(currentFolder) path = [...path, ...currentFolder.path];

    return (
        <Breadcrumb className="flex-grow-1" listProps={{ className: "bg-white pl-0 m-0" }}>
            {
                path.map((folder, index) => (
                    <Breadcrumb.Item
                        key={ folder.id }
                        linkAs={ Link }
                        linkProps={{
                            to: {
                                pathname: folder.id ? `/folder/${ folder.id }` : '/',
                                state: {
                                    folder: { ...folder, path: path.slice(1, index) },
                                },
                            },
                        }}
                        className="d-inline-block text-truncate"
                        style={{ maxWidth: '150px' }}
                    >
                        { folder.name }
                    </Breadcrumb.Item>
                ))
            }

            {
                currentFolder && (
                    <Breadcrumb.Item
                        className="d-inline-block text-truncate"
                        style={{ maxWidth: '200px' }}
                        active
                    >
                        { currentFolder.name }
                    </Breadcrumb.Item>
                )
            }
        </Breadcrumb>
    );
}

export default FolderBreadcrumbs;
