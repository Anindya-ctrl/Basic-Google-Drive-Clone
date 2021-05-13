import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

function Folder({ folder }) {

    return (
        <Button
            as={ Link }
            to={{
                pathname: `/folder/${ folder.id }`,
                state: { folder }
            }}
            variant="outline-dark"
            className={ `${ folder.name.length > 33 ? 'text-truncate': 'text-break' } w-100` }
        >
                <FontAwesomeIcon icon={ faFolder } size="4x" /> <br />
                { folder.name }
        </Button>
    );
}

export default Folder;
