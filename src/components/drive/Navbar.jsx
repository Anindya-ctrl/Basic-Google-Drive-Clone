import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

function NavbarComponent() {
    return (
        <Navbar bg="light" expand="xl">
            <Navbar.Brand href="/">Google Drive Lite Clone</Navbar.Brand>
            <Nav.Link href="/profile">Profile</Nav.Link>
        </Navbar>
    );
}

export default NavbarComponent;
