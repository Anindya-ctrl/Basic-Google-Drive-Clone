import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card, Button, Alert } from 'react-bootstrap';
import CenteredContentContainer from '../../containers/CenteredContentContainer';

function Profile() {
    const [ error, setError ] = useState(() => '');
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    const handleLogout = async () => {
        try {
            setError('');
            await logout();
            history.push('/login');
        } catch(err) {
            console.error(err);
            setError(err.message || 'An error occurred.');
        }
    }

    return (
        <CenteredContentContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    { error && <Alert variant="danger">{ error }</Alert> }
                    Email: <b>{ currentUser.email }</b>
                    <Link to="/update-profile">
                        <Button type="submit" className="w-100 mt-4">Update Profile</Button>
                    </Link>
                </Card.Body>

                <div className="w-100 text-center mb-3">
                    <Link to="/">back to dashboard</Link>
                </div>
            </Card>
            
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={ handleLogout }>Log Out</Button>
            </div>
        </CenteredContentContainer>
    );
}

export default Profile;
