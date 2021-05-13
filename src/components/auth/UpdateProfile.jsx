import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import CenteredContentContainer from '../../containers/CenteredContentContainer';

function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [ error, setError ] = useState(() => '');
    const [ loading, setLoading ] = useState(() => false);
    const [ message, setMessage ] = useState(() => '');
    const [ showAlert, setShowAlert ] = useState(() => true);
    const { currentUser,updateEmail, updatePassword } = useAuth();

    const handleSubmit = async event => {
        event.preventDefault();

        if(passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Make sure both passwords match');
        }

        const promises = [];

        if(currentUser.email !== emailRef.current.value) {
            promises.push(updateEmail(emailRef.current.value));
        }
        if(passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));
        }
        
        setError('');
        setLoading(true);
        
        Promise.all(promises).then(() => {
            setMessage('Your profile has been updated successfully.');
        }).catch(err => {
            console.error(err);
            setError(err.message || 'An error occurred.');
        }).finally(() => setLoading(false));
    }

    return (
        <CenteredContentContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    { error && <Alert show={ showAlert } onClose={ () => setShowAlert(false) } variant="danger" dismissible>{ error }</Alert> }
                    { message && <Alert show={ showAlert } onClose={ () => setShowAlert(false) } variant="success" dismissible>{message }</Alert> }

                    <Form onSubmit={ handleSubmit }>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                ref={ emailRef }
                                defaultValue={ currentUser.email }
                                required
                            />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                ref={ passwordRef }
                                placeholder="Leave empty to keep the same"
                            />
                        </Form.Group>
                        <Form.Group id="confirm-password">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                ref={ confirmPasswordRef }
                                placeholder="Leave empty to keep the same"
                            />
                        </Form.Group>

                        <Button
                            type="submit"
                            className="w-100"
                            disabled={ loading }
                            onClick={ () => setShowAlert(true) }
                        >Update</Button>
                    </Form>

                    <div className="w-100 text-center mt-3">
                        <Link to="/profile">back to profile</Link>
                    </div>
                </Card.Body>
            </Card>
        </CenteredContentContainer>
    );
}

export default UpdateProfile;
