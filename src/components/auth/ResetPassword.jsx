import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import CenteredContentContainer from '../../containers/CenteredContentContainer';

function ResetPassword() {
    const emailRef = useRef();
    const [ error, setError ] = useState(() => '');
    const [ loading, setLoading ] = useState(() => false);
    const [ successMessage, setSuccessMessage ] = useState(() => '');
    const { resetPassword } = useAuth();

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setSuccessMessage('Please check your email for further instructions.');
        } catch(err) {
            console.error(err);
            setError(err.message || 'An error occurred.');
        }

        setLoading('');
    }

    return (
        <CenteredContentContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Reset Password</h2>
                    { error && <Alert variant="danger">{ error }</Alert> }
                    { successMessage && <Alert variant="success">{ successMessage }</Alert> }

                    <Form onSubmit={ handleSubmit }>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                ref={ emailRef }
                                required
                            />
                        </Form.Group>

                        <Button
                            type="submit"
                            className="w-100"
                            disabled={ loading }    
                        >Send Email</Button>
                    </Form>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                <Link to="/login">Log In</Link>
            </div>
        </CenteredContentContainer>
    );
}

export default ResetPassword;
