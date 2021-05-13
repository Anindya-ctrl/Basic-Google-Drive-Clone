import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import CenteredContentContainer from '../../containers/CenteredContentContainer';

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [ error, setError ] = useState(() => '');
    const [ loading, setLoading ] = useState(() => false);
    const [ showAlert, setShowAlert ] = useState(() => true);
    const { login } = useAuth();
    const history = useHistory();

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch(err) {
            console.error(err);
            setError(err.message || 'An error occurred.');
        }

        setLoading(false);
    }

    return (
        <CenteredContentContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    { error && <Alert show={ showAlert } onClose={ () => setShowAlert(false) } variant="danger" dismissible>{ error }</Alert> }

                    <Form onSubmit={ handleSubmit }>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                ref={ emailRef }
                                required
                            />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                ref={ passwordRef }
                                required
                            />
                        </Form.Group>

                        <Button
                            type="submit"
                            className="w-100"
                            disabled={ loading }
                            onClick={ () => setShowAlert(true) }
                        >Log In</Button>
                    </Form>

                    <div className="w-100 text-center mt-3">
                        <Link to="forgot-password">forgot password?</Link>
                    </div>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </CenteredContentContainer>
    );
}

export default Login;
