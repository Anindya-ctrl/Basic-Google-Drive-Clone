import React from 'react';
import { Container } from 'react-bootstrap';

function CenteredContentContainer({ children }) {
    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: '80vh' }}
        >
            <div
                className="w-100"
                style={{ maxWidth: '400px' }}
            >
                { children }
            </div>
        </Container>
    );
}

export default CenteredContentContainer;
