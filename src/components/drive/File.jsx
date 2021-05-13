import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

function File({ file }) {
    return (
        <a
            href={ file.url }
            target="_blank"
            rel="noopener noreferrer"
            className={ `btn btn-outline-dark w-100 ${ file.name.length > 33 ? 'text-truncate': 'text-break' }` }
        >
            <FontAwesomeIcon icon={ faFile } size="4x" /> <br />
            { file.name }
        </a>
    );
}

export default File;
